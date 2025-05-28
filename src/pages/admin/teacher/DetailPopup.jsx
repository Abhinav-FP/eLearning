import Popup from '@/pages/common/Popup'
import React from 'react'

export default function DetailPopup({ isOpen, onClose, data }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} size={"max-w-[510px]"}>
    <div>DetailPopup</div>
    </Popup>
  )
}
