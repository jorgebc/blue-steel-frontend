import type {User} from '~/generated/types'

import {Fragment} from 'react'
import {Link} from '@remix-run/react'
import {Menu, Transition} from '@headlessui/react'

import {classNames} from '~/utils'

function ProfileMenuItem({
  to,
  prefetch,
  label,
}: {
  to: string
  prefetch?: boolean
  label: string
}) {
  return (
    <Menu.Item>
      {({active}) => (
        <Link
          to={to}
          prefetch={prefetch ? 'intent' : 'none'}
          className={classNames(
            active ? 'bg-gray-100' : '',
            'group flex w-full items-center rounded-md px-2 py-2 text-sm',
          )}
        >
          {label}
        </Link>
      )}
    </Menu.Item>
  )
}

export function ProfileDropdown({user}: {user: User}) {
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="sr-only">Abrir menu usuario</span>
          <img
            className="h-8 w-8 rounded-full"
            src={user.imageUrl ? user.imageUrl : '/images/user.svg'}
            alt={user.name}
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
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <ProfileMenuItem to="/front/user" prefetch label="Perfil" />
            <ProfileMenuItem to="/back" prefetch label="Backend" />
            <ProfileMenuItem to="/logout" label="Salir" />
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
