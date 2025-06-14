import { fade, fly } from "svelte/transition"

export function getPageTransition(from: string, to: string) {
  if (from.startsWith('/trips') && to === '/trips/add') {
    return { transition: fly, params: { y: 50, duration: 300 } }
  }
  if (from === '/trips/add' && to === '/trips') {
    return { transition: fly, params: { y: -50, duration: 300 } }
  }
  if (
    from === '/trips' && ['/drivers', '/vehicles', '/users'].includes(to) ||
    to === '/preference' && ['/drivers', '/vehicles', '/users'].includes(from)
    ) {
        // slide to left
    return { transition: fly, params: { x: 100, duration: 300 } }
  }
  if (
    from === '/preference' && ['/drivers', '/vehicles', '/users'].includes(to) ||
    to === '/trips' && ['/drivers', '/vehicles', '/users'].includes(from)
    ) {
        // slide to right
    return { transition: fly, params: { x: -100, duration: 300 } }
  }
  return { transition: fade, params: { duration: 200 } } // fallback
}

