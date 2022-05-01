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
} from '@remix-run/react'

import tailwind from './tailwind.css'

export const links: LinksFunction = () => [{rel: 'stylesheet', href: tailwind}]

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Blue steel',
  viewport: 'width=device-width,initial-scale=1',
})

export default function App() {
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
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Scripts />
      </body>
    </html>
  )
}
