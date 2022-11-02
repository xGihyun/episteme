import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Main = () => {
  return (
    <div>
      <Link to='/' className='site-name'>
        <h1>Episteme</h1>
      </Link>
      <div className='container'>
        <Outlet />
      </div>
    </div>
  )
}

export default Main