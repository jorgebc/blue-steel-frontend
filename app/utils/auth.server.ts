import type {Auth0Profile} from 'remix-auth-auth0'

import {createCookie, createCookieSessionStorage} from '@remix-run/node'
import {Authenticator} from 'remix-auth'
import {Auth0Strategy} from 'remix-auth-auth0'

import {
  AUTH0_CALLBACK_URL,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_DOMAIN,
  isProduction,
  SECRETS,
} from '~/constants/env.server'

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

export const auth = new Authenticator<Auth0Profile>(sessionStorage)

const auth0Strategy = new Auth0Strategy(
  {
    callbackURL: AUTH0_CALLBACK_URL,
    clientID: AUTH0_CLIENT_ID,
    clientSecret: AUTH0_CLIENT_SECRET,
    domain: AUTH0_DOMAIN,
  },
  async ({profile}) => {
    //
    // Use the returned information to process or write to the DB.
    //
    return profile
  },
)

auth.use(auth0Strategy)

export const {getSession, commitSession, destroySession} = sessionStorage

export const returnToCookie = createCookie('return-to', {
  path: '/',
  httpOnly: true,
  sameSite: 'lax',
  maxAge: 60, // 1 minute because it makes no sense to keep it for a long time
  secure: isProduction(),
})
