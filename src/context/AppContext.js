import { useState, createContext, useEffect, useReducer } from 'react'

const AppContext = createContext({})

const url = 'http://127.0.0.1:5000/api'

export function AppContextProvider(props) {
  const [isFinished, setIsFinished] = useState(false)
  const [question, setQuestion] = useState('')
  const [topic, setTopic] = useState('')

  const [state, dispatch] = useReducer(reducer, initialStateGenerator())

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

  async function onSubmitInitialForm(e) {
    e.preventDefault()
    dispatch(submit())
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

  async function restartApp() {
    const resData = await fetch(`${url}/reiniciar`)
    const res = await resData.json()
    if (res) {
      setIsFinished(false)
      starterRequest()
      dispatch(reset())
    }
  }

  const context = {
    isFinished,
    question,
    topic,
    state,
    sendRequest,
    dispatch,
    onSubmitInitialForm,
    restartApp,
  }

  return (
    <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
  )
}

export default AppContext

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

function initialStateGenerator() {
  return {
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
        if (question.value === 'false') question.error = true
      })
      return {
        ...state,
        questions: newQuestions,
        isValid: initialFormIsValid(newQuestions),
      }
    }
    case RESET: {
      return initialStateGenerator()
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
