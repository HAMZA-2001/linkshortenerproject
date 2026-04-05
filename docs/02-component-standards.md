# Component Standards with shadcn/ui

> **Component Library**: This application uses shadcn/ui exclusively for ALL UI components. Never create custom UI components.

## Core Principles

### 1. shadcn/ui Only
- ✅ **ALWAYS** use shadcn/ui components for UI elements
- ❌ **NEVER** create custom UI components (buttons, inputs, cards, dialogs, etc.)
- If you need a UI component that doesn't exist, add it via shadcn CLI first
- All styling should extend shadcn/ui components, not replace them

### 2. Add Components via CLI
- Use the shadcn CLI to add components: `npx shadcn@latest add [component-name]`
- Components are installed into `@/components/ui/` directory
- Each component is fully customizable and owns its own code
- Never manually create files in `components/ui/`

### 3. Composition Over Creation
- Build complex UIs by composing shadcn/ui primitives
- Use shadcn/ui's compound component patterns
- Extend components with additional props, not new components
- Wrap shadcn components in feature-specific components if needed

## shadcn/ui Configuration

The project is configured with these settings (see `components.json`):

```json
{
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "baseColor": "neutral",
    "cssVariables": true
  },
  "iconLibrary": "lucide"
}
```

**Key Settings:**
- **Style**: New York (more modern, refined aesthetic)
- **RSC**: Server Components enabled by default
- **Base Color**: Neutral (gray-based color palette)
- **CSS Variables**: Theme customization via CSS variables
- **Icons**: Lucide React

## Adding Components

### Installing a Component

Use the shadcn CLI to add components:

```bash
# Add a single component
npx shadcn@latest add button

# Add multiple components
npx shadcn@latest add button input card dialog

# View all available components
npx shadcn@latest add
```

**Never manually copy component code** - always use the CLI to ensure:
- Correct file structure
- Proper dependencies
- Theme integration
- Type safety

### Component Installation Flow

1. **Identify needed component** from [shadcn/ui docs](https://ui.shadcn.com)
2. **Run CLI command** to install
3. **Import and use** in your feature
4. **Customize if needed** by modifying the installed component

## Using Components

### Basic Import Pattern

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MyFeature() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter text" />
        <Button>Submit</Button>
      </CardContent>
    </Card>
  );
}
```

### Server Components (Default)

shadcn/ui components work with Server Components by default:

```tsx
// ✅ Server Component - No "use client" needed for static UI
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export async function LinkCard({ linkId }: { linkId: string }) {
  const link = await getLink(linkId);

  return (
    <Card>
      <CardContent>
        <h3>{link.title}</h3>
        <Badge>{link.clicks} clicks</Badge>
      </CardContent>
    </Card>
  );
}
```

### Client Components (When Needed)

Add `"use client"` only when using interactive features:

```tsx
"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export function DeleteButton({ linkId }: { linkId: string }) {
  return (
    <Button
      variant="destructive"
      onClick={async () => {
        await deleteLink(linkId);
        toast({ title: "Link deleted" });
      }}
    >
      Delete
    </Button>
  );
}
```

## Common Components

### Buttons

```tsx
import { Button } from "@/components/ui/button";

// Variants
<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>

// With icons (using Lucide React)
import { Trash2, Plus } from "lucide-react";

<Button>
  <Plus className="mr-2 h-4 w-4" />
  Add Link
</Button>
```

### Forms

```tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

<div className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="url">URL</Label>
    <Input id="url" placeholder="https://example.com" />
  </div>
  <Button type="submit">Shorten URL</Button>
</div>
```

### Cards

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Link Stats</CardTitle>
    <CardDescription>View your link performance</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Total clicks: 1,234</p>
  </CardContent>
  <CardFooter>
    <Button>View Details</Button>
  </CardFooter>
</Card>
```

### Dialogs & Modals

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

<Dialog>
  <DialogTrigger asChild>
    <Button>Create Link</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create New Link</DialogTitle>
      <DialogDescription>Enter a URL to shorten</DialogDescription>
    </DialogHeader>
    {/* Form content */}
  </DialogContent>
</Dialog>
```

### Tables

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Short URL</TableHead>
      <TableHead>Destination</TableHead>
      <TableHead>Clicks</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {links.map((link) => (
      <TableRow key={link.id}>
        <TableCell>{link.shortCode}</TableCell>
        <TableCell>{link.url}</TableCell>
        <TableCell>{link.clicks}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

## Customizing Components

### Modifying Installed Components

After installation, components live in `@/components/ui/` and can be customized:

```tsx
// components/ui/button.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center...",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground...",
        // Add custom variant
        custom: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
      },
    },
  }
);

// Use your custom variant
<Button variant="custom">Custom Style</Button>
```

### Wrapping for Feature-Specific Logic

Create feature wrappers, not custom UI components:

```tsx
// ✅ Good - Wraps shadcn component with business logic
import { Button } from "@/components/ui/button";

export function CopyLinkButton({ shortCode }: { shortCode: string }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(`https://short.link/${shortCode}`);
  };

  return (
    <Button onClick={handleCopy} variant="outline">
      Copy Link
    </Button>
  );
}

// ❌ Bad - Creating custom button from scratch
export function CopyLinkButton({ shortCode }: { shortCode: string }) {
  return (
    <button className="px-4 py-2 bg-blue-500 rounded">
      Copy Link
    </button>
  );
}
```

## Component Organization

### Directory Structure

```
components/
├── ui/                    # shadcn/ui components (via CLI)
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   └── ...
├── links/                 # Feature-specific components
│   ├── link-card.tsx      # Uses Card from ui/
│   ├── link-form.tsx      # Uses Input, Button from ui/
│   └── link-table.tsx     # Uses Table from ui/
└── dashboard/
    ├── stats-card.tsx     # Uses Card from ui/
    └── ...
```

### Feature Components Pattern

Feature components compose shadcn/ui primitives:

```tsx
// components/links/link-card.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

export function LinkCard({ link }: { link: Link }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="truncate">{link.url}</span>
          <Badge variant="secondary">{link.clicks}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <code className="text-sm">/{link.shortCode}</code>
        <Button asChild variant="outline" size="sm">
          <a href={link.url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Visit
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
```

## Styling Guidelines

### Using the cn() Utility

Always use `cn()` for combining classNames:

```tsx
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

<Button className={cn("w-full", isLoading && "opacity-50")}>
  Submit
</Button>
```

### Extending Component Styles

```tsx
// ✅ Good - Extend with className
<Card className="border-2 border-primary">
  <CardContent>Custom border</CardContent>
</Card>

// ✅ Good - Conditional styling with cn()
<Button className={cn("w-full", error && "border-red-500")}>
  Submit
</Button>

// ❌ Bad - Inline styles bypass theme
<Card style={{ border: "2px solid blue" }}>
  <CardContent>Don't use inline styles</CardContent>
</Card>
```

### Responsive Design

Use Tailwind responsive utilities with shadcn/ui:

```tsx
<Card className="w-full md:w-1/2 lg:w-1/3">
  <CardContent className="p-4 sm:p-6">
    <Button className="w-full sm:w-auto">Responsive</Button>
  </CardContent>
</Card>
```

## Dark Mode Support

shadcn/ui components support dark mode automatically via CSS variables:

```tsx
// Components automatically adapt to dark mode
<Card className="bg-background text-foreground">
  <CardContent>
    This card adapts to dark/light mode automatically
  </CardContent>
</Card>

// Use dark: prefix for dark-mode-specific overrides only when needed
<div className="bg-white dark:bg-slate-900">
  Custom dark mode styling
</div>
```

## Icons with Lucide React

Use Lucide icons consistently:

```tsx
import { Trash2, Copy, ExternalLink, Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

// Standard icon size in buttons
<Button>
  <Plus className="mr-2 h-4 w-4" />
  Add Link
</Button>

// Icon-only button
<Button size="icon" variant="ghost">
  <Settings className="h-4 w-4" />
</Button>

// Larger icons for emphasis
<Trash2 className="h-6 w-6 text-destructive" />
```

## Forms with Server Actions

Combine shadcn/ui forms with Server Actions:

```tsx
"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createLink } from "@/app/actions/links";

export function CreateLinkForm() {
  const [state, formAction, isPending] = useActionState(createLink, null);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="url">URL to shorten</Label>
        <Input
          id="url"
          name="url"
          type="url"
          placeholder="https://example.com"
          required
        />
      </div>
      {state?.error && (
        <p className="text-sm text-destructive">{state.error}</p>
      )}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create Link"}
      </Button>
    </form>
  );
}
```

## Common Patterns

### Loading States

```tsx
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

<Button disabled={isLoading}>
  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
  {isLoading ? "Loading..." : "Submit"}
</Button>
```

### Empty States

```tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link as LinkIcon } from "lucide-react";

<Card>
  <CardContent className="flex flex-col items-center justify-center py-12">
    <LinkIcon className="h-12 w-12 text-muted-foreground mb-4" />
    <h3 className="text-lg font-semibold mb-2">No links yet</h3>
    <p className="text-muted-foreground mb-4">
      Create your first shortened link
    </p>
    <Button>Create Link</Button>
  </CardContent>
</Card>
```

### Confirmation Dialogs

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete Link</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your link.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={() => deleteLink(id)}>
        Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## Component Checklist

Before implementing UI, ask:

- [ ] Does shadcn/ui have this component? (Check [ui.shadcn.com](https://ui.shadcn.com))
- [ ] Have I installed it via `npx shadcn@latest add [component]`?
- [ ] Am I composing shadcn primitives instead of creating custom UI?
- [ ] Am I using Server Components by default?
- [ ] Do I need `"use client"` for interactivity?
- [ ] Am I using `cn()` for className composition?
- [ ] Does it work in both light and dark mode?
- [ ] Am I using Lucide icons consistently?
- [ ] Are icons sized correctly (`h-4 w-4` for inline)?

## Anti-Patterns

❌ **DON'T** create custom UI components:
```tsx
// Bad - custom button
export function CustomButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="px-4 py-2 bg-blue-500 rounded">
      {children}
    </button>
  );
}
```

❌ **DON'T** manually copy component code:
```tsx
// Bad - copying from shadcn docs without CLI
// components/ui/button.tsx (manually created)
```

❌ **DON'T** override core component styles excessively:
```tsx
// Bad - fighting the component system
<Button className="!bg-red-500 !border-none !text-white">
  Click me
</Button>
```

✅ **DO** use shadcn components:
```tsx
// Good - use existing component
import { Button } from "@/components/ui/button";

<Button variant="destructive">Click me</Button>
```

✅ **DO** install via CLI:
```bash
# Good - proper installation
npx shadcn@latest add button
```

✅ **DO** extend with composition:
```tsx
// Good - wrap with business logic
export function DeleteButton({ id }: { id: string }) {
  return (
    <Button variant="destructive" onClick={() => deleteItem(id)}>
      Delete
    </Button>
  );
}
```

## Available Components

Common shadcn/ui components to use:

**Layout & Structure:**
- Card, Separator, Tabs, Sheet, Accordion

**Forms & Input:**
- Button, Input, Textarea, Label, Checkbox, Radio Group, Select, Switch

**Feedback:**
- Alert, Alert Dialog, Toast, Dialog, Popover, Tooltip

**Data Display:**
- Table, Badge, Avatar, Progress, Skeleton

**Navigation:**
- Dropdown Menu, Command, Navigation Menu

**Utility:**
- Scroll Area, Aspect Ratio, Collapsible

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [shadcn/ui Components](https://ui.shadcn.com/docs/components)
- [Lucide Icons](https://lucide.dev)
- [CVA Documentation](https://cva.style/docs)

---

**Next Steps:**
- Review [05-styling-standards.md](./05-styling-standards.md) for Tailwind patterns
- See [01-authentication.md](./01-authentication.md) for auth UI integration
- Check component examples in the codebase

---

**Last Updated**: February 25, 2026
