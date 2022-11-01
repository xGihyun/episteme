import React from 'react'
import { motion, useAnimation } from "framer-motion"

const Reveal = ({children}) => {
  const variants = {
    visible: {y: 0, transition: { duration: 1, ease: 'easeOut'}, opacity: 1},
    hidden: {y: '5vw', opacity: 0}
  }

  const animation = useAnimation()

  return (
    <motion.div initial={variants.hidden} animate={variants.visible}>
      {children}
    </motion.div>
  )
}

export default Reveal