import React from 'react'

const Message = ({message}) => {
  return (
    <div className='message'>
      <span>{message[0]} to {message[1]}: {message[2]}</span>
      <span>Date: {message[3]}</span>
    </div>
  )
}

export default Message