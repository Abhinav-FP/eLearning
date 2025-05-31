import Popup from '@/pages/common/Popup'
import React from 'react'

export default function DetailPopup({ isOpen, onClose, data }) {
  console.log(data)
  return (
    <Popup isOpen={isOpen} onClose={onClose} size={"max-w-[510px]"}>      
     
    </Popup>
  )
}

