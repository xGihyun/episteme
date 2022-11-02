import React from 'react'
import { moleTable } from '../components/InputItems'
import { roundOff } from '../components/Formulas'
import { solveTable } from '../components/Solve'
import Dropdown from '../components/Dropdown'

const MoleTable = () => {

  const clearAnswers = (list) => {
    list.innerHTML = ""
  }

  const inputGiven = () => {

    // Inputs
    const tableInputs = {
      massSolute: document.querySelector("[data-input='mass-solute']"),
      mwSolute: document.querySelector("[data-input='mw-solute']"),
      massSolvent: document.querySelector("[data-input='mass-solvent']"),
      mwSolvent: document.querySelector("[data-input='mw-solvent']"),
      massVolSolution: document.querySelector("[data-input='mass-vol-solution']"),
      nSolute: document.querySelector("[data-input='n-solute']"),
      nSolvent: document.querySelector("[data-input='n-solvent']"),
      nfSolute: document.querySelector("[data-input='nf-solute']"),
      nfSolvent: document.querySelector("[data-input='nf-solvent']"),
      molality: document.querySelector("[data-input='molality']"),
      molarity: document.querySelector("[data-input='molarity']"),
      eqPerMole: document.querySelector("[data-input='eq-per-mole']"),
      eqWeight: document.querySelector("[data-input='eq-weight']"),
      eqOfSolute: document.querySelector("[data-input='eq-of-solute']"),
      normality: document.querySelector("[data-input='normality']")
    }
    
    // Values of the input (number)
    let givenValues = {
      massSolute: Number(tableInputs.massSolute.value) || null,
      mwSolute: Number(tableInputs.mwSolute.value) || null,
      massSolvent: Number(tableInputs.massSolvent.value) || null,
      mwSolvent: Number(tableInputs.mwSolvent.value) || 18, // Default water (H2O) = 18g/mol
      massVolSolution: Number(tableInputs.massVolSolution.value) || null,
      nSolute: Number(tableInputs.nSolute.value) || null,
      nSolvent: Number(tableInputs.nSolvent.value) || null,
      nfSolute: Number(tableInputs.nfSolute.value) || null,
      nfSolvent: Number(tableInputs.nfSolvent.value) || null,
      molality: Number(tableInputs.molality.value) || null,
      molarity: Number(tableInputs.molarity.value) || null,
      eqPerMole: Number(tableInputs.eqPerMole.value) || null,
      eqWeight: Number(tableInputs.eqWeight.value) || null,
      eqOfSolute: Number(tableInputs.eqOfSolute.value) || null,
      normality: Number(tableInputs.normality.value) || null
    }

    const answerList = document.querySelector('.answer-list')
    const unit = document.querySelector('.select')
    
    // Clear answers after submitting new inputs
    clearAnswers(answerList)

    // Convert solution to g / ml if the given solution is in kg / L
    if(givenValues.massVolSolution != null && (unit.value === 'kg' || unit.value === 'L')){
      givenValues.massVolSolution *= 1000
    }

    // Loop to solve everything until values != null, loop limit is only up to 10 to prevent infinite loops when problem is unsolvable
    // Maybe find a way to make this better?
    for(let i = 0; i < 10; i++){
      roundOff(givenValues)
      solveTable(givenValues)
    }

    // Append to DOM
    // Might create a separate component for appending answers
    for(let key in givenValues){
      answerList.innerHTML += `<li>${key}: ${givenValues[key].toFixed(2)}</li>`
    }
  }

  // Literally solve for everything until none of the values == null
  

  return (
    <>
      <div className='form-container'>
        <form className='form' name='input-given'>
          {moleTable.map((input) => {
            if(input.data === "mass-vol-solution"){
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
        <button className='submit-btn' onClick={inputGiven}>
          <span>Submit</span>
        </button>
      </div>
      <div className='answers'>
        <ul className='answer-list'>
        </ul>
      </div>
    </>
  )
}

export default MoleTable
