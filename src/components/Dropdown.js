import React, { useState } from 'react'

const Dropdown = () => {

  const [selected, setSelect] = useState()

  const handleChange = (e) => {
    setSelect(e.target.value)
  }
  
  return (
    <div className='dropdown'>
      <select className='select' title='' value={selected} onChange={handleChange}>
        <option>g</option>
        <option>kg</option>
        <option>ml</option>
        <option>L</option>
      </select>
    </div>
  )
}

export default Dropdown