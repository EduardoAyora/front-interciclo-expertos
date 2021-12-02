import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Inicio() {
  const [question, setQuestion] = useState('')

  const url = 'http://127.0.0.1:5000/api/preguntas'

  useEffect(() => {
    sendRequest('', '')
  }, [])

  async function sendRequest(topic, value) {
    const questionData = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tema: topic,
        valor: value,
      }),
    })
    const parsedQuestion = await questionData.json()
    setQuestion(parsedQuestion)
  }

  if (question === 'start') {
    return (
      <ContenedorInicio>
        <form>
          <div className='shadow overflow-hidden sm:rounded-md'>
            <div className='px-4 py-5 bg-white sm:p-6'>
              <div className='grid grid-cols-6 gap-6'>
                <div className='col-span-6 sm:col-span-3'>
                  <h3 className='block text-2xl font-medium text-gray-700'>
                    Te gusta construir
                  </h3>
                </div>
              </div>
            </div>
            <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
              <button
                onClick={() => sendRequest('construir', false)}
                type='button'
                className='mr-4 inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
              >
                No
              </button>
              <button
                onClick={() => sendRequest('construir', true)}
                type='button'
                className='inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
              >
                Si
              </button>
            </div>
          </div>
        </form>
      </ContenedorInicio>
    )
  }

  return (
    <ContenedorInicio>
      <form>
        <div className='shadow overflow-hidden sm:rounded-md'>
          <div className='px-4 py-5 bg-white sm:p-6'>
            <div className='grid grid-cols-6 gap-6'>
              <div className='col-span-6 sm:col-span-3'>
                <h3 className='block text-2xl font-medium text-gray-700'>
                  {question}
                </h3>
              </div>
            </div>
          </div>
          <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
            <button
              onClick={() => sendRequest(question, false)}
              type='button'
              className='mr-4 inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
            >
              No
            </button>
            <button
              onClick={() => sendRequest(question, true)}
              type='button'
              className='inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
            >
              Si
            </button>
          </div>
        </div>
      </form>
    </ContenedorInicio>
  )
  // return (
  //   <div className='mt-10 sm:mt-0'>
  //     <Link to='/otro'>Ir a otro</Link>
  //     <div className='mt-5 md:mt-0 md:col-span-2'>
  //       <form action='#' method='POST'>
  //         <div className='shadow overflow-hidden sm:rounded-md'>
  //           <div className='px-4 py-5 bg-white sm:p-6'>
  //             <div className='grid grid-cols-6 gap-6'>
  //               <div className='col-span-6 sm:col-span-3'>
  //                 <label
  //                   htmlFor='first-name'
  //                   className='block text-sm font-medium text-gray-700'
  //                 >
  //                   First name
  //                 </label>
  //                 <input
  //                   type='text'
  //                   name='first-name'
  //                   id='first-name'
  //                   autoComplete='given-name'
  //                   className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
  //                 />
  //               </div>

  //               <div className='col-span-6 sm:col-span-3'>
  //                 <label
  //                   htmlFor='last-name'
  //                   className='block text-sm font-medium text-gray-700'
  //                 >
  //                   Last name
  //                 </label>
  //                 <input
  //                   type='text'
  //                   name='last-name'
  //                   id='last-name'
  //                   autoComplete='family-name'
  //                   className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
  //                 />
  //               </div>

  //               <div className='col-span-6 sm:col-span-3'>
  //                 <label
  //                   htmlFor='email-address'
  //                   className='block text-sm font-medium text-gray-700'
  //                 >
  //                   Email address
  //                 </label>
  //                 <input
  //                   type='text'
  //                   name='email-address'
  //                   id='email-address'
  //                   autoComplete='email'
  //                   className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
  //                 />
  //               </div>

  //               <div className='col-span-6 sm:col-span-3'>
  //                 <label
  //                   htmlFor='country'
  //                   className='block text-sm font-medium text-gray-700'
  //                 >
  //                   Country
  //                 </label>
  //                 <select
  //                   id='country'
  //                   name='country'
  //                   autoComplete='country-name'
  //                   className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
  //                 >
  //                   <option>United States</option>
  //                   <option>Canada</option>
  //                   <option>Mexico</option>
  //                 </select>
  //               </div>

  //               <div className='col-span-6'>
  //                 <label
  //                   htmlFor='street-address'
  //                   className='block text-sm font-medium text-gray-700'
  //                 >
  //                   Street address
  //                 </label>
  //                 <input
  //                   type='text'
  //                   name='street-address'
  //                   id='street-address'
  //                   autoComplete='street-address'
  //                   className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
  //                 />
  //               </div>

  //               <div className='col-span-6 sm:col-span-6 lg:col-span-2'>
  //                 <label
  //                   htmlFor='city'
  //                   className='block text-sm font-medium text-gray-700'
  //                 >
  //                   City
  //                 </label>
  //                 <input
  //                   type='text'
  //                   name='city'
  //                   id='city'
  //                   autoComplete='address-level2'
  //                   className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
  //                 />
  //               </div>

  //               <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
  //                 <label
  //                   htmlFor='region'
  //                   className='block text-sm font-medium text-gray-700'
  //                 >
  //                   State / Province
  //                 </label>
  //                 <input
  //                   type='text'
  //                   name='region'
  //                   id='region'
  //                   autoComplete='address-level1'
  //                   className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
  //                 />
  //               </div>

  //               <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
  //                 <label
  //                   htmlFor='postal-code'
  //                   className='block text-sm font-medium text-gray-700'
  //                 >
  //                   ZIP / Postal code
  //                 </label>
  //                 <input
  //                   type='text'
  //                   name='postal-code'
  //                   id='postal-code'
  //                   autoComplete='postal-code'
  //                   className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
  //                 />
  //               </div>
  //             </div>
  //           </div>
  //           <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
  //             <button
  //               type='submit'
  //               className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
  //             >
  //               Guardar
  //             </button>
  //           </div>
  //         </div>
  //       </form>
  //     </div>
  //   </div>
  // )
}

function ContenedorInicio({ children }) {
  return (
    <div className='mt-10 sm:mt-0'>
      <Link to='/otro'>Reiniciar</Link>
      <div className='mt-5 md:mt-0 md:col-span-2'>{children}</div>
    </div>
  )
}
