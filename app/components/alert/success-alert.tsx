import {useEffect, useState} from 'react'

import {Transition} from '@headlessui/react'
import Alert from '@reach/alert'

export function SuccessAlert({
  message,
  show = false,
}: {
  message: string
  show?: boolean
}) {
  const [showAlert, setShowAlert] = useState(false)
  const dismiss = () => setShowAlert(false)
  useEffect(() => {
    if (show) {
      setShowAlert(true)
    }
  }, [show])

  return (
    <Transition
      show={showAlert}
      enter="transition-opacity duration-150"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Alert className="mb-4 flex rounded-lg  bg-green-200 p-4  text-sm text-green-800">
        <svg
          className="h-5 w-5 flex-shrink-0  text-green-800"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        <div className="ml-3 text-sm font-medium  text-green-800">
          {message}
        </div>
        <button
          type="button"
          className="-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-green-100 p-1.5 text-green-500 hover:bg-green-200 focus:ring-2 focus:ring-green-400 dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300"
          aria-label="Cerrar"
          onClick={dismiss}
        >
          <span className="sr-only">Cerrar</span>
          <svg
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </Alert>
    </Transition>
  )
}
