// server/src/index.js
require('dotenv').config()
const express = require('express')
const cors    = require('cors')

const app  = express()
const PORT = process.env.PORT || 5000

// ─── Middleware ────────────────────────────────────────
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

// ─── Routes ───────────────────────────────────────────
// TODO: import and mount route files
// app.use('/api/auth',      require('./routes/auth'))
// app.use('/api/alerts',    require('./routes/alerts'))
// app.use('/api/reports',   require('./routes/reports'))
// app.use('/api/locations', require('./routes/locations'))

// ─── Health check ─────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'Campus Companion API' })
})

// ─── Start ────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🛡️  Campus Companion server running on http://localhost:${PORT}`)
})
