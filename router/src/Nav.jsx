import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from './App'

const Nav = () => {
  const {search,setsearch}=useContext(DataContext)
  return (
        <nav className='Nav'>
          <form className='searchForm'onSubmit={(e)=>e.preventDefault()}>
            <label htmlFor='search'>Search posts : </label>
            <input
            type='text'
            id="search"
            placeholder='search post'
            value={search}
            onChange={(e)=>setsearch(e.target.value)}
            />
          </form>
             <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/post">Post</Link></li>
                <li><Link to="/about">About</Link></li>
             </ul>
        </nav>
  )
}

export default Nav