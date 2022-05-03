import type {ErrorBoundaryComponent, LoaderFunction} from '@remix-run/node'

import {checkAuth} from '~/utils/auth.server'
import {AlertError} from '~/components/error/alert-error-boundary'

export const loader: LoaderFunction = async ({request}) => {
  checkAuth(request)
  return null
}

export default function FrontHome() {
  return <h1>Última actividad</h1>
}

export const ErrorBoundary: ErrorBoundaryComponent = ({error}) => {
  return <AlertError error={error} />
}
