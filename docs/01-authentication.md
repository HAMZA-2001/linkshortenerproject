# Authentication Standards

> **Authentication Provider**: This application uses Clerk exclusively for all authentication and authorization needs.

## Core Principles

### 1. Clerk Only
- ✅ **ALWAYS** use Clerk for authentication
- ❌ **NEVER** implement custom auth logic, JWT handling, or use other auth providers
- All auth-related operations must go through Clerk's SDK and APIs

### 2. Modal-First Sign In/Sign Up
- Sign in and sign up must always launch as modals
- Use `mode="modal"` on all `SignInButton` and `SignUpButton` components
- Do not create separate sign-in or sign-up pages unless specifically required

### 3. Protected Routes
- The `/dashboard` route and all sub-routes require authentication
- Unauthenticated users must be redirected to the home page
- Use middleware for route protection (see patterns below)

### 4. Homepage Redirect
- Authenticated users accessing `/` (homepage) should be automatically redirected to `/dashboard`
- This ensures logged-in users land directly in the app

## Implementation Patterns

### Setting Up Clerk Provider

Wrap your app with `ClerkProvider` in the root layout:

```tsx
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

### Authentication UI Components

Use Clerk's built-in components with modal mode:

```tsx
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export function Header() {
  return (
    <header>
      <SignedOut>
        <SignInButton mode="modal" />
        <SignUpButton mode="modal" />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
```

**Key Components:**
- `SignInButton` - Triggers sign-in modal
- `SignUpButton` - Triggers sign-up modal
- `UserButton` - Displays user avatar with account menu
- `SignedIn` - Conditionally renders content for authenticated users
- `SignedOut` - Conditionally renders content for unauthenticated users

### Protecting Routes with Middleware

Create `middleware.ts` in the project root to protect routes:

```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);
const isPublicRoute = createRouteMatcher(["/"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // Protect dashboard routes
  if (isProtectedRoute(req) && !userId) {
    const signInUrl = new URL("/", req.url);
    return NextResponse.redirect(signInUrl);
  }

  // Redirect authenticated users from homepage to dashboard
  if (isPublicRoute(req) && userId) {
    const dashboardUrl = new URL("/dashboard", req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
```

### Server-Side Authentication

Access user information in Server Components and Server Actions:

```typescript
import { currentUser, auth } from "@clerk/nextjs/server";

// Get full user object
export async function UserProfile() {
  const user = await currentUser();

  if (!user) {
    return <div>Not signed in</div>;
  }

  return <div>Hello {user.firstName}!</div>;
}

// Get just the userId (more performant)
export async function getUserLinks() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Fetch user-specific data
  const links = await db.query.links.findMany({
    where: eq(links.userId, userId),
  });

  return links;
}
```

### Client-Side Authentication

Use Clerk hooks in Client Components:

```typescript
"use client";

import { useUser, useAuth } from "@clerk/nextjs";

export function ClientComponent() {
  const { user, isLoaded } = useUser();
  const { userId } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Not authenticated</div>;
  }

  return <div>Hello {user.firstName}!</div>;
}
```

## Database Integration

### Storing User IDs

When storing user-related data, use Clerk's `userId`:

```typescript
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { links } from "@/db/schema";

export async function createLink(url: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const link = await db.insert(links).values({
    userId, // Store Clerk userId
    url,
    shortCode: generateShortCode(),
    createdAt: new Date(),
  });

  return link;
}
```

### User Ownership Verification

Always verify users can only access their own data:

```typescript
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { links } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function deleteLink(linkId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Delete only if the link belongs to the user
  const result = await db
    .delete(links)
    .where(and(eq(links.id, linkId), eq(links.userId, userId)));

  return result;
}
```

## Environment Variables

Required Clerk environment variables in `.env.local`:

```bash
# Clerk Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Optional: Customize Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

## Common Patterns

### Server Action with Auth

```typescript
"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  // Perform update
  // ...

  revalidatePath("/dashboard");
  return { success: true };
}
```

### Protected API Route

```typescript
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Return data
  return NextResponse.json({ data: "..." });
}
```

### Conditional Rendering in Server Components

```tsx
import { currentUser } from "@clerk/nextjs/server";

export default async function HomePage() {
  const user = await currentUser();

  return (
    <div>
      {user ? (
        <div>Welcome back, {user.firstName}!</div>
      ) : (
        <div>Please sign in to continue</div>
      )}
    </div>
  );
}
```

## Security Best Practices

1. **Always authenticate on the server** - Never trust client-side auth state for sensitive operations
2. **Verify ownership** - Check that users can only access/modify their own data
3. **Use type-safe auth checks** - TypeScript ensures proper auth handling
4. **Handle auth errors gracefully** - Provide clear feedback when auth fails
5. **Don't expose sensitive data** - Clerk handles tokens; don't pass them to client unnecessarily

## Anti-Patterns

❌ **DON'T** create custom login forms:
```tsx
// Bad - custom auth
<form action="/api/login">
  <input name="email" />
  <input name="password" type="password" />
</form>
```

❌ **DON'T** skip auth checks:
```typescript
// Bad - no auth verification
export async function deleteLink(linkId: string) {
  await db.delete(links).where(eq(links.id, linkId));
}
```

❌ **DON'T** use page-based sign in without modals:
```tsx
// Bad - should use modal mode
<SignInButton />
```

✅ **DO** use Clerk components with modal mode:
```tsx
// Good
<SignInButton mode="modal" />
<SignUpButton mode="modal" />
```

✅ **DO** verify authentication in all protected operations:
```typescript
// Good
export async function deleteLink(linkId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await db
    .delete(links)
    .where(and(eq(links.id, linkId), eq(links.userId, userId)));
}
```

## Testing Authentication

When testing authenticated features:

1. Use Clerk's testing tokens in development
2. Test both authenticated and unauthenticated states
3. Verify redirects work correctly
4. Ensure protected routes are actually protected
5. Check that user data is properly isolated

## Troubleshooting

**Issue**: Users not being redirected to dashboard after sign in
- Check middleware configuration
- Verify `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` is set to `/dashboard`
- Ensure middleware is matching the correct routes

**Issue**: Auth state not loading
- Verify `ClerkProvider` wraps the app
- Check that environment variables are set correctly
- Ensure you're using `await` with `auth()` and `currentUser()`

**Issue**: Protected routes accessible without auth
- Check middleware is running (verify `config.matcher`)
- Ensure `createRouteMatcher` patterns are correct
- Verify middleware file is in the correct location (project root)

---

**Next Steps**: 
- Review [Clerk Documentation](https://clerk.com/docs) for advanced features
- See [06-database-standards.md](./06-database-standards.md) for user data storage patterns
- Check [Project Overview](./00-overview.md) for architecture context

---

**Last Updated**: February 24, 2026
