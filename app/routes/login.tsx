import type {ActionFunction, LoaderFunction} from '@remix-run/node'

import {auth, returnToCookie} from '~/utils/auth.server'

// support Form, Link and redirects to /login
export let action: ActionFunction = ({request}) => login(request)
export let loader: LoaderFunction = ({request}) => login(request)

async function login(request: Request) {
  let url = new URL(request.url)
  let returnTo = url.searchParams.get('returnTo') as string | null

  try {
    return await auth.authenticate('auth0', request, {
      successRedirect: returnTo ?? '/front',
      failureRedirect: '/front',
    })
  } catch (error) {
    if (!returnTo) throw error
    if (error instanceof Response && isRedirect(error)) {
      error.headers.append(
        'Set-Cookie',
        await returnToCookie.serialize(returnTo),
      )
      return error
    }
    throw error
  }
}

function isRedirect(response: Response) {
  if (response.status < 300 || response.status >= 400) return false
  return response.headers.has('Location')
}
