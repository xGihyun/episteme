import React from 'react'
import { moleTable } from '../components/InputItems'
import { roundOff, moleTableFormulas as formulas } from '../components/Formulas'
// import Dropdown from '../components/Dropdown'

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

    const answerList = document.querySelector(".answer-list")
    
    clearAnswers(answerList)

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
  const solveTable = (val) => {

    // Solve for mass solute, mass solvent, and mass solution
    if(val.massSolute == null){
      val.massSolute = formulas.massSolute(val.massVolSolution, val.massSolvent, val.mwSolute, val.nSolute)
    } 
    if(val.massSolvent == null){
      val.massSolvent = formulas.massSolvent(val.massVolSolution, val.massSolute, val.mwSolvent, val.nSolvent, val.nSolute, val.molality)
    } 
    if(val.massVolSolution == null){
      val.massVolSolution = formulas.massVolSolution(val.massSolute, val.massSolvent, val.nSolute, val.molarity)
    }
    
    // Solve for mole solute and mole solvent
    if(val.nSolute == null){
      val.nSolute = formulas.nSolute(val.massSolute, val.mwSolute, val.nSolvent, val.nfSolvent, val.nfSolute, val.molality, val.massSolvent, val.molarity, val.massVolSolution)
    }
    if(val.nSolvent == null){
      val.nSolvent = formulas.nSolvent(val.massSolvent, val.mwSolvent, val.nSolute, val.nfSolute, val.nfSolvent)
    }
    
    // Solve for mole fraction
    if(val.nfSolute == null){
      val.nfSolute = formulas.nfSolute(val.nSolute, val.nSolvent, val.nfSolvent)
    }
    if(val.nfSolvent == null){
      val.nfSolvent = formulas.nfSolvent(val.nSolute, val.nSolvent, val.nfSolute)
    }

    // Molality
    if(val.molality == null){
      val.molality = formulas.molality(val.nSolute, val.massSolvent)
    }

    // Molarity
    if(val.molarity == null){
      val.molarity = formulas.molarity(val.nSolute, val.massVolSolution)
    }

    // Normality
    if(val.eqWeight == null){
      val.eqWeight = formulas.equivalentWeight(val.mwSolute, val.eqPerMole)
    }
    if(val.eqOfSolute == null){
      val.eqOfSolute = formulas.equivalentsOfSolute(val.massSolute, val.eqWeight)
    }
    if(val.normality == null){
      val.normality = formulas.normality(val.eqOfSolute, val.eqPerMole, val.molarity, val.massVolSolution)
    }
  }

  return (
    <>
      <div className='form-container'>
        <form className='form' name='input-given'>
          {moleTable.map((input) => {
            if(input.data === "mass-vol-solution"){
              return (
                <div key={input.id} className='input-container'>
                  <input type="text" data-input={input.data} required></input>
                  <span>{input.placeholder}</span>
                  {/* Trying to put a dropdown to select between different units of measurement for solution */}
                  {/* {<Dropdown />} */}
                </div>
              )
            }
            return (
              <div key={input.id} className='input-container'>
                <input type="text" data-input={input.data} required />
                <span>{input.placeholder}</span>
              </div>
            )
          })}
        </form>
      </div>
      <div className='btn-container'>
        <button className='submit-btn' type='button' onClick={inputGiven}>
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
