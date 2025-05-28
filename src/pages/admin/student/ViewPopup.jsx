import Popup from '@/pages/common/Popup'
import React from 'react'

export default function ViewPopup({ isOpen, onClose, data }) {
  return (
     <Popup isOpen={isOpen} onClose={onClose} size={"max-w-[510px]"}>
      ViewPopup
     </Popup>
  )
}
