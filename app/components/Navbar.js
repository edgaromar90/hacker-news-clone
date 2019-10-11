import React from 'react'
import { NavLink } from 'react-router-dom'

const activeStyle = {
  color: '#21ce99'
}

export default function Navbar () {
  return (
    <nav>
      <NavLink exact to='/' className='navbar-item' activeStyle={activeStyle}>Top</NavLink>
      <NavLink exact to='/new' className='navbar-item' activeStyle={activeStyle}>New</NavLink>
    </nav>
  )
}