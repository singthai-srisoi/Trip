
import lucia from 'lucia-auth'
import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
// import { Prisma } from '$generated/prisma'
import prisma from './prisma.server'
import { dev } from '$app/environment'

const adapter = new PrismaAdapter(prisma.session, prisma.users);

let auth = lucia({
    adapter: adapter,
    env: dev ? 'DEV' : 'PROD',
})