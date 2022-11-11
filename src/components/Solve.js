import { decimalPlaces, moleTableFormulas as formulas } from "./Formulas"
import { round } from 'mathjs'

// Table completion
export const solveTable = (val, decimalPlaces) => {

  // Solve for mass solute, mass solvent, and mass solution
  if(val.massSolute === null){
    val.massSolute = round(parseFloat(formulas.massSolute(val.massVolSolution, val.massSolvent, val.mwSolute, val.nSolute, val.eqWeight, val.normality)), decimalPlaces)
  } 
  if(val.massSolvent === null){
    val.massSolvent = round(parseFloat(formulas.massSolvent(val.massVolSolution, val.massSolute, val.mwSolvent, val.nSolvent, val.nSolute, val.molality)), decimalPlaces)
  } 
  if(val.massVolSolution === null){
    val.massVolSolution = round(parseFloat(formulas.massVolSolution(val.massSolute, val.massSolvent, val.nSolute, val.molarity)), decimalPlaces)
  }
  
  // Solve for mole solute and mole solvent
  if(val.nSolute === null){
    val.nSolute = round(parseFloat(formulas.nSolute(val.massSolute, val.mwSolute, val.nSolvent, val.nfSolvent, val.nfSolute, val.molality, val.massSolvent, val.molarity, val.massVolSolution)), decimalPlaces)
  }
  if(val.nSolvent === null){
    val.nSolvent = round(parseFloat(formulas.nSolvent(val.massSolvent, val.mwSolvent, val.nSolute, val.nfSolute, val.nfSolvent)), decimalPlaces)
  }
  
  // Solve for mole fraction
  if(val.nfSolute === null){
    val.nfSolute = round(parseFloat(formulas.nfSolute(val.nSolute, val.nSolvent, val.nfSolvent)), decimalPlaces)
  }
  if(val.nfSolvent === null){
    val.nfSolvent = round(parseFloat(formulas.nfSolvent(val.nSolute, val.nSolvent, val.nfSolute)), decimalPlaces)
  }

  // Molality
  if(val.molality === null){
    val.molality = round(parseFloat(formulas.molality(val.nSolute, val.massSolvent)), decimalPlaces)
  }

  // Molarity
  if(val.molarity === null){
    val.molarity = round(parseFloat(formulas.molarity(val.nSolute, val.massVolSolution)), decimalPlaces)
  }

  // Normality
  if(val.eqWeight === null){
    val.eqWeight = round(parseFloat(formulas.equivalentWeight(val.mwSolute, val.eqPerMole)), decimalPlaces)
  }
  if(val.eqOfSolute === null){
    val.eqOfSolute = round(parseFloat(formulas.equivalentsOfSolute(val.massSolute, val.eqWeight)), decimalPlaces)
  }
  if(val.normality === null){
    val.normality = round(parseFloat(formulas.normality(val.eqOfSolute, val.eqPerMole, val.molarity, val.massVolSolution)), decimalPlaces)
  }
}

export const inputGiven = () => {

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

  const unit = document.querySelectorAll('.select')

  // Convert solute to g / ml if the given solute is in kg / L
  if(givenValues.massSolute !== null && (unit[0].value === 'kg' || unit[0].value === 'L')){
    givenValues.massSolute *= 1000
  }

  // Convert solvent to g / ml if the given solvent is in kg / L
  if(givenValues.massSolvent !== null && (unit[1].value === 'kg' || unit[1].value === 'L')){
    givenValues.massSolvent *= 1000
  }

  // Convert solution to g / ml if the given solution is in kg / L
  if(givenValues.massVolSolution !== null && (unit[2].value === 'kg' || unit[2].value === 'L')){
    givenValues.massVolSolution *= 1000
  }

  // Loop to solve everything until values != null, loop limit is only up to 10 to prevent infinite loops when problem is unsolvable
  // Maybe find a way to make this better?
  for(let i = 0; i < 10; i++){
    solveTable(givenValues, decimalPlaces())
  }
  
  return givenValues
}