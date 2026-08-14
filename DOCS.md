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

# Chapter 5 — Background Jobs Setup with Inngest
## 5.1 Inngest setup
- inngest.com -> docs -> getting started(nextjs) -> `.env`
```bash
INNGEST_DEV=1
```

- 1. Install Inngest: `npm install inngest`
- 2. Run the Inngest Dev Server -> npx -> `npx inngest-cli@latest dev` -> u will get `http://localhost:8288` in terminal i.e. inngest client ka server
- 3. Now Create an Inngest client -> 
    - App Router -> src/features/inngest/client.ts                              (copy/paste)
```bash
import { Inngest } from "inngest";

export const inngest = new Inngest({ id: "e0" });
```
    - src/app/api/inngest/route.ts                                              (copy/paste)
```bash
import { inngest } from "@/features/inngest/client";
import { serve } from "inngest/next";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [],
});
```
- 4. Write your first function -> App Router
    - Define the function in :- src/features/inngest/functions.ts                  (copy/paste)
    - Then register the function with your serve handler in :- app/api/inngest/route.ts
```bash
functions: [processTask],
```
- 5. src/proxy.ts
    - add this in `src/proxy.ts` public route, so that inngest can be accessed publically and clerk's authentication usse na rok pae.
```bash
"/api/inngest(.*)"
```

- TEST IF YOUR INNGEST APP REGISTER IN INNGEST SERVER OR NOT -> `npm run dev` -> `npx inngest-cli@latest dev` ->  see here (`http://localhost:8288` -> Apps) -> view function -> Invoke function -> 🎉 YOU CAN SEE Fn RUNNING

# Chapter 6 — Project CRUD

## 6.1 onBoardUser : (save user details into db after login via clerk)
- prisma/schema.prisma                                    (user + project model -> prisma migrate and generate)
- src/features/auth/actions/index.ts                      (onBoardUser, getCurrentUser functionality)
- src/app/page.tsx ---->>> src/app/(root)/page.tsx
- src/app/(root)/loading.tsx
- src/app/(root)/layout.tsx                               (this is how the layout will render like 1st: onBoardUser, then render home page)

## 6.2 write query in prompt input + submit btn clicked -> unique project created in DB and user is redired to that new project ID page
- prisma/schema.prisma                                    (projects + messages + fragment model -> prisma migrate and generate)
- `npm i random-word-slugs`
- src/features/projects/actions/index.ts                  (server action to createProject, getProjects)
- src/features/projects/hooks/projects.ts
- src/components/home/prompt-input.tsx                    (routing the user to project id page after successfull project creation in db)

## 6.3 showing created projects in the home page
- src/features/projects/lib/index.ts                      (getProjectThumbnailUrl)
- src/features/projects/components/project-grid.tsx       (project grid in home page)
- src/app/(root)/page.tsx

## 6.4 create that new project ID page i.e. in 6.2
- src/app/(root)/projects/[id]/page.tsx

# Chapter 7 — E2B Sandbox Setup
- Sandbox infrastructure for running generated code.

- e2b.dev -> sign-in -> `documentation` -> `npm i e2b` -> api key -> Where to find API key: click `dashboard` -> `create a key` -> name: e0 -> `create` -> `copy/paste` in -> `.env`
```bash
E2B_API_KEY=e2b_bf8*************************
```

- comes back to `documentation` -> (search) e2b cli -> `npm i -g @e2b/cli` -> `Authentication` -> Option 1: browser authentication -> `e2b auth login` -> login

- `npm i @e2b/code-interpreter`

- sandbox-templates/nextjs/template.ts          (copy/paste)
- sandbox-templates/nextjs/build.ts             (copy/paste)

- vs code temminal -> `cd` sandbox-templates -> `cd` nextjs -> `npx tsx build.ts`
- e2b dashboard -> templates -> That's it 🎉

# Chapter 8 — System Prompt & Inngest's Agent-Kit Foundations

- src/lib/prompt.ts
- src/features/inngest/utils.ts
- src/features/inngest/functions.ts
- src/features/projects/actions/index.ts
- src/app/api/inngest/route.ts

- AgentKit by Inngest -> (scroll down) quick start -> Install AgentKit (npm) ->  `npm install @inngest/agent-kit`

## (RECOMMENDED): GROQ WILL ALWAYS WORK ✅
```bash
GROQ_API_KEY=gsk_hEKy***************************
```

- aistudio.google.com -> api key -> create api key -> `.env`
```bash
GEMINI_API_KEY=*************************dMw
```

- fn -> gemini model

- fn -> code agent
- fn complete

- route.ts register fn

# Chapter 9 — Messages: Model, Actions, Hooks & Chat UI

- src > features > messages > actions > index.ts
- src > features > messages > hooks > messages.ts
- src > app > (root) > projects > [id] > page.tsx
- src > components > projects > project-view.tsx
- src > components > projects > project-header.tsx
- src > features > projects > fragment-types.ts
- `npm i streamdown`
- src > components > ai-elements > response.tsx
- src > components > projects > message-card.tsx
- `npm i react-textarea-autosize`
- src/components/projects/message-form.tsx
- src > components > projects > message-loader.tsx
- src > components > projects > message-container.tsx

# Chapter 10 — Viewing Output: Code Explorer, Live Preview & Wiring 

- src > components > ui > hint.tsx
- src > components > projects > fragment-web.tsx
- src > lib > utils.ts
- src > com onents > ro•ects > code-view > code-theme.css
- `npm i prismjs`
- `npm i --save-dev @types/prismjs`
- src > components > projects > code-view > index.tsx
- src > components > projects > tree-view.tsx
- src > components > projects > file-explorer.tsx
