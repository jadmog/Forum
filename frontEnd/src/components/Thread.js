import React from 'react'

function Thread({ title, subject, author }) {

  return (
    <div>
      <p>{title}</p>
      <p>{subject}</p>
      <p>{author}</p>
    </div>
  )
}

export default Thread