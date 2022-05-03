import type {Auth0Profile} from 'remix-auth-auth0'

import {Link, useLocation} from '@remix-run/react'
import {Disclosure} from '@headlessui/react'
import {MenuIcon, XIcon} from '@heroicons/react/outline'

import {classNames} from '~/utils'
import {ProfileDropdown} from './profile-dropdown'

const navigation = [
  {name: 'Inicio', href: '/front'},
  {name: 'Campañas', href: '/campaigns'},
]

const isSelected = (pathname: string, href: string) => {
  return href === pathname || pathname.startsWith(`/front/${href}`)
}

function NavLink({
  to,
  label,
  ...rest
}: {
  to: string
  label: string
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const location = useLocation()
  const selected = isSelected(location.pathname, to)
  return (
    <Link
      to={to}
      prefetch="intent"
      className={classNames(
        selected
          ? 'bg-gray-900 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
        'rounded-md px-3 py-2 text-sm font-medium',
      )}
      aria-current={selected ? 'page' : undefined}
      {...rest}
    >
      {label}
    </Link>
  )
}

function MobileMenuLink({
  to,
  ...rest
}: {
  to: string
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const location = useLocation()
  const selected = isSelected(location.pathname, to)
  return (
    <Disclosure.Button
      as={Link}
      to={to}
      prefetch="intent"
      className={classNames(
        selected
          ? 'bg-gray-900 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
        'block rounded-md px-3 py-2 text-base font-medium',
      )}
      aria-current={selected ? 'page' : undefined}
      {...rest}
    />
  )
}

export function Nav({profile}: {profile: Auth0Profile}) {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({open}) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Abrir menu principal</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="https://logo-blue-steel"
                    alt="Blue steel"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="https://logo-blue-steel"
                    alt="Blue steel"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map(item => (
                      <NavLink key={item.name} to={item.href} label={item.name}>
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <ProfileDropdown profile={profile} />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map(item => (
                <MobileMenuLink key={item.name} to={item.href}>
                  {item.name}
                </MobileMenuLink>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
