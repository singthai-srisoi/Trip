// src/lib/server/listener.server.ts

import { WebSocketServer, WebSocket } from 'ws'
import { Client } from 'pg'
import type { IncomingMessage } from 'http'

// Use native URL parser (safer for TypeScript)
function getTripIdFromRequest(req: IncomingMessage): number | null {
  const host = req.headers.host ?? 'localhost'
  const url = new URL(req.url ?? '', `http://${host}`)
  const tripIdParam = url.searchParams.get('trip_id')
  const tripId = tripIdParam ? parseInt(tripIdParam, 10) : NaN
  return isNaN(tripId) ? null : tripId
}

// PostgreSQL client setup
const pgClient = new Client({
  connectionString: process.env.DATABASE_URL
})

await pgClient.connect()
await pgClient.query('LISTEN new_trip_chat')

// WebSocket server on port 8080
const wss = new WebSocketServer({ port: 8080 })

// Keep track of subscriptions
const tripSubscriptions = new Map<WebSocket, number>()

// Handle new WebSocket connections
wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
  const tripId = getTripIdFromRequest(req)

  if (tripId === null) {
    ws.close(1008, 'Missing or invalid trip_id')
    return
  }

  console.log(`Client subscribed to trip ${tripId}`)
  tripSubscriptions.set(ws, tripId)

  ws.on('close', () => {
    tripSubscriptions.delete(ws)
  })
})

// Handle notifications from PostgreSQL
pgClient.on('notification', (msg) => {
  try {
    const chat = JSON.parse(msg.payload ?? '{}')
    const tripId = chat.trip_id

    if (!tripId) return

    // Broadcast to matching trip subscribers
    tripSubscriptions.forEach((subTripId, client) => {
      if (subTripId === tripId && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'trip_chat', chat }))
      }
    })
  } catch (error) {
    console.error('Failed to parse notification:', error)
  }
})

console.log('WebSocket server running on ws://localhost:8080')
