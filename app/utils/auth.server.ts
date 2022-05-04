import type {Auth0Profile} from 'remix-auth-auth0'

import {createCookie, createCookieSessionStorage} from '@remix-run/node'
import {Authenticator} from 'remix-auth'
import {Auth0Strategy} from 'remix-auth-auth0'

import {
  AUTH0_CALLBACK_URL,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_DOMAIN,
  SECRETS,
} from '~/constants/env.server'
import {isProduction} from '.'

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '_remix_session',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [SECRETS],
    secure: isProduction(),
  },
})

interface AuthenticationData {
  profile: Auth0Profile
  accessToken: string
}

export const auth = new Authenticator<AuthenticationData>(sessionStorage)

const auth0Strategy = new Auth0Strategy(
  {
    callbackURL: AUTH0_CALLBACK_URL,
    clientID: AUTH0_CLIENT_ID,
    clientSecret: AUTH0_CLIENT_SECRET,
    domain: AUTH0_DOMAIN,
  },
  async ({profile, accessToken}) => {
    return {profile, accessToken}
  },
)

auth.use(auth0Strategy)

export const {getSession, commitSession, destroySession} = sessionStorage

/**
 * Get the access token from the session
 */
export const getAccessToken = async (request: Request): Promise<string> => {
  const session = await getSession(request.headers.get('Cookie'))
  return session.data.user.accessToken
}

export const returnToCookie = createCookie('return-to', {
  path: '/',
  httpOnly: true,
  sameSite: 'lax',
  maxAge: 60, // 1 minute because it makes no sense to keep it for a long time
  secure: isProduction(),
})

export const checkAuth = async (
  request: Request,
): Promise<AuthenticationData> => {
  return await auth.isAuthenticated(request, {
    failureRedirect: '/login',
  })
}
