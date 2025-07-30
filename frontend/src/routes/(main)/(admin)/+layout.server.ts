import prisma from "$lib/server/prisma.server";
import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

const ROLE_ALLOWED = ['admin', 'driver', 'director'];
export let load: LayoutServerLoad = async ({ parent }) => {
  let { user } = await parent()
  if (!user || !ROLE_ALLOWED.includes(user.role)) {
        throw error(403, 'Forbidden')
    }

  return {
    user,
  }
};