import React from 'react'

function FinishScreen({ points, totalPoints, highscore }) {
  return (
    <>
      <p className='result'>
        You scored {points} out of {totalPoints} (
        {~~((points / totalPoints) * 100)} %)
      </p>
      <p className='highscore'>
        (Highscore: <strong>{highscore}</strong> ponts)
      </p>
    </>
  )
}

export default FinishScreen
