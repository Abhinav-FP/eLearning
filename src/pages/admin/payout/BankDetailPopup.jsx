import Popup from '@/pages/common/Popup'
import React from 'react'

export default function BankDetailPopup({ isOpen, onClose, data }) {
// console.log("data",data);
  return (
    <Popup isOpen={isOpen} onClose={onClose} size="max-w-[510px]">
    <div>BankDetailPopup</div>
    </Popup>
  )
}
