import React from 'react'
import Popup from '@/pages/common/Popup'

export default function AddLesson({isOpen, onClose}) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} size={'max-w-[510px]'}>
        AddLesson
    </Popup>
  )
}
