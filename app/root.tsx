import type {
  ErrorBoundaryComponent,
  LinksFunction,
  MetaFunction,
} from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useTransition,
} from '@remix-run/react'

import NProgress from 'nprogress'
import nProgressStyles from 'nprogress/nprogress.css'
import {useEffect} from 'react'

import {ModalError} from './components/error/modal-error-boundary'

import tailwind from './tailwind.css'

export const links: LinksFunction = () => [
  {rel: 'stylesheet', href: tailwind},
  {rel: 'stylesheet', href: nProgressStyles},
]

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Blue steel',
  viewport: 'width=device-width,initial-scale=1',
})

export default function App() {
  const transition = useTransition()
  useEffect(() => {
    // when the state is idle then we can to complete the progress bar
    if (transition.state === 'idle') NProgress.done()
    // and when it's something else it means it's either submitting a form or
    // waiting for the loaders of the next location so we start it
    else NProgress.start()
  }, [transition.state])
  return (
    <html lang="es" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export const ErrorBoundary: ErrorBoundaryComponent = ({error}) => {
  return (
    <html lang="es" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <ModalError error={error} />
        <Scripts />
      </body>
    </html>
  )
}
