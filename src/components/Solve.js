import { decimalPlaces, solveValues } from "./Formulas"

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
    massSolute: parseFloat(tableInputs.massSolute.value) || null,
    mwSolute: parseFloat(tableInputs.mwSolute.value) || null,
    massSolvent: parseFloat(tableInputs.massSolvent.value) || null,
    mwSolvent: parseFloat(tableInputs.mwSolvent.value) || 18, // Default water (H2O) = 18g/mol
    massVolSolution: parseFloat(tableInputs.massVolSolution.value) || null,
    nSolute: parseFloat(tableInputs.nSolute.value) || null,
    nSolvent: parseFloat(tableInputs.nSolvent.value) || null,
    nfSolute: parseFloat(tableInputs.nfSolute.value) || null,
    nfSolvent: parseFloat(tableInputs.nfSolvent.value) || null,
    molality: parseFloat(tableInputs.molality.value) || null,
    molarity: parseFloat(tableInputs.molarity.value) || null,
    eqPerMole: parseFloat(tableInputs.eqPerMole.value) || null,
    eqWeight: parseFloat(tableInputs.eqWeight.value) || null,
    eqOfSolute: parseFloat(tableInputs.eqOfSolute.value) || null,
    normality: parseFloat(tableInputs.normality.value) || null
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
  for(let i = 0; i < 5; i++){
    solveValues(givenValues, decimalPlaces())
  }
  
  return givenValues
}