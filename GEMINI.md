# Campus Companion - Gemini CLI Guidance

## Project Overview
Campus Companion is a safety and navigation application for Quezon City University. It consists of a React frontend and a Node.js/Express backend.

## Architecture
- **Monorepo Structure**:
  - `/client`: React frontend powered by Vite.
  - `/server`: Node.js backend using Express and PostgreSQL.
- **Data Flow**: React -> Axios -> Express -> PostgreSQL.

## Tech Stack
### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4.0
- **Routing**: React Router DOM
- **API Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **Database**: PostgreSQL (`pg` driver)
- **Auth**: JWT (jsonwebtoken) & BcryptJS
- **Process Manager**: Nodemon (dev)

## Conventions & Standards

### General
- Use `npm run dev` in the root to start both client and server.
- Environment variables are managed via `.env` files in `client/` and `server/`.

### Frontend (`/client`)
- **Module System**: ESM (`import/export`)
- **Components**: Functional components with Hooks.
- **Styling**: Utility-first with Tailwind CSS.
- **File Naming**: PascalCase for components (e.g., `Header.jsx`), camelCase for hooks and utils.

### Backend (`/server`)
- **Module System**: CommonJS (`require/module.exports`)
- **Pattern**: Controller-Service-Model/Route structure.
  - `src/routes/`: API endpoint definitions.
  - `src/controllers/`: Request handling logic.
  - `src/models/`: Database schema/query logic.
  - `src/middleware/`: Auth and validation.
- **Error Handling**: Use consistent error response formats.

## Development Workflow
1. **Installation**: `npm run install:all` from the root.
2. **Environment**: Ensure `.env` is configured in both `client` and `server`.
3. **Execution**: `npm run dev` to launch the full stack.
