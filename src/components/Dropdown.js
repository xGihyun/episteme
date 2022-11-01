import React, { useState } from 'react'

const Dropdown = () => {

  const [selected, setSelect] = useState()

  return (
    <div  className='dropdown'>
      {selected}
      <select title='unit' value={selected} onChange={e => setSelect(e.target.value)}>
        <option>g</option>
        <option>kg</option>
      </select>
    </div>
  )
}

export default Dropdown