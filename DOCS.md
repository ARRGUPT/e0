# Chapter 0 — Project Init (Next.js v16.2.9)

## Command

```bash
npx create-next-app@latest || npx create-next-app@16.2.9
```

- Project name: `./`
- Recommended Next.js defaults: `yes`
- √ Would you like to use React Compiler?: `No`
- Would you like to use Tailwind CSS?: `Yes`
- Would you like your code inside a `src/` directory?: `Yes`
- Would you like to use App Router? (recommended): `Yes`
- Would you like to customize the import alias (`@/*` by default)?: `No`
- Would you like to include AGENTS.md to guide coding agents to write up-to-date Next.js code?: `Yes`

# Chapter 1 — UI Foundation: shadcn/ui, Dark Mode, TanStack Query

## Step 1 shadcn/ui

- shadcn -> build your own -> shuffle(for color) -> icons: lucide_react -> get code -> template: `Next.js` -> base UI : `Radix UI` -> Use pointer on buttons(enable) -> copy npm cmd and execute

```bash
npx shadcn@latest init --preset b1smJp98S --base radix --template next --pointer
```

- shadcn all components: to select all components

```bash
npx shadcn@latest add
```

## Step 2 Dark Mode

- shadcn -> search(dark mode) -> select(Nextjs)

## 2.1

```bash
npm install next-themes
```

## 2.2 Create a theme provider

- src/components/providers/theme-provider.tsx (copy/paste code)

## 2.3 Wrap your root layout

- src/app/layout.tsx (edit/copy/paste code)

## 2.4 Add a mode toggle

- src/components/ui/mode-toggle.tsx (copy/paste code)
- src/app/page.tsx -> add <ModeToggle/> component

## Step 3 TanStack Query

## 3.1

- TanStack Query -> get started -> installation

```bash
npm i @tanstack/react-query
```

## 3.2 setup

- components\providers\query-provider.tsx (write code)(for QueryProvider)
- wrap the whole application using this (QueryProvider)
  - app/layout.tsx
  ```bash
  <body className="min-h-full flex flex-col">
      <QueryProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </QueryProvider>
  </body>
  ```

# Chapter 2 — Clerk Authentication

- clerk -> login -> dashboard -> create application -> (choose) Google | github -> `create application` -> (choose) Next.js -> ans then follow⬇️
  - 1. Install `@clerk/nextjs`: `npm install @clerk/nextjs@7.5.9`
  - 2. Set your `Clerk API keys`: `.env`
    ```bash
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_Z******************
    CLERK_SECRET_KEY=sk_test_BEv*****************
    ```
  - 3. Add `clerkMiddleware()` to your app: create `proxy.ts` at the root of your project, or the src/ directory if you're using a src/ directory structure
    - src/proxy.ts (copy/paste)
  - 4. Add `ClerkProvider` and Clerk components to your app:

    src/app/layout.tsx

    ```bash
    import { ClerkProvider } from "@clerk/nextjs";
    <!-- some code -->
    + <ClerkProvider>
        <QueryProvider>
            <!-- some code -->
        </QueryProvider>
    + </ClerkProvider>
    ```

  - 5. `Continue to the Next.js guide` -> `Add custom sign-in-or-up page`
  - 6. Build a sign-in-or-up page:
       - src/app/(auth)/sign-in/[[...sign-in]]/page.tsx                         (copy/paste)
  - 7. Make `/sign-in` route public
       - src/proxy.ts                                                           (update this file)
  - 8. Update your environment variables
    
    ```bash
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
    NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
    ```
  - 9. src/app/(auth)/layout.tsx                 (auth layout ka UI updated)    (copy/paste)
  - 10. src/app/page.tsx                         (add `<UserButton />` below `<ModeToggle />`)

## TESTING
- `npm run dev` -> `localhost:3000` -> sign in with `Google` -> That's it 🎉

# Chapter 3 — Home Page Setup

- src/components/brand/e0-logo.tsx
- src/components/home/glass-navbar.tsx
- src/components/home/home-background.tsx
- src/components/home/prompt-input.tsx
- src/components/home/prompt-templates.ts
- src/app/page.tsx                                              (home page)

# Chapter 4 — Database with Prisma via neon
## 1
- neon.com -> new project -> write name -> create -> connect -> connection string: prisma -> .env -> show pass -> copy snippet -> paste in your .env

```bash
DATABASE_URL="postgresql://neondb_owner:**********************
```

## 2
- prisma -> get started -> Prisma ORM -> Postgres
    - Install required dependencies
    ```bash
    npm install prisma @types/pg --save-dev
    npm install @prisma/client @prisma/adapter-pg pg dotenv
    ```

## 3.1
```bash
npx prisma init
```

## 3.2
- src/lib/db.ts (copy/paste code)

## 3.3
```bash
npx prisma generate 
```

## 3.4
- prisma/schema.prisma
```bash
model Test {
  id String @id @default(cuid())
  title String
}
```

## 3.5
```bash
npx prisma migrate dev
```
- migration name: test

## 3.6
```bash
npx prisma generate
```