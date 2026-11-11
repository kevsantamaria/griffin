# Griffin

Self-hosted manager for web projects: the sites you run, the credentials they use, and the templates and technologies behind them. Monorepo with a NestJS API, a Vue 3 SPA and a shared zod schema package.

> Griffin is under active development. The API, the database schema and the UI may change without notice.

## Repository layout

```
griffin/
├── apps/
│   ├── server/          # NestJS API (@griffin/server)
│   │   └── src/
│   │       ├── auth/            # login / logout / session
│   │       ├── sites/           # sites + encrypted credentials
│   │       ├── templates/       # reusable project templates
│   │       ├── technologies/    # tech catalog
│   │       ├── tags/            # tags for sites and templates
│   │       ├── users/
│   │       ├── encryption/      # AES-256-GCM helpers
│   │       └── common/          # guards, filters, shared pieces
│   └── client/          # Vue 3 SPA (@griffin/client)
│       └── src/
│           ├── app/            # router, config, base API client
│           ├── features/       # sites, templates, auth, ...
│           ├── pages/          # file-based routes
│           └── shared/         # components, stores, utils
└── packages/
    └── schemas/         # zod schemas (@griffin/schemas)
```

Each server feature follows the same shape: `entities/`, `dto/`, `repositories/`, `<name>.controller.ts`, `<name>.service.ts`. Each client feature follows `api/`, `components/`, `composables/`, `repository.ts`, `types.ts`.

## Prerequisites

- Node.js `^22.18.0` or `>=24.12.0`
- pnpm `^12.3.4` (pinned through `devEngines`)
- PostgreSQL 17 on `localhost:5432`

## Install

```bash
pnpm install
```

`@griffin/schemas` ships compiled output from `dist/`, so build it once before starting either app (or run it in watch mode alongside development):

```bash
pnpm -C packages/schemas build
```

## Environment variables

Server variables live in `apps/server/.env`. `ConfigModule` loads them relative to the working directory, so the server must be started from `apps/server` for them to resolve.

```dotenv
# apps/server/.env
PORT=3000
SESSION_SECRET=change-me
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=griffin
# Must be exactly 64 characters
ENCRYPTION_KEY=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
```

| Variable                                                      | Purpose                                                                               |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `PORT`                                                        | HTTP port, defaults to `3000`                                                         |
| `SESSION_SECRET`                                              | Signing secret for the session cookie                                                 |
| `DB_HOST` / `DB_PORT` / `DB_USER` / `DB_PASSWORD` / `DB_NAME` | PostgreSQL connection                                                                 |
| `ENCRYPTION_KEY`                                              | AES-256-GCM key for stored site credentials; startup fails unless it is 64 characters |

Client variables live in `apps/client/.env`:

```dotenv
# apps/client/.env
VITE_API_URL=http://localhost:3000/api
```

Both `.env` files are gitignored.

## Running

```bash
# API with watch mode (http://localhost:3000/api)
pnpm dev:server

# SPA with HMR (http://localhost:5173)
pnpm dev:client
```

Equivalent explicit commands, useful when a workspace filter misbehaves:

```bash
pnpm -C apps/server start:dev
pnpm -C apps/client dev
```

Production builds:

```bash
pnpm build                                   # every workspace
pnpm -C apps/server start:prod               # runs dist/main
pnpm -C apps/client preview                  # serves the built SPA
```

The API applies the global prefix `/api` and allows credentialed CORS from `http://localhost:5173`. The session cookie is named `griffin.sid`. TypeORM runs with `synchronize: true`, so the schema is created from the entities on startup.

## Quality checks

| Command                                                                      | Scope                                            |
| ---------------------------------------------------------------------------- | ------------------------------------------------ |
| `pnpm lint`                                                                  | oxlint across all workspaces                     |
| `pnpm format`                                                                | oxfmt across all workspaces                      |
| `pnpm -C apps/client type-check`                                             | `vue-tsc --build`                                |
| `pnpm -C apps/server exec tsc -p tsconfig.json --noEmit --incremental false` | server type check                                |
| `pnpm test`                                                                  | server unit tests (Jest)                         |
| `pnpm -C apps/server test:e2e`                                               | e2e tests, needs Postgres and `apps/server/.env` |

## API

All routes are prefixed with `/api` and return `{ "data": ... }`. Everything except `POST /api/auth/login` requires an authenticated session.

| Method                     | Route                   | Description                         |
| -------------------------- | ----------------------- | ----------------------------------- |
| `POST`                     | `/auth/login`           | Start a session                     |
| `POST`                     | `/auth/logout`          | Destroy the session                 |
| `GET`                      | `/auth/me`              | Current user                        |
| `GET` / `POST`             | `/sites`                | List / create sites                 |
| `GET`                      | `/sites/slug/:slug`     | Site by slug                        |
| `GET` / `PATCH` / `DELETE` | `/sites/:id`            | Read / update / delete a site       |
| `GET` / `POST`             | `/templates`            | List / create templates             |
| `GET`                      | `/templates/slug/:slug` | Template by slug                    |
| `GET` / `PATCH` / `DELETE` | `/templates/:id`        | Read / update / delete a template   |
| `GET` / `POST`             | `/technologies`         | List / create technologies          |
| `GET` / `PATCH` / `DELETE` | `/technologies/:id`     | Read / update / delete a technology |
| `GET` / `POST`             | `/tags`                 | List / create tags                  |
| `DELETE`                   | `/tags/:id`             | Delete a tag                        |
| `GET` / `POST`             | `/users`                | List / create users                 |
| `GET` / `PATCH` / `DELETE` | `/users/:id`            | Read / update / delete a user       |

Requests are rate limited per bucket: `auth` (5/min), `search` (300/min), `write` (100/min), `read` (1000/min).

## Status

Griffin is under active development. The API, the database schema and the UI may change without notice while the project is being built out.

## License

MIT
