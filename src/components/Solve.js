import { moleTableFormulas as formulas } from "./Formulas"

// Table completion
export const solveTable = (val) => {

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