// import express from 'express'
// import { createServer } from 'http'
// import { Server } from 'socket.io'

// import { handler } from '../build/handler.js'

// const port = 3000
// const app = express()
// const server = createServer(app)

// const io = new Server(server)

// io.on('connection', (socket) => {
//   socket.emit('eventFromServer', 'Hello, World 👋')
// })

// // SvelteKit should handle everything else using Express middleware
// // https://github.com/sveltejs/kit/tree/master/packages/adapter-node#custom-server
// app.use(handler)

// server.listen(port)
// console.log(`Server is running on http://localhost:${port}`)

// server/index.ts or .js
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { Client } from 'pg'
import { handler } from '../build/handler.js'
import 'dotenv/config'


// Setup Express + HTTP + Socket.io
const port = 3000
const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173'
  }
})

// Set of connected sockets mapped to trip_id
const tripSockets = new Map<string, Set<string>>() // trip_id -> Set of socket IDs
const socketToTrip = new Map<string, string>()     // socket ID -> trip_id

// PostgreSQL setup
const pgClient = new Client({
  connectionString: process.env.DATABASE_URL
})

pgClient.connect().then(async () => {
  console.log('Connected to PostgreSQL')
  await pgClient.query('LISTEN new_trip_chat')
})

pgClient.on('notification', (msg) => {
  if (!msg.payload) return

  try {
    const chat = JSON.parse(msg.payload)
    const tripId = chat.trip_id?.toString()

    if (!tripId) return

    const socketIds = tripSockets.get(tripId)
    if (!socketIds) return

    for (const socketId of socketIds) {
      const socket = io.sockets.sockets.get(socketId)
      if (socket) {
        socket.emit('trip_chat', chat)
      }
    }
  } catch (err) {
    console.error('Failed to parse NOTIFY payload:', err)
  }
})

// Socket.io connection
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)

  // Client must join a trip room with trip_id
  socket.on('subscribe_trip', (tripId: string) => {
    console.log(`Socket ${socket.id} subscribed to trip ${tripId}`)

    // Track which socket listens to which trip
    tripId = tripId.toString()
    socketToTrip.set(socket.id, tripId)

    if (!tripSockets.has(tripId)) {
      tripSockets.set(tripId, new Set())
    }

    tripSockets.get(tripId)?.add(socket.id)
  })

  socket.on('disconnect', () => {
    const tripId = socketToTrip.get(socket.id)
    if (tripId) {
      tripSockets.get(tripId)?.delete(socket.id)
      socketToTrip.delete(socket.id)
      console.log(`Socket ${socket.id} unsubscribed from trip ${tripId}`)
    }
  })
})

// Mount SvelteKit SSR middleware
app.use(handler)

server.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`)
})
