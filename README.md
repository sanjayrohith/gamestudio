# GameStudio Booker

GameStudio Booker is a Vite + React (TypeScript) app for managing PlayStation station bookings, snack orders, and admin workflows. It ships with shadcn/ui components, Tailwind design tokens, and react-query powered data fetching to create a polished dashboard experience for both admins and customers.

## Tech stack

- Vite + React 18 with TypeScript
- Tailwind CSS + shadcn/ui
- @tanstack/react-query for caching and async flows
- Radix UI primitives and Lucide icons

## Getting started

Prerequisites:

- Node.js 18+ (use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) for easy installs)
- npm 9+ (bundled with Node)

Local setup:

```sh
git clone <REPO_URL>
cd gametime-booker-main
npm install
npm run dev
```

The dev server prints a local URL (default http://localhost:5173) and reloads automatically as you edit files inside `src/`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with hot module reload |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint with the project config |

## Project structure

```
├── public/           # Static assets served as-is
├── src/
│   ├── components/   # shadcn/ui wrappers and feature modules
│   ├── hooks/        # Reusable hooks (toast, responsive utils, etc.)
│   ├── lib/          # Auth helpers, mock data, and utils
│   └── pages/        # Route-level views (dashboard, login, etc.)
└── vite.config.ts    # Vite + React-SWC configuration
```

## Access model

- `https://<host>/` → public landing page with CTAs into the customer dashboard.
- `https://<host>/dashboard` + in-app booking/snacks flows are fully public; data is stored locally for the current browser session.
- `https://<host>/admin/login` → the only authentication surface. Successful login unlocks `/admin`, `/admin/*`, and `/profile` via the `ProtectedRoute` guard.
- A subtle “Admin Login” link also lives in the landing-page footer so guests never run into auth walls.

## Deployment

1. Run `npm run build` to generate the production bundle.
2. Deploy the `dist/` directory to any static host (Netlify, Vercel, Azure Static Web Apps, etc.).
3. Configure HTTPS, caching, and environment secrets according to your hosting provider.

## Contributing

1. Fork and clone the repository.
2. Create a branch: `git checkout -b feature/your-feature`.
3. Commit changes with clear messages.
4. Open a pull request describing the motivation and testing performed.

Feel free to open issues for bugs or feature ideas—PRs are welcome!
