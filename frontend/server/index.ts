import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { Client } from 'pg'
import { handler } from '../build/handler.js'
import 'dotenv/config'
import path from 'path'

// -------------------- Server Setup --------------------
const port = 3000
const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: { origin: [
      'https://trip.dnbtrading.website',
      'http://localhost:5173', 'http://127.0.0.1:5173',
      'http://localhost:3000', 'http://127.0.0.1:3000',
    ],
    methods: ['GET', 'POST'],
    credentials: true 
  } // allow Vite dev
})

// -------------------- Socket Tracking --------------------
// 1️⃣ Trip-specific subscriptions: trip_id -> Set of socket IDs
const tripSockets = new Map<string, Set<string>>()

// 2️⃣ Global notifications: socket.id -> user info
const globalSockets = new Map<string, { id: string; role: string }>()

// -------------------- PostgreSQL Setup --------------------
const pgClient = new Client({
  connectionString: process.env.DATABASE_URL
})

pgClient.connect().then(async () => {
  console.log('✅ Connected to PostgreSQL')
  await pgClient.query('LISTEN new_trip_chat')
})

pgClient.on('notification', (msg) => {
  if (!msg.payload) return

  try {
    const chat = JSON.parse(msg.payload)
    const tripId = chat.trip_id?.toString()
    const driverId = chat.driver_id?.toString()

    // 1️⃣ Notify trip-specific subscribers
    if (tripId && tripSockets.has(tripId)) {
      for (const socketId of tripSockets.get(tripId)!) {
        io.sockets.sockets.get(socketId)?.emit('trip_chat', chat)
      }
    }

    // 2️⃣ Notify global subscribers
    for (const [socketId, user] of globalSockets.entries()) {
      const socket = io.sockets.sockets.get(socketId)
      if (!socket) continue

      if (user.role === 'admin' || user.role === 'director') {
        // Admin & director get all chats
        socket.emit('trip_notification', chat)
      } else if (user.role === 'driver' && driverId && user.id === driverId) {
        // Driver only gets chats related to their driver_id
        socket.emit('trip_notification', chat)
      }
    }
  } catch (err) {
    console.error('❌ Failed to parse NOTIFY payload:', err)
  }
})

// -------------------- Socket.io Logic --------------------
io.on('connection', (socket) => {
  console.log('🔌 Client connected:', socket.id)

  // 1️⃣ Subscribe to a specific trip (chat page)
  socket.on('subscribe_trip', (tripId: string) => {
    tripId = tripId.toString()
    console.log(`Socket ${socket.id} subscribed to trip ${tripId}`)

    if (!tripSockets.has(tripId)) tripSockets.set(tripId, new Set())
    tripSockets.get(tripId)!.add(socket.id)

    // Keep track for cleanup on disconnect
    socket.data.tripId = tripId
  })

  // 2️⃣ Subscribe to global notifications
  socket.on('subscribe_global', (user: { id: string; role: string }) => {
    console.log(`Socket ${socket.id} subscribed to global notifications`, user)
    globalSockets.set(socket.id, { id: user.id.toString(), role: user.role })
  })

  // 🔌 Cleanup on disconnect
  socket.on('disconnect', () => {
    const tripId = socket.data.tripId
    if (tripId) {
      tripSockets.get(tripId)?.delete(socket.id)
    }

    globalSockets.delete(socket.id)
    console.log(`❌ Socket ${socket.id} disconnected`)
  })
})

// -------------------- Mount SvelteKit --------------------
// -------------------- Serve SvelteKit safely --------------------
// Serve static files without forcing .br
app.use(express.static(path.join(process.cwd(), 'build/client'), {
  extensions: ['html']
}))

app.use(handler)

// -------------------- Start Server --------------------
server.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`)
})
