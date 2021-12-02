import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Inicio() {
  const [question, setQuestion] = useState('')
  const [topic, setTopic] = useState('')
  const [isFinished, setIsFinished] = useState(false)

  const url = 'http://127.0.0.1:5000/api'

  useEffect(() => {
    starterRequest()
  }, [])

  function starterRequest() {
    sendRequest('', '')
  }

  async function sendRequest(topic, value) {
    const questionData = await fetch(`${url}/preguntas`, {
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
    setQuestion(parsedQuestion.message)
    setTopic(parsedQuestion.topic)
    if (parsedQuestion.isFinished) setIsFinished(true)
  }

  async function restartApp() {
    const resData = await fetch(`${url}/reiniciar`)
    const res = await resData.json()
    if (res) {
      setIsFinished(false)
      starterRequest()
    }
  }

  if (question === 'start') {
    return (
      <ContenedorInicio restartApp={restartApp}>
        <form>
          <div className='shadow overflow-hidden sm:rounded-md'>
            <div className='px-4 py-5 bg-white sm:p-6'>
              <div className='grid grid-cols-6 gap-6'>
                <div className='col-span-6'>
                  <h3 className='block text-2xl font-medium text-gray-700'>
                    Te gusta construir
                  </h3>
                </div>

                <div className='col-span-6'>
                  <label
                    htmlFor='country'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Country
                  </label>
                  <select
                    id='country'
                    name='country'
                    autoComplete='country-name'
                    className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
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
    <ContenedorInicio restartApp={restartApp}>
      <form>
        <div className='shadow overflow-hidden sm:rounded-md'>
          <div className='px-4 py-5 bg-white sm:p-6'>
            <div className='grid grid-cols-6 gap-6'>
              <div className='col-span-6'>
                <h3 className='block text-2xl font-medium text-gray-700'>
                  {question}
                </h3>
              </div>
            </div>
          </div>
          <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
            {isFinished ? (
              <button
                onClick={restartApp}
                type='button'
                className='mr-4 inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              >
                Reiniciar
              </button>
            ) : (
              <div>
                <button
                  onClick={() => sendRequest(topic, false)}
                  type='button'
                  className='mr-4 inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                >
                  No
                </button>
                <button
                  onClick={() => sendRequest(topic, true)}
                  type='button'
                  className='inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                >
                  Si
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </ContenedorInicio>
  )
}

function ContenedorInicio({ restartApp, children }) {
  return (
    <div className='mt-10 sm:mt-0'>
      <div className='mb-8'>
        <button
          onClick={restartApp}
          type='button'
          className='mr-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          Reiniciar
        </button>
        <Link to='/hechos'>Hechos</Link>
      </div>
      <div className='md:mt-0 md:col-span-2'>{children}</div>
    </div>
  )
}
