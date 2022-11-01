import React, { useState, useEffect } from 'react'
import PulseLoader from "react-spinners/PulseLoader"
import { motion } from "framer-motion"
import Reveal from '../animations/Reveal'

const Surprise = () => {

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  return (
    <div className='birthday'>
      {
        loading ? (
          <PulseLoader color={"#de4b00"} loading={loading} size={15} aria-label="Loading Spinner" data-testid="loader" />
        ) : (
          <Reveal>
            <div className='text'>
              <h1>Happy birthday!</h1>
              <p>I hope you'll always have a wonderful day</p>
            </div>
          </Reveal>
        )
      }
    </div>
    
  )
}

export default Surprise