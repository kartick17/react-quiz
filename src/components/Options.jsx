import React from 'react'

function Options({ options }) {
  return (
    <div>
      <div className='options'>
        {options.map((option) => (
          <button className='btn btn-option' key={option}>
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Options
