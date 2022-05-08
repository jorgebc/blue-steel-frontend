import type {Auth0Profile} from 'remix-auth-auth0'

import {Fragment} from 'react'
import {Link} from '@remix-run/react'
import {Menu, Transition} from '@headlessui/react'

import {classNames} from '~/utils'

function ProfileMenuItem({to, label}: {label: String; to: string}) {
  return (
    <Menu.Item>
      {({active}) => (
        <Link
          to={to}
          className={classNames(
            active ? 'bg-gray-100' : '',
            'block px-4 py-2 text-sm text-gray-700',
          )}
        >
          {label}
        </Link>
      )}
    </Menu.Item>
  )
}

export function ProfileDropdown({profile}: {profile: Auth0Profile}) {
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="sr-only">Abrir menu usuario</span>
          <img
            className="h-8 w-8 rounded-full"
            src={profile._json.picture}
            alt="Imagen de perfil"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <ProfileMenuItem to="/back" label="Back" />
          <ProfileMenuItem to="/logout" label="Salir" />
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
