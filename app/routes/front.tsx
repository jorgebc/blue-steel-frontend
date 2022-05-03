import type {ErrorBoundaryComponent, LoaderFunction} from '@remix-run/node'
import type {Auth0Profile} from 'remix-auth-auth0'

import {json} from '@remix-run/node'
import {Outlet, useLoaderData, useCatch} from '@remix-run/react'

import {auth} from '~/utils/auth.server'
import {Nav} from '~/components/front/nav'
import {ModalError} from '~/components/modal-error-boundary'

type LoaderData = {profile: Auth0Profile}

export const loader: LoaderFunction = async ({request}) => {
  const {profile} = await auth.isAuthenticated(request, {
    failureRedirect: '/login',
  })
  return json<LoaderData>({profile})
}

export default function FrontHome() {
  const {profile} = useLoaderData<LoaderData>()
  return (
    <>
      <Nav profile={profile} />
      <Outlet />
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
