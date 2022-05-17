import type {ActionFunction, LoaderFunction} from '@remix-run/node'
import type {User} from '~/generated/types'

import {
  useActionData,
  Form,
  useLoaderData,
  useTransition,
} from '@remix-run/react'
import {json} from '@remix-run/node'
import {useState, useEffect} from 'react'

import {checkAuth} from '~/utils/auth.server'
import {getUser, updateUser} from '~/api/user.server'
import {SuccessAlert} from '~/components/alert/success-alert'

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

  const responseData = await updateUser(request, fields)
  console.log(responseData)
  return {fields}
}

type LoaderData = {user: User}

export const loader: LoaderFunction = async ({request}) => {
  await checkAuth(request)
  const userData = await getUser(request)
  return json<LoaderData>({user: userData.data.user})
}

export default function UserForm() {
  const {user} = useLoaderData<LoaderData>()
  const actionData = useActionData()
  const transition = useTransition()
  const [success, setSuccess] = useState(false)

  const name = actionData?.fields?.name ? actionData?.fields?.name : user.name
  const imageUrl = actionData?.fields?.imageUrl
    ? actionData?.fields?.imageUrl
    : user.imageUrl

  const submiting = transition.state === 'submitting'

  useEffect(() => {
    const succedded =
      transition.type === 'actionReload' && transition.state === 'loading'
    setSuccess(succedded)
  }, [transition])

  return (
    <div className="md:grid md:grid-cols-6 md:gap-6">
      <div className="mx-2 mt-5 md:col-span-4 md:col-start-2 md:mt-0">
        <SuccessAlert message="Perfil actualizado!" show={success} />
        <Form method="post">
          <fieldset disabled={submiting}>
            <div className="overflow-hidden rounded-md shadow">
              <div className="space-y-6 bg-gray-800 px-4 py-5 shadow-md sm:p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300"
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
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3">
                    <label
                      htmlFor="imageUrl"
                      className="block text-sm font-medium text-gray-300"
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
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-700 px-4 py-3 text-right shadow-md sm:px-6">
                <button
                  type="submit"
                  className="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {submiting ? 'Actualizando...' : 'Actualizar'}
                </button>
              </div>
            </div>
          </fieldset>
        </Form>
      </div>
    </div>
  )
}
