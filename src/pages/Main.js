import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Main = () => {
  return (
    <div className='container'>
      <Navbar />
      <div className='content-wrap'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Main