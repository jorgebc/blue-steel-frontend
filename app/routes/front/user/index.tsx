import type {ActionFunction} from '@remix-run/node'

import {useActionData, Form} from '@remix-run/react'
import {redirect} from '@remix-run/node'

export const action: ActionFunction = async ({request}) => {
  const formData = await request.formData()
  console.log('Action function')
  console.log(formData)
  return redirect('/front/user')
}

export default function User() {
  return (
    <Form method="post">
      <p>
        <label>
          Name: <input name="name" type="text" />
        </label>
      </p>
      <p>
        <label>
          Description:
          <br />
          <textarea name="description" />
        </label>
      </p>
      <p>
        <button type="submit">Create</button>
      </p>
    </Form>
  )
}
