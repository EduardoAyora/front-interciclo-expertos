import { selectOption } from '../../routes/Inicio'

export default function Select({
  label,
  name,
  options,
  value,
  error,
  questionNumber,
  dispatch,
}) {
  return (
    <div className='col-span-6'>
      <label
        htmlFor={name}
        className='block text-2xl font-medium text-gray-700 mb-4'
      >
        {label}
      </label>
      <select
        onChange={(e) => dispatch(selectOption(questionNumber, e.target.value))}
        value={value}
        id={name}
        name={name}
        autoComplete={name}
        className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-md'
      >
        <option value={false}>Seleccione...</option>
        {options.map((option, index) => (
          <option value={index} key={index}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className='text-red-500 mt-2'>Este campo es requerido</p>}
    </div>
  )
}
