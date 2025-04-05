import React from 'react'

export default function Button({title , classes}) {
  return (
    <button className={` font-medium cursor-pointer rounded-full py-2 px-5 ${classes} `}>
    {title}
  </button>
  )
}
