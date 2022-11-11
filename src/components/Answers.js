import React from 'react'
import { moleTable } from './InputItems'
import copy from '../images/copy.png'
import { decimalPlaces } from './Formulas'

const Answers = ({ open, answers }) => {
  
  if(!open){return null}

  return (
    <div className='answers-container'>
      <div className='answers'>
        {Object.keys(answers).map((answer, index) => {
          return (
            <div className='answer' key={moleTable[index].id}>
              <span className='label'>{moleTable[index].placeholder}:</span>
              <div className='number'>
                <span>{answers[answer] === null || isNaN(answers[answer]) ? '-----' : answers[answer].toFixed(decimalPlaces())}</span>
                <img src={copy} alt="copy" className='copy-btn' 
                onClick={() => {navigator.clipboard.writeText(answers[answer].toFixed(decimalPlaces()))}} 
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Answers