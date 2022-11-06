import React from 'react'
import { moleTable } from './InputItems'
import  copy  from '../images/copy.png'

const Answers = ({ open, answers, roundOff }) => {
  
  if(!open){return null}

  return (
    <div className='answers-container'>
      <div className='answers'>
        {Object.keys(answers).map((answer, index) => {
          return (
            <div className='answer' key={moleTable[index].id}>
              <span className='label'>{moleTable[index].placeholder}:</span>
              <div className='number'>
                <span>{answers[answer] === null ? '-----' : roundOff ? answers[answer].toFixed(2) : answers[answer]}</span>
                <img src={copy} alt="copy" className='copy-btn' 
                onClick={() => {navigator.clipboard.writeText(roundOff ? answers[answer].toFixed(2) : answers[answer])}} 
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