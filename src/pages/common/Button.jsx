import React from 'react'

export default function Button({title , classess
}) {
  return (
    <button className={`${classess} text-white`}>
    {title}
  </button>
  )
}
