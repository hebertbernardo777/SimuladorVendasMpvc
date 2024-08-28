import React from 'react'
import './Button.css'

const Button = ({type, children, onClick, className}) => {
  return (
    <button type={type} className={className} onClick={onClick}>{children}</button>
  )
}

export default Button