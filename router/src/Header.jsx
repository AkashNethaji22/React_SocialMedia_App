import React from 'react'
import { useContext } from 'react'
import { DataContext } from './App'

const Header = () => {
  const {title}=useContext(DataContext)
  return (
    <header className='Header'>
        <h1>{title}</h1>
    </header>
  )
}

export default Header