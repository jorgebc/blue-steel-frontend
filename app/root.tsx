import type {LinksFunction, MetaFunction} from '@remix-run/node'
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
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
