import { useEffect, useReducer } from 'react'

import Main from './Main'
import Error from './Error'
import Loader from './Loader'
import Header from './Header'
import Question from './Question'
import StartScreen from './StartScreen'
import NextButton from './NextButton'

const initialState = {
  questions: [],

  // "loading","error", "ready", "active", "finished"
  status: 'loading',
  index: 0,
  answer: null,
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

    case 'start':
      return {
        ...state,
        status: 'active',
      }

    case 'newAnswer':
      const question = state.questions.at(state.index)
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      }

    case 'nextQuestion':
      return {
        ...state,
        answer: null,
        index: state.index + 1,
      }

    default:
      throw new Error('Action unknown')
  }
}

export default function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  )

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
        {status === 'ready' && (
          <StartScreen numQuestion={numQuestion} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              points={points}
            />
            <NextButton dispatch={dispatch} answer={answer} />
          </>
        )}
      </Main>
    </div>
  )
}
