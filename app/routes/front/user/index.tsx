import type {ActionFunction, LoaderFunction} from '@remix-run/node'
import type {User} from '~/generated/types'

import {
  useActionData,
  Form,
  useLoaderData,
  useTransition,
} from '@remix-run/react'
import {json} from '@remix-run/node'

import {checkAuth} from '~/utils/auth.server'
import {getUser} from '~/api/user.server'

type ActionData = {
  formError?: string
  fieldErrors?: {name: string | undefined; imageUrl: string | undefined}
  fields?: {
    name: string
    imageUrl: string
  }
}

function validateUserName(name: string) {
  if (name.length === 0) {
    return 'Campo obligatorio'
  } else if (name.length > 10) {
    return 'Nombre demasiado largo, máximo 10 caracteres'
  }
}

function validateUserImageUrl(name: string) {
  if (name.length === 0) {
    return 'Campo obligatorio'
  } else if (name.length > 255) {
    return 'La url de la imagen es demasiado larga'
  }
}

export let action: ActionFunction = async ({
  request,
}): Promise<Response | ActionData> => {
  const {name, imageUrl} = Object.fromEntries(await request.formData())
  if (typeof name !== 'string' || typeof imageUrl !== 'string') {
    return {formError: `Form not submitted correctly.`}
  }

  const fieldErrors = {
    name: validateUserName(name),
    imageUrl: validateUserImageUrl(imageUrl),
  }
  const fields = {name, imageUrl}
  if (Object.values(fieldErrors).some(Boolean)) {
    return {fieldErrors, fields}
  }

  return {fields}
}

type LoaderData = {user: User}

export const loader: LoaderFunction = async ({request}) => {
  await checkAuth(request)
  const user = await getUser(request)
  return json<LoaderData>({user})
}

export default function UserForm() {
  const {user} = useLoaderData<LoaderData>()
  const actionData = useActionData()
  const transition = useTransition()

  const name = actionData?.fields?.name ? actionData?.fields?.name : user.name
  const imageUrl = actionData?.fields?.imageUrl
    ? actionData?.fields?.imageUrl
    : user.imageUrl

  return (
    <div className="md:grid md:grid-cols-6 md:gap-6">
      <div className="mx-2 mt-5 md:col-span-4 md:col-start-2 md:mt-0">
        <Form method="post">
          <fieldset disabled={transition.state === 'submitting'}>
            <div className="overflow-hidden rounded-md shadow">
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nombre
                    </label>
                    {actionData?.fieldErrors?.name ? (
                      <p
                        className="mt-1 text-sm text-red-600"
                        role="alert"
                        id="name-error"
                      >
                        {actionData?.fieldErrors?.name}
                      </p>
                    ) : null}
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        defaultValue={name}
                        className="block w-full flex-1 rounded-md"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="imageUrl"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Url de la imagen de perfil
                    </label>
                    {actionData?.fieldErrors?.imageUrl ? (
                      <p
                        className="mt-1 text-sm text-red-600"
                        role="alert"
                        id="name-error"
                      >
                        {actionData?.fieldErrors?.imageUrl}
                      </p>
                    ) : null}
                    <div className="mt-1 flex items-center">
                      <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                        <svg
                          className="h-full w-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                      <div className="ml-5 mt-1 flex w-full rounded-md shadow-sm">
                        <input
                          type="text"
                          name="imageUrl"
                          id="imageUrl"
                          defaultValue={imageUrl}
                          className="block w-full flex-1 rounded-md border-gray-300 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {transition.state === 'submitting'
                    ? 'Actualizando...'
                    : 'Actualizar'}
                </button>
              </div>
            </div>
          </fieldset>
        </Form>
      </div>
    </div>
  )
}
