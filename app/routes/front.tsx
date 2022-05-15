import type {ErrorBoundaryComponent, LoaderFunction} from '@remix-run/node'
import type {User} from '~/generated/types'

import {json} from '@remix-run/node'
import {Outlet, useLoaderData, useCatch} from '@remix-run/react'

import {checkAuth} from '~/utils/auth.server'
import {getUser} from '~/api/user.server'
import {Nav} from '~/components/front/nav/nav'
import {ModalError} from '~/components/error/modal-error-boundary'

type LoaderData = {user: User}

export const loader: LoaderFunction = async ({request}) => {
  await checkAuth(request)
  const userData = await getUser(request)
  return json<LoaderData>({user: userData.data.user})
}

export default function Front() {
  const {user} = useLoaderData<LoaderData>()
  return (
    <>
      <Nav user={user} />
      <main className="h-screen bg-gray-600">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
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
