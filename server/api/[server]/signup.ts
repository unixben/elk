import { stringifyQuery } from 'ufo'

export default defineEventHandler(async (event) => {
  let { server } = getRouterParams(event)
  const { origin } = await readBody(event)
  server = server.toLocaleLowerCase().trim()
  const app = await getApp(origin, server)

  if (!app) {
    throw createError({
      statusCode: 400,
      statusMessage: `App not registered for server: ${server}`,
    })
  }

  return `https://${server}/auth/sign_up`
})
