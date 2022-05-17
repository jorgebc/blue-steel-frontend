export function AvatarInput({
  label,
  name,
  defaultValue,
  fieldError,
}: {
  label: string
  name: string
  defaultValue?: string
  fieldError: string
}) {
  return (
    <>
      <label htmlFor={name} className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      {fieldError ? (
        <p
          className="mt-1 text-sm text-red-600"
          role="alert"
          id={`${name}-error`}
        >
          {fieldError}
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
            name={name}
            id={name}
            defaultValue={defaultValue}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          />
        </div>
      </div>
    </>
  )
}
