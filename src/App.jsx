import { useEffect, useReducer } from 'react'

import Main from './Main'
import Error from './Error'
import Loader from './Loader'
import Header from './Header'
import StartScreen from './StartScreen'

const initialState = {
  questions: [],

  // "loading","error", "ready", "active", "finished"
  status: 'loading',
}

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      }

    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      }

    default:
      throw new Error('Action unknown')
  }
}

export default function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState)

  const numQuestion = questions.length

  useEffect(
    function () {
      fetch(`http://localhost:8000/questions`)
        .then((res) => res.json())
        .then((data) => dispatch({ type: 'dataReceived', payload: data }))
        .catch((err) => dispatch({ type: 'dataFailed' }))
    },
    [initialState]
  )

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestion={numQuestion} />}
      </Main>
    </div>
  )
}
