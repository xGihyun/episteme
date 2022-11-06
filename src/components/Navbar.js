import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <Link to='/' className='site-name'>
        <h1>Episteme</h1>
      </Link>
    </nav>
  )
}

export default Navbar