export default function Select({ label, name, options }) {
  return (
    <div className='col-span-6'>
      <label
        htmlFor={name}
        className='block text-2xl font-medium text-gray-700 mb-4'
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        autoComplete={name}
        className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md'
      >
        <option>Seleccione...</option>
        {options.map((option, index) => (
          <option value={index} key={index}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
