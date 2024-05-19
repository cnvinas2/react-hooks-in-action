import { FaSpinner } from 'react-icons/fa'
import React from 'react'

export default function Spinner(props) {
  return (
    <span {...props}>
      <FaSpinner className="icon-loading" />
    </span>
  )
}
