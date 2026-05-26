# 🛡️ Campus Companion

A campus safety and navigation app for Quezon City University.

## Tech Stack

| Layer    | Tech                        |
|----------|-----------------------------|
| Frontend | React + Vite                |
| Backend  | Node.js + Express           |
| Database | PostgreSQL                  |

## Project Structure

```
campus-companion/
├── client/     # React frontend (Vite)
└── server/     # Node.js + Express backend
```

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/your-username/campus-companion.git
cd campus-companion
```

### 2. Install all dependencies
```bash
npm run install:all
```

### 3. Set up environment variables
```bash
cp .env.example server/.env
cp .env.example client/.env
# Then fill in your values
```

### 4. Run both client and server
```bash
npm run dev
```

- Client: http://localhost:5173
- Server: http://localhost:5000

## Scripts

| Command              | Description                        |
|----------------------|------------------------------------|
| `npm run dev`        | Run client + server concurrently   |
| `npm run dev:client` | Run client only                    |
| `npm run dev:server` | Run server only                    |
| `npm run install:all`| Install all dependencies           |
