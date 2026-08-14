# E0 - AI-Powered Project Intelligence Platform

A modern web application built with Next.js that leverages AI agents and intelligent workflows to enhance project management and collaboration. E0 enables teams to interact with projects through natural language, powered by Inngest workflows and E2B code interpretation.

## 🚀 Features

- **AI-Powered Agents** - Intelligent task automation using Inngest Agent Kit
- **Project Management** - Comprehensive project creation and management capabilities
- **Real-time Messaging** - Seamless communication within projects
- **Code Interpretation** - Execute and analyze code with E2B runtime environments
- **Authentication** - Secure user authentication via Clerk
- **Modern UI** - Beautiful, responsive interface built with Shadcn/UI and TailwindCSS
- **Database** - PostgreSQL with Prisma ORM for robust data management
- **Dark Mode Support** - Theme switching with next-themes

## 🛠 Tech Stack

- **Framework:** [Next.js](https://nextjs.org) 16.2.9
- **Language:** TypeScript
- **Frontend:** React 19 with JSX
- **Database:** PostgreSQL with [Prisma](https://www.prisma.io)
- **Authentication:** [Clerk](https://clerk.com)
- **AI/Workflows:** [Inngest](https://www.inngest.com) with Agent Kit
- **Code Execution:** [E2B Code Interpreter](https://e2b.dev)
- **UI Components:** [Shadcn/UI](https://ui.shadcn.com)
- **Styling:** [TailwindCSS](https://tailwindcss.com) 4.0
- **State Management:** [React Query](https://tanstack.com/query)
- **Package Manager:** npm

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm/bun
- PostgreSQL database
- Clerk account for authentication
- Inngest account for workflows

### Setup Steps

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd e0
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env.local` file with:

   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/e0
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   CLERK_SECRET_KEY=your_clerk_secret
   INNGEST_API_KEY=your_inngest_key
   INNGEST_EVENT_KEY=your_inngest_event_key
   E2B_API_KEY=your_e2b_key
   ```

4. **Setup database:**

   ```bash
   npx prisma migrate dev
   ```

5. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```

## 🚀 Getting Started

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

The app will automatically reload when you modify any files.

### Build

Create an optimized production build:

```bash
npm run build
```

### Production

Start the production server:

```bash
npm start
```

## 📂 Project Structure

```
e0/
├── src/
│   ├── app/              # Next.js app directory (routes and layouts)
│   │   ├── (auth)/       # Authentication routes
│   │   └── (root)/       # Main application routes
│   ├── components/       # Reusable React components
│   │   ├── ui/           # Shadcn UI components
│   │   ├── projects/     # Project-related components
│   │   ├── ai-elements/  # AI response components
│   │   └── providers/    # Context providers
│   ├── features/         # Feature-specific modules
│   │   ├── auth/         # Authentication logic
│   │   ├── projects/     # Project management
│   │   ├── messages/     # Messaging system
│   │   └── inngest/      # Workflow definitions
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and database setup
│   └── generated/        # Auto-generated types
├── prisma/               # Database schema and migrations
├── public/               # Static assets
├── sandbox-templates/    # Code execution templates
└── package.json
```

## 🗄️ Database

The project uses PostgreSQL with Prisma ORM. Key models include:

- **User** - User accounts (managed via Clerk)
- **Project** - Project instances
- **Message** - Project messages and interactions
- **Fragment** - Message fragments for rich content

View the schema:

```bash
npx prisma studio
```

## 📝 Available Scripts

| Script          | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm start`     | Start production server  |
| `npm run lint`  | Run ESLint               |

## 🔧 Database Migrations

Create a new migration:

```bash
npx prisma migrate dev --name <migration_name>
```

View migration history:

```bash
npx prisma migrate status
```

Reset database (development only):

```bash
npx prisma migrate reset
```

## 🚀 Deployment

Deploy to [Vercel](https://vercel.com) (recommended for Next.js):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

For other platforms, follow Next.js deployment guidelines.

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Inngest Documentation](https://www.inngest.com/docs)
- [Shadcn/UI Components](https://ui.shadcn.com)
- [TailwindCSS Docs](https://tailwindcss.com/docs)

## 💡 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## 📄 License

This project is proprietary.

---

## 🌐 Live Application

[![Visit E0](https://img.shields.io/badge/Visit%20Live%20App-E0-brightgreen?style=for-the-badge&logo=vercel)](https://e0-ag.vercel.app/)

**Live Link:** https://e0-ag.vercel.app/
