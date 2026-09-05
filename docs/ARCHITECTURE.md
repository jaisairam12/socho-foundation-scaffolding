# Architecture

## Stack

- **Framework:** TanStack Start v1 (React 19, SSR, file-based routing)
- **Build:** Vite 7
- **Styling:** Tailwind CSS v4 via `src/styles.css` (semantic design tokens in oklch)
- **Data fetching:** TanStack Query (provider mounted in `src/routes/__root.tsx`)
- **Backend:** none in this phase. Lovable Cloud is the intended backend when
  persistence or auth is needed.
- **AI:** none. No AI calls, mocks, or recommendation logic exist.

## Folder layout

```text
src/
  routes/            file-based routes (each file = one URL)
    __root.tsx       HTML shell, head metadata, error + not-found boundaries
    index.tsx        /            home
    explore.tsx      /explore     placeholder
    profile.tsx      /profile     placeholder
    settings.tsx     /settings    placeholder
  components/
    app-shell.tsx    responsive header / nav / footer wrapper
    page-placeholder.tsx  standard "not built yet" page body
    loading-state.tsx     shared pending UI
    error-state.tsx       shared error UI
  lib/               utilities and (future) server functions
  styles.css         design tokens + Tailwind
docs/                project documentation (see docs/README.md)
.env.example         documented environment variables
```

## Routing

- URL structure is owned by filenames under `src/routes/`.
  `src/routeTree.gen.ts` is generated — never edited by hand.
- Every route defines its own `head()` with a unique title and description.
- Unknown URLs render the root `notFoundComponent`.

## App shell

`AppShell` (`src/components/app-shell.tsx`) wraps every route via `__root.tsx`:

- Sticky header with wordmark and primary navigation.
- Desktop: horizontal nav. Mobile (< 768px): bottom tab bar.
- Footer with phase label.
- `main` is the single landmark for page content.

## Loading and error handling

- **Pending:** `router.defaultPendingComponent` → `LoadingState`.
- **Errors:** root `errorComponent` → `ErrorState` with "Try again" (invalidates
  router and resets boundary) and "Go home". Errors are also forwarded to the
  Lovable runtime reporter (`src/lib/lovable-error-reporting.ts`).
- **Server errors:** `src/start.ts` middleware renders a static error page for
  unhandled server exceptions.

## Server / browser boundaries (for later phases)

- App-internal server logic: `createServerFn` in `*.functions.ts` under `src/lib/`.
- Server-only helpers: `*.server.ts` (blocked from client bundles).
- Raw HTTP endpoints (webhooks, cron): `src/routes/api/public/*`.
- `process.env.*` is read only inside server handlers; browser config uses
  `import.meta.env.VITE_*`.
