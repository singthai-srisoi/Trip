
/* !!! This is code generated by Prisma. Do not edit directly. !!! */
/* eslint-disable */
// @ts-nocheck 
/**
* This file exports all enum related types from the schema.
*
* 🟢 You can import this file directly.
*/
export const user_role = {
  admin: 'admin',
  driver: 'driver',
  director: 'director'
} as const

export type user_role = (typeof user_role)[keyof typeof user_role]
