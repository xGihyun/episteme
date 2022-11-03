import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const Main = () => {
  return (
    <div className='container'>
      <div className='content-wrap'>
        <Link to='/' className='site-name'>
          <h1>Episteme</h1>
        </Link>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Main