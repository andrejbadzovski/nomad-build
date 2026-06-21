'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  // Dot follows mouse instantly
  const dotX = useSpring(mouseX, { stiffness: 600, damping: 30 })
  const dotY = useSpring(mouseY, { stiffness: 600, damping: 30 })

  // Ring follows with lag
  const ringX = useSpring(mouseX, { stiffness: 120, damping: 22 })
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 22 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onEnter = () => setHovering(true)
    const onLeave = () => setHovering(false)

    window.addEventListener('mousemove', move)

    const updateListeners = () => {
      document.querySelectorAll('a, button, .project-card, .service-card, .team-card').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    updateListeners()

    return () => {
      window.removeEventListener('mousemove', move)
      document.querySelectorAll('a, button, .project-card, .service-card, .team-card').forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [mouseX, mouseY, visible])

  if (isTouch) return null

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          x: dotX, y: dotY,
          translateX: '-50%', translateY: '-50%',
          width: 8, height: 8,
          borderRadius: '50%',
          background: '#c9a96e',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: visible ? 1 : 0,
        }}
        animate={{ scale: hovering ? 0 : 1 }}
        transition={{ scale: { duration: 0.2 } }}
      />
      {/* Ring */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          x: ringX, y: ringY,
          translateX: '-50%', translateY: '-50%',
          borderRadius: '50%',
          border: '1px solid rgba(201,169,110,0.5)',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: hovering ? 60 : 36,
          height: hovering ? 60 : 36,
          borderColor: hovering ? 'rgba(201,169,110,0.9)' : 'rgba(201,169,110,0.5)',
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />
    </>
  )
}
