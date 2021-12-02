import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Select from '../components/inputs/Select'

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
                <Select
                  label='Si tuviera la oportunidad de viajar, preferiría conocer:'
                  name='primera'
                  options={[
                    'Las culturas aborígenes del Amazonas',
                    'El Museo del Louvre de Paris',
                    'La Bolsa de Valores de Nueva York',
                    'Las especies protegidas de las Islas Galápagos',
                    'El Centro de Investigaciones de la Nasa',
                  ]}
                />
                <Select
                  label='En la producción de una película, me gustaría participar en:'
                  name='segunda'
                  options={[
                    'Elaboración del guión',
                    'Actuación',
                    'Publicidad y marketing',
                    'Elección y preservación de los escenarios naturales',
                    'Edición de sonido y digitalización',
                  ]}
                />
                <Select
                  label='Si tuviese que hacer un trabajo de investigación, me inclinaría por:'
                  name='tercera'
                  options={[
                    'Los efectos de los medios de comunicación de masas en las persona',
                    'La evolución de la música folklórica en nuestro país',
                    'El impacto de la globalización económica en la producción nacional',
                    'Los últimos avances en tratamiento para el cáncer',
                    'El desarrollo de la robótica',
                  ]}
                />
              </div>
            </div>

            <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
              <button
                onClick={() => sendRequest('construir', 'none')}
                type='button'
                className='inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
              >
                Siguiente
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
