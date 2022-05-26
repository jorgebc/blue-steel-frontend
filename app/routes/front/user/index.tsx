import type {
  ActionFunction,
  LoaderFunction,
  ErrorBoundaryComponent,
} from '@remix-run/node'
import type {User} from '~/generated/types'

import {
  useActionData,
  Form,
  useLoaderData,
  useTransition,
} from '@remix-run/react'
import {json} from '@remix-run/node'

import {checkAuth} from '~/utils/auth.server'
import {getUser, updateUser} from '~/api/user.server'
import {SuccessAlert} from '~/components/alert/success-alert'
import {TextInput} from '~/components/input/text-input'
import {AvatarInput} from '~/components/input/avatar-input'
import {AlertError} from '~/components/error/alert-error-boundary'

type ActionData = {
  formError?: string
  fieldErrors?: {name: string | undefined; imageUrl: string | undefined}
  fields?: {
    name: string
    imageUrl: string
  }
  success?: boolean
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
    return {fieldErrors, fields, success: false}
  }

  const responseData = await updateUser(request, fields)
  console.log(responseData)
  return {fields, success: true}
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

  const name = actionData?.fields?.name ? actionData?.fields?.name : user.name
  const imageUrl = actionData?.fields?.imageUrl
    ? actionData?.fields?.imageUrl
    : user.imageUrl

  const submiting = transition.state === 'submitting'

  return (
    <div className="md:grid md:grid-cols-6 md:gap-6">
      <div className="mx-2 mt-5 md:col-span-4 md:col-start-2 md:mt-0">
        <SuccessAlert
          message="Perfil actualizado!"
          show={actionData?.success}
        />
        <Form method="post">
          <fieldset disabled={submiting}>
            <div className="overflow-hidden rounded-md shadow">
              <div className="space-y-6 bg-gray-800 px-4 py-5 shadow-md sm:p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <TextInput
                      label="Nombre"
                      name="name"
                      defaultValue={name}
                      fieldError={actionData?.fieldErrors?.name}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3">
                    <AvatarInput
                      label="Url de la imagen de perfil"
                      name="imageUrl"
                      defaultValue={imageUrl}
                      fieldError={actionData?.fieldErrors?.imageUrl}
                    />
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

export const ErrorBoundary: ErrorBoundaryComponent = ({error}) => {
  return <AlertError error={error} />
}
