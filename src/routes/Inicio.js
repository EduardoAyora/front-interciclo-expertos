import { Link } from 'react-router-dom'
import { useEffect, useState, useReducer } from 'react'

import Select from '../components/inputs/Select'

export default function Inicio() {
  const [question, setQuestion] = useState('')
  const [topic, setTopic] = useState('')
  const [isFinished, setIsFinished] = useState(false)

  const [state, dispatch] = useReducer(reducer, initialState)

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
      dispatch(reset())
    }
  }

  async function onSubmitInitialForm(e) {
    e.preventDefault()
    console.log('antes state', state)
    dispatch(submit())
    console.log('state', state)
    if (!state.isValid) return
    let firstValue = state.questions[0].value
    const responseData = await fetch(`${url}/grupo-preguntas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ responses: [firstValue] }),
    })
    const response = await responseData.json()
    setQuestion(response.message)
    setTopic(response.topic)
  }

  if (question === 'start') {
    return (
      <ContenedorInicio restartApp={restartApp}>
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

const SELECT_OPTION = 'SELECT_OPTION'
const SUBMIT = 'SUBMIT'
const RESET = 'RESET'

export function selectOption(questionNumber, selectedOption) {
  return {
    type: SELECT_OPTION,
    questionNumber,
    selectedOption,
  }
}

export function submit() {
  return {
    type: SUBMIT,
  }
}

export function reset() {
  return {
    type: RESET,
  }
}

const initialState = {
  questions: [
    {
      value: 'false',
      error: false,
    },
    {
      value: 'false',
      error: false,
    },
    {
      value: 'false',
      error: false,
    },
  ],
  isValid: false,
}

function reducer(state, action) {
  switch (action.type) {
    case SELECT_OPTION: {
      const newQuestions = [...state.questions]
      newQuestions[action.questionNumber].value = action.selectedOption
      if (action.selectedOption === 'false') {
        newQuestions[action.questionNumber].error = true
      } else {
        newQuestions[action.questionNumber].error = false
      }
      return {
        ...state,
        questions: newQuestions,
        isValid: initialFormIsValid(newQuestions),
      }
    }
    case SUBMIT: {
      const newQuestions = [...state.questions]
      newQuestions.forEach((question) => {
        console.log('submit', question.value)
        if (question.value === 'false') question.error = true
      })
      console.log(newQuestions)
      return {
        ...state,
        questions: newQuestions,
        isValid: initialFormIsValid(newQuestions),
      }
    }
    case RESET: {
      console.log(initialState)
      return initialState
    }
    default:
      return state
  }
}

function initialFormIsValid(questions) {
  let isValid = true
  questions.forEach((question) => {
    if (question.error || question.value === 'false') isValid = false
  })
  return isValid
}
