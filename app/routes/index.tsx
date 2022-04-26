import type {LoaderFunction} from '@remix-run/node'
import type {Auth0Profile} from 'remix-auth-auth0'

import {json} from '@remix-run/node'
import {Form, useLoaderData, useCatch} from '@remix-run/react'

import {auth} from '~/utils/auth.server'

type LoaderData = {profile: Auth0Profile}

export const loader: LoaderFunction = async ({request}) => {
  const profile = await auth.isAuthenticated(request, {
    failureRedirect: '/login',
  })

  return json<LoaderData>({profile})
}

export default function Screen() {
  const {profile} = useLoaderData<LoaderData>()
  return (
    <>
      <Form method="post" action="/logout">
        <button>Log Out</button>
      </Form>

      <hr />
      <h1>Welcome to blue steel</h1>

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
