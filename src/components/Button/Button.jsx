import React from 'react'
import './Button.css'

const Button = ({type='button', children, onClick}) => {
  return (
    <button type={type} className='btn' onClick={onClick}>{children}</button>
  )
}

export default Button