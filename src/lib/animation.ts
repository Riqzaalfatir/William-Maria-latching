import type { Variants } from "framer-motion"


export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, translateZ: 0 },
  show: { opacity: 1, y: 0, translateZ: 0 }
}

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 30, translateZ: 0 },
  show: { opacity: 1, x: 0, translateZ: 0 }
}

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -30, translateZ: 0 },
  show: { opacity: 1, x: 0, translateZ: 0 }
}

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } }
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
}

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 4.5, ease: "easeOut" }
  }
}