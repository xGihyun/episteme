import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigate = () => {
  return (
    <div>
      <NavLink to='/mole-table' className={({isActive}) => (isActive ? 'topic-btn active' : 'topic-btn')}>
        Mole Fraction, Molality, Molarity, & Normality
      </NavLink>
    </div>
  )
}

export default Navigate