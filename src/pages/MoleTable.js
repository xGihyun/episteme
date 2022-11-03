import React, { useState } from 'react'
import { moleTable } from '../components/InputItems'
import { inputGiven } from '../components/Solve'
import Dropdown from '../components/Dropdown'
import Answers from '../components/Answers'

const MoleTable = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [answers, setAnswers] = useState(null)

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
      </div>
      <div className='btn-container'>
        <button className='submit-btn' onClick={() => {setAnswers(inputGiven()); setIsOpen(true)}}>
          <span>Submit</span>
        </button>
      </div>
      <Answers open={isOpen} answers={answers} />
    </>
  )
}

export default MoleTable
