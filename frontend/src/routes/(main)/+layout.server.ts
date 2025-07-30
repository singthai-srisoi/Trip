import prisma from "$lib/server/prisma.server";
import type { LayoutServerLoad } from "./$types";


export let load: LayoutServerLoad = async ({ request, url, locals }) => {
  const referer = request.headers.get('referer')
  const previousPath = referer ? new URL(referer).pathname : null
  let user_id = locals.session?.user_id;
  let user = await prisma.users.findUnique({
      where: { id: user_id },
  })

  return {
    currentPath: url.pathname,
    previousPath,
    user,
  }
};