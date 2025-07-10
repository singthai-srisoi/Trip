import { fade, fly } from "svelte/transition"

export function getPageTransition(from: string, to: string) {
  if (from == '/trips' && ['/trips/add', '/trips/list'].includes(to)) {
    // slide up
    return { transition: fly, params: { y: 50, duration: 300 } }
  }
  else if (['/trips/add', '/trips/list'].includes(from) && to === '/trips') {
    // slide down
    return { transition: fly, params: { y: -50, duration: 300 } }
  }
   else if (
    from === '/trips' && ['/drivers', '/vehicles', '/users'].includes(to) ||
    to === '/preference' && ['/drivers', '/vehicles', '/users'].includes(from) ||
    from == "/drivers" && to == "/users" ||
    from == "/users" && to == "/vehicles"
    ) {
        // slide to left
    return { transition: fly, params: { x: 100, duration: 300 } }
  }
  else if (
    from === '/preference' && ['/drivers', '/vehicles', '/users'].includes(to) ||
    to === '/trips' && ['/drivers', '/vehicles', '/users'].includes(from) ||
    to == "/drivers" && from == "/users" ||
    to == "/users" && from == "/vehicles"
    ) {
        // slide to right
    return { transition: fly, params: { x: -100, duration: 300 } }
  } else {
    return { transition: fade, params: { duration: 200 } } // fallback
  }
}

