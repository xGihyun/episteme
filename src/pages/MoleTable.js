import React, { useState } from 'react'
import { moleTable } from '../components/InputItems'
import { inputGiven } from '../components/Solve'
import Dropdown from '../components/Dropdown'
import Answers from '../components/Answers'

const MoleTable = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [answers, setAnswers] = useState(null)
  const [roundOff, setRoundOff] = useState(false)

  const handleRoundOff = () => {
    setRoundOff(current => !current)
  }

  return (
    <>
      <div className='form-container'>
        <form className='form' name='input-given'>
          {moleTable.map((input) => {
            if(input.data === "mass-solute" || input.data === "mass-solvent" || input.data === "mass-vol-solution"){
              return (
                <div key={input.id} className='input-container'>
                  <input title='' type="text" data-input={input.data} required />
                  <span>{input.placeholder}</span>
                  <Dropdown />
                </div>
              )
            }
            return (
              <div key={input.id} className='input-container'>
                <input title='' type="text" data-input={input.data} required />
                <span>{input.placeholder}</span>
              </div>
            )
          })}
        </form>
        <div className='round-off'>
          <div className='switch' >
            <span>Round Off</span>
            <input type='checkbox' value={roundOff} onChange={handleRoundOff} title='' />
          </div>
          <p>(Resubmit after toggling Round Off)</p>
        </div>
        <div className='btn-container'>
          <button className='submit-btn' onClick={() => {setAnswers(inputGiven(roundOff)); setIsOpen(true)}}>
            <span>Submit</span>
          </button>
        </div>
      </div>
      <Answers open={isOpen} answers={answers} roundOff={roundOff} />
    </>
  )
}

export default MoleTable
