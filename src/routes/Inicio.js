import { useContext } from 'react'

import AppContext from '../context/AppContext'
import Select from '../components/inputs/Select'

export default function Inicio() {
  const appContext = useContext(AppContext)
  const {
    isFinished,
    question,
    topic,
    state,
    dispatch,
    restartApp,
    onSubmitInitialForm,
    sendRequest,
  } = appContext

  if (question === 'start') {
    return (
      <form onSubmit={onSubmitInitialForm}>
        <div className='shadow overflow-hidden sm:rounded-md'>
          <div className='px-4 py-5 bg-white sm:p-6'>
            <div className='grid grid-cols-6 gap-6'>
              <Select
                value={state.questions[0].value}
                error={state.questions[0].error}
                questionNumber={0}
                dispatch={dispatch}
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
                value={state.questions[1].value}
                error={state.questions[1].error}
                questionNumber={1}
                dispatch={dispatch}
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
                value={state.questions[2].value}
                error={state.questions[2].error}
                questionNumber={2}
                dispatch={dispatch}
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
              <Select
                value={state.questions[3].value}
                error={state.questions[3].error}
                questionNumber={3}
                dispatch={dispatch}
                label='En una empresa, el rol que más me acomodaría es:'
                name='cuarta'
                options={[
                  'Encargarme de las relaciones públicas y del bienestar del personal',
                  'Diseñar la imagen corporativa y la campaña publicitaria',
                  'Administrar las ﬁnanzas',
                  'Encargarme que el trabajo no atente contra la salud de los trabajadores',
                  'Deﬁnir la adquisición de nuevas maquinarias para la producción',
                ]}
              />
              <Select
                value={state.questions[4].value}
                error={state.questions[4].error}
                questionNumber={4}
                dispatch={dispatch}
                label='La sección del diario que leería primero es:'
                name='quinta'
                options={[
                  'Política',
                  'Arte',
                  'Economía',
                  'Salud',
                  'Computación',
                ]}
              />
              <Select
                value={state.questions[5].value}
                error={state.questions[5].error}
                questionNumber={5}
                dispatch={dispatch}
                label='Para conocer el desarrollo de una cultura, observaría de preferencia:'
                name='sexta'
                options={[
                  'El desarrollo del pensamiento ﬁlosóﬁco',
                  'El desarrollo de las artes',
                  'El crecimiento económico',
                  'El progreso de la medicina',
                  'Los avances en tecnología e ingeniería',
                ]}
              />
            </div>
          </div>

          <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
            <button
              type='submit'
              className='inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
            >
              Siguiente
            </button>
          </div>
        </div>
      </form>
    )
  }

  return (
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
  )
}
