export function TextInput({
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
      <div className="mt-1 flex rounded-md shadow-sm">
        <input
          type="text"
          name={name}
          id={name}
          defaultValue={defaultValue}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
      </div>
    </>
  )
}
