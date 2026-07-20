# TamuKita

Platform undangan digital premium untuk hari spesial Anda. Kelola tamu, RSVP, dan undangan pernikahan dalam satu platform elegan.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Animation**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in the values in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> The app runs without Supabase configured — only auth features will be disabled.

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Commands

| Command              | Description               |
| -------------------- | ------------------------- |
| `npm run dev`        | Start development server  |
| `npm run build`      | Build for production      |
| `npm start`          | Start production server   |
| `npm run lint`       | Run ESLint                |
| `npm run lint:fix`   | Run ESLint with auto-fix  |
| `npm run format`     | Format code with Prettier |
| `npm run type-check` | TypeScript type check     |

---

## Folder Structure

```
tamukita/
├── app/                    # Next.js App Router
│   ├── (marketing)/        # Public marketing pages
│   ├── (auth)/             # Login, Register
│   ├── (dashboard)/        # Protected dashboard
│   └── api/                # API routes
├── components/
│   ├── ui/                 # shadcn/ui primitives
│   ├── layout/             # Section, Container
│   ├── common/             # Logo, shared components
│   ├── marketing/          # Navbar, Footer
│   └── dashboard/          # Sidebar, Header
├── features/
│   ├── landing/            # Hero, Features, Pricing, etc.
│   ├── authentication/     # Login/Register forms
│   └── dashboard/          # Dashboard feature modules
├── lib/
│   ├── supabase/           # Supabase client/server
│   ├── auth/               # Auth helpers
│   ├── helpers/            # Metadata, etc.
│   └── utils/              # Validators, utilities
├── hooks/                  # Custom React hooks
├── services/               # Data access layer
├── types/                  # TypeScript types
├── constants/              # App constants, routes, plans
├── config/                 # App configuration
├── providers/              # React context providers
└── styles/                 # Global CSS
```

---

## Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy your **Project URL** and **anon key** from Project Settings → API
3. Run the migrations (found in `supabase/migrations/`)
4. Enable **Email Auth** in Authentication → Providers

---

## Vercel Deployment

1. Push to GitHub
2. Import to [vercel.com](https://vercel.com)
3. Set environment variables in Vercel dashboard
4. Deploy

```bash
# Or deploy via CLI
npx vercel --prod
```

---

## License

MIT © TamuKita
