// Round off
export const roundOff = (num) => {
  for(let i in num){
    if(num[i] != null){
      num[i] = parseFloat(num[i].toFixed(2))
    }
  }
}

// Formulas
// Table completion
export const moleTableFormulas = {
  // Solute
  nSolute: (massSolute, mwSolute, nSolvent, nfSolvent, nfSolute, molality, massSolvent, molarity, massVolSolution) => {
    if (massSolute != null && mwSolute != null) { // main formula
      return massSolute/mwSolute
    } else if (nSolvent != null && nfSolvent != null) { // derived formula from nfsolvent
      return  (nSolvent/nfSolvent) - nSolvent 
    } else if (nSolvent != null && nfSolute != null) { // derived formula from nfsolute, parenthesis very improtnat
      return (nfSolute * nSolvent)/ (1 - nfSolute)
    } else if(molality != null && massSolvent != null){
      return molality * (massSolvent / 1000)
    } else if(molarity != null && massVolSolution != null){
      return molarity * (massVolSolution / 1000)
    }
    return null
  },
  mwSolute: (massSolute, nSolute) => {
    if (massSolute != null && nSolute != null) {
      return massSolute/nSolute
    }
    return null
  },
  massSolute: (massVolSolution, massSolvent, mwSolute, nSolute) => {
    if (massVolSolution != null && massSolvent != null) {
       return massVolSolution - massSolvent
    } else if (mwSolute != null && nSolute != null) {
       return mwSolute * nSolute 
    }
    return null
  },
  nfSolute: (nSolute, nSolvent, nfSolvent) => {
    if (nSolute != null && nSolvent != null) {
      return ((nSolute) / ((nSolute) + (nSolvent)))
    } else if (nfSolvent != null) {
      return 1 - nfSolvent
    }
    return null
  },
  // Solvent
  nSolvent: (massSolvent, mwSolvent, nSolute, nfSolute, nfSolvent) => {
    if (massSolvent != null && mwSolvent != null) {
      return massSolvent/mwSolvent
    } else if (nSolute != null && nfSolute != null) {
      return (nSolute/nfSolute) - nSolute
    } else if (nSolute != null && nfSolvent != null) {
      return (nfSolvent * nSolute) /(1 - nfSolvent)
    }
    return null
  },
  mwSolvent: (massSolvent, nSolvent) => {
    if (massSolvent != null && nSolvent != null) {
      return massSolvent/nSolvent
    }  
    return null
  },
  massSolvent: (massVolSolution, massSolute, mwSolvent, nSolvent, nSolute, molality) => {
    if (massVolSolution != null && massSolute != null) {
      return massVolSolution - massSolute;
    } else if (mwSolvent != null && nSolvent != null) {
      return mwSolvent * nSolvent
    } else if(nSolute != null && molality != null){
      return (nSolute / molality) * 1000 // From kg to grams
    }
    return null
  },
  nfSolvent: (nSolute, nSolvent, nfSolute) => {
    if (nSolute != null && nSolvent != null) {
      return ((nSolvent) / ((nSolute) + (nSolvent)))
    } else if (nfSolute != null) {
      return 1 - nfSolute
    }
    return null
  },
  // Solution
  massVolSolution: (massSolute, massSolvent, nSolute, molarity) => {
    if (massSolute != null && massSolvent != null) {
      return massSolute + massSolvent;
    } else if(nSolute != null && molarity != null){
      return (nSolute / molarity) * 1000 // From kg to grams
    }
    return null
  },
  // Molality -> Normality
  molality: (nSolute, massSolvent) => {
    if(nSolute != null && massSolvent != null){
      return (nSolute) / (massSolvent / 1000)
    }
    return null
  },
  molarity: (nSolute, massVolSolution) => {
    if(nSolute != null && massVolSolution != null){
      return (nSolute) / (massVolSolution / 1000)
    }
    return null
  },
  normality: (eqOfSolute, eqPerMole, molarity, massVolSolution) => {
    if(eqOfSolute != null && massVolSolution != null){
      return ((eqOfSolute) / (massVolSolution / 1000))
    } else if(molarity != null && eqPerMole != null){
      return molarity * eqPerMole
    }
    return null
  },
  equivalentWeight: (mwSolute, eqPerMole) => {
    if(mwSolute != null && eqPerMole != null){
      return mwSolute / eqPerMole
    }
    return null
  },
  equivalentsOfSolute: (massSolute, eqWeight) => {
    if(massSolute != null && eqWeight != null){
      return massSolute / eqWeight
    }
    return null
  }
}
