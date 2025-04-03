import React from 'react'

export default function Heading({title ,  classess}) {
  return (
    <div>
      <h2 className={`${classess} text-white`}>
        {title}
      </h2>
    </div>
  )
}
