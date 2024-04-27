import React from 'react'

function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null
  return (
    <div>
      <div className='options'>
        {question.options.map((option, index) => (
          <button
            disabled={hasAnswered}
            onClick={() => dispatch({ type: 'newAnswer', payload: index })}
            className={`btn btn-option ${index === answer ? 'answer' : ''} ${
              hasAnswered && (index === question.correctOption ? 'correct' : '')
            } ${
              hasAnswered &&
              (index === answer && answer !== question.correctOption
                ? 'wrong'
                : '')
            }`}
            key={option}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Options
