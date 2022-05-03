import type {ErrorBoundaryComponent} from '@remix-run/node'

import {isProduction} from '~/utils'

export const AlertError: ErrorBoundaryComponent = ({error}) => {
  return (
    <div
      className="mb-4 rounded-lg bg-red-100 p-4 text-sm text-red-700 dark:bg-red-200 dark:text-red-800"
      role="alert"
    >
      <h3 className="text-lg font-medium leading-6 text-gray-900">
        Algo salió mal
      </h3>
      <div className="mt-2">
        <p className="text-sm text-gray-500">{error.message}</p>
      </div>
      {!isProduction() && (
        <div className="mt-2 overflow-x-auto">
          <p>Stack trace:</p>
          <pre className="text-sm text-gray-500">
            <code>{error.stack}</code>
          </pre>
        </div>
      )}
    </div>
  )
}
