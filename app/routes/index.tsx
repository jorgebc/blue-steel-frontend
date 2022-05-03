import type {LoaderFunction} from '@remix-run/node'

import {auth} from '~/utils/auth.server'
import {redirect} from '@remix-run/node'

export const loader: LoaderFunction = async ({request}) => {
  await auth.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  return redirect('/front')
}
