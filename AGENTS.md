# Agent Instructions for Link Shortener Project

> **Purpose**: This file provides AI coding assistants with comprehensive guidelines for maintaining code quality and consistency in this Next.js link shortener project.

## Quick Start

When working on this project, LLM assistants should:

1. **Read relevant documentation** from `/docs` before starting work
2. **Follow established patterns** found in existing code
3. **Maintain type safety** with strict TypeScript
4. **Default to Server Components** unless client interactivity is needed
5. **Use Tailwind utilities** with the `cn()` helper for styling

## Documentation Structure

All agent instructions are organized in the `/docs` directory:

### 📋 Core Documentation
For detailed guidelines on specific topics, refer to the modular documentation in the './docs' directory. ALWAYS refer to the relevant .md file BEFORE generating any code:

- **[01-authentication.md](./docs/01-authentication.md)** - Authentication and authorization with Clerk
- **[02-component-standards.md](./docs/02-component-standards.md)** - UI components with shadcn/ui (ALWAYS use shadcn/ui, never create custom UI components)

## Key Principles

### 1. Type Safety First
- Use TypeScript strict mode
- No `any` types
- Export and reuse type definitions
- Infer types from database schema

### 2. Server-First Architecture  
- Default to Server Components
- Use Client Components only for interactivity
- Fetch data in Server Components
- Use Server Actions for mutations

### 3. Component & Styling Guidelines
- **ALWAYS use shadcn/ui** for all UI components (see [02-component-standards.md](./docs/02-component-standards.md))
- Never create custom buttons, inputs, cards, or other UI elements
- Add components via CLI: `npx shadcn@latest add [component]`
- Use Tailwind CSS utilities with `cn()` helper
- Support dark mode automatically via shadcn/ui
- Mobile-first responsive design

### 4. Database Best Practices
- Use Drizzle ORM for all queries
- Always verify user ownership
- Use transactions for related operations
- Add indexes for frequent queries

### 5. Authentication
- Use Clerk exclusively for all authentication (see [01-authentication.md](./docs/01-authentication.md))
- Check auth in all protected routes
- Verify user ownership before mutations
- Use modal-based sign-in/sign-up
- Handle unauthorized states gracefully

## Common Workflows

### Creating a New Feature

1. Read relevant docs:
   - [01-authentication.md](./docs/01-authentication.md) for auth features
   - [02-component-standards.md](./docs/02-component-standards.md) for UI components
2. Add needed shadcn/ui components via CLI first
3. Create necessary database schema in `db/schema.ts`
4. Generate migration with `drizzle-kit`
5. Build UI using shadcn/ui components (never create custom UI)
6. Create Server Components for pages
7. Add Client Components only where needed
8. Implement Server Actions for mutations
9. Add proper error handling and loading states
10. Test authentication and authorization
11. Verify responsive design and dark mode
12. Run linter and type checker

### Adding a New Component

1. Review [02-component-standards.md](./docs/02-component-standards.md)
2. **ALWAYS use shadcn/ui** - never create custom UI components
3. Add shadcn components via CLI: `npx shadcn@latest add [component]`
4. Create feature components in `components/[feature]/` that compose shadcn/ui primitives
5. Export prop types and use TypeScript strictly
6. Default to Server Components unless interactivity is needed
7. Style with Tailwind utilities and `cn()` helper

### Database Operations

1. Review [06-database-standards.md](./docs/06-database-standards.md)
2. Define schema in `db/schema.ts`
3. Generate migration: `npx drizzle-kit generate`
4. Use Drizzle query builder or relational API
5. Always check user authentication
6. Verify ownership for user-specific data
7. Handle errors gracefully
8. Use transactions for multi-step operations

### Styling a Component

1. Review [05-styling-standards.md](./docs/05-styling-standards.md)
2. Use Tailwind utility classes
3. Use `cn()` from `@/lib/utils` for conditional classes
4. Support both light and dark mode with `dark:` prefix
5. Follow mobile-first responsive approach
6. Use semantic color tokens (e.g., `bg-primary` not `bg-blue-500`)
7. Leverage CVA for complex component variants

## Before Committing

Run this checklist:

```bash
# 1. Lint code
npm run lint

# 2. Check types
npx tsc --noEmit

# 3. Build project
npm run build

# 4. Review changes
git diff
```

Verify:
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] All imports use `@/*` aliases
- [ ] Server Components are default
- [ ] Authentication is checked
- [ ] Error states are handled
- [ ] Loading states are present
- [ ] Responsive design works
- [ ] Dark mode is supported

## Getting Help

When uncertain about implementation:

1. **Search existing code** for similar patterns
2. **Consult documentation** in `/docs` directory
3. **Check tech stack docs**:
   - [Next.js App Router](https://nextjs.org/docs)
   - [Drizzle ORM](https://orm.drizzle.team)
   - [Clerk Auth](https://clerk.com/docs)
   - [Tailwind CSS](https://tailwindcss.com)
   - [shadcn/ui](https://ui.shadcn.com)

## Project-Specific Notes

### Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5 (strict mode)
- **Database**: Neon PostgreSQL via Drizzle ORM
- **Auth**: Clerk
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Icons**: Lucide React

### Path Aliases
Use `@/*` for all internal imports:
```typescript
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { cn } from "@/lib/utils";
```

### Environment Variables
Required variables:
- `DATABASE_URL` - Neon PostgreSQL connection
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk public key
- `CLERK_SECRET_KEY` - Clerk secret key

## Contributing

All agent instructions should be:
- Clear and actionable
- Example-driven (show good and bad patterns)
- Updated when patterns change
- Organized by topic area
- Cross-referenced where appropriate

---

**Last Updated**: February 24, 2026  
**Version**: 1.0.0
