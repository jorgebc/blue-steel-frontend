import type {ErrorBoundaryComponent} from '@remix-run/node'

import Alert from '@reach/alert'
import {isProduction} from '~/utils'

export const AlertError: ErrorBoundaryComponent = ({error}) => {
  return (
    <Alert className="mb-4 flex rounded-lg bg-red-200 p-4 text-sm text-red-800">
      <div className="mb-4 rounded-lg p-4 text-sm">
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
    </Alert>
  )
}
