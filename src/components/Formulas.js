import { round } from "mathjs"

// Round off to number of decimal places
export const decimalPlaces = () => {
  const decimal = document.querySelector("[data-input='round-off']")
  const decimalValue = decimal.value || 0

  return Number(decimalValue)
}

export const solveValues = (val, decimalPlaces) => {
  let items = [
    {
      data: 'massSolute',
      formula: moleTableFormulas.massSolute(val.massVolSolution, val.massSolvent, val.mwSolute, val.nSolute, val.eqWeight, val.normality),
      solved: false
    },
    {
      data: 'massSolvent',
      formula: moleTableFormulas.massSolvent(val.massVolSolution, val.massSolute, val.mwSolvent, val.nSolvent, val.nSolute, val.molality),
      solved: false
    },
    {
      data: 'massVolSolution',
      formula: moleTableFormulas.massVolSolution(val.massSolute, val.massSolvent, val.nSolute, val.molarity),
      solved: false
    },
    {
      data: 'nSolute',
      formula: moleTableFormulas.nSolute(val.massSolute, val.mwSolute, val.nSolvent, val.nfSolvent, val.nfSolute, val.molality, val.massSolvent, val.molarity, val.massVolSolution),
      solved: false
    },
    {
      data: 'nSolvent',
      formula: moleTableFormulas.nSolvent(val.massSolvent, val.mwSolvent, val.nSolute, val.nfSolute, val.nfSolvent),
      solved: false
    },
    {
      data: 'nfSolute',
      formula: moleTableFormulas.nfSolute(val.nSolute, val.nSolvent, val.nfSolvent),
      solved: false
    },
    {
      data: 'nfSolvent',
      formula: moleTableFormulas.nfSolvent(val.nSolute, val.nSolvent, val.nfSolute),
      solved: false
    },
    {
      data: 'molality',
      formula: moleTableFormulas.molality(val.nSolute, val.massSolvent),
      solved: false
    },
    {
      data: 'molarity',
      formula: moleTableFormulas.molarity(val.nSolute, val.massVolSolution),
      solved: false
    },
    {
      data: 'eqWeight',
      formula: moleTableFormulas.equivalentWeight(val.mwSolute, val.eqPerMole),
      solved: false
    },
    {
      data: 'eqOfSolute',
      formula: moleTableFormulas.equivalentsOfSolute(val.massSolute, val.eqWeight),
      solved: false
    },
    {
      data: 'normality',
      formula: moleTableFormulas.normality(val.eqOfSolute, val.eqPerMole, val.molarity, val.massVolSolution),
      solved: false
    }
  ]

  // Loop to solve, this might be very inefficient though
  for(let i in val){
    items.forEach(e => {
      if(i === e.data){
        if(val[i] === null){
          val[i] = e.formula
          if(val[i] !== null){
            val[i] = round(val[i], decimalPlaces)
          }
        }
      }
    })
  }
}

// List of formulas
// Table completion
export const moleTableFormulas = {
  // Solute
  nSolute: (massSolute, mwSolute, nSolvent, nfSolvent, nfSolute, molality, massSolvent, molarity, massVolSolution) => {
    if (massSolute != null && mwSolute != null) { // main formula
      return massSolute/mwSolute
    } else if (nSolvent != null && nfSolvent != null) { // derived formula from nfsolvent
      return (nSolvent/nfSolvent) - nSolvent 
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
  massSolute: (massVolSolution, massSolvent, mwSolute, nSolute, eqWeight, normality) => {
    if (massVolSolution != null && massSolvent != null) {
       return massVolSolution - massSolvent
    } else if (mwSolute != null && nSolute != null) {
       return mwSolute * nSolute 
    } else if(massVolSolution != null && eqWeight != null && normality != null){
      return ((massVolSolution * eqWeight * normality) / 1000)
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
      return (nSolute / molarity) * 1000 // From L to ml
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
    if(molarity != null && eqPerMole != null){ // Shortcut formula
      return molarity * eqPerMole
    } else if(eqOfSolute != null && massVolSolution != null){
      return ((eqOfSolute) / (massVolSolution / 1000))
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
