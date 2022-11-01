import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigate = () => {
  return (
    <div className='topic-container'>
      <NavLink to='/mole-table' className={({isActive}) => (isActive ? 'topic-btn active' : 'topic-btn')}>
        Table Completion
      </NavLink>
    </div>
  )
}

export default Navigate