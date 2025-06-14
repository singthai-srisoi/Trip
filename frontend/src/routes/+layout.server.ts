import type { LayoutServerLoad } from "./$types";


export let load: LayoutServerLoad = async ({ request, url }) => {
  const referer = request.headers.get('referer')
  const previousPath = referer ? new URL(referer).pathname : null

  return {
    currentPath: url.pathname,
    previousPath
  }
};