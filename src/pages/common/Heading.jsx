import React from 'react'

export default function Heading({title ,  classess}) {
  return (
    <div>
      <h2 className={`heading ${classess}`}>
         {title}
      </h2>
    </div>
  )
}
