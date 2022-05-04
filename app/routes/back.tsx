import type {ErrorBoundaryComponent, LoaderFunction} from '@remix-run/node'
import type {Auth0Profile} from 'remix-auth-auth0'

import {json} from '@remix-run/node'
import {useLoaderData, useCatch, Link} from '@remix-run/react'

import {checkAuth} from '~/utils/auth.server'
import {ModalError} from '~/components/error/modal-error-boundary'

type LoaderData = {profile: Auth0Profile}

export const loader: LoaderFunction = async ({request}) => {
  const {profile} = await checkAuth(request)
  return json<LoaderData>({profile})
}

export default function Back() {
  const {profile} = useLoaderData<LoaderData>()
  return (
    <>
      <Link to="/front" prefetch="intent">
        Volver al Front
      </Link>
      <pre>
        <code>{JSON.stringify(profile, null, 2)}</code>
      </pre>
    </>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  switch (caught.status) {
    default:
      return (
        <div>
          <h1>Caught</h1>
          <p>Status: {caught.status}</p>
          <pre>
            <code>{JSON.stringify(caught.data, null, 2)}</code>
          </pre>
        </div>
      )
  }
}

export const ErrorBoundary: ErrorBoundaryComponent = ({error}) => {
  return <ModalError error={error} />
}
