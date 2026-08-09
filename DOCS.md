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
- Would you like to use App Router? (recommended):  `Yes`
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
