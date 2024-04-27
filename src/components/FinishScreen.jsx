import React from 'react'

function FinishScreen({ points, totalPoints, highscore, dispatch }) {
  return (
    <>
      <p className='result'>
        You scored {points} out of {totalPoints} (
        {~~((points / totalPoints) * 100)} %)
      </p>
      <p className='highscore'>
        (Highscore: <strong>{highscore}</strong> ponts)
      </p>
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'restart' })}
      >
        Restart Quiz
      </button>
    </>
  )
}

export default FinishScreen
