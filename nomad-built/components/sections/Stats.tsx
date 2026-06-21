'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 120, suffix: '+', label: 'Projects Delivered' },
  { value: 5,   suffix: '★', label: 'Client Satisfaction' },
  { value: 5,   suffix: '',  label: 'Years of Excellence' },
  { value: 2,   suffix: '',  label: 'Locations Served' },
]

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    const duration = 1600
    const start = performance.now()
    const raf = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCount(Math.round(eased * to))
      if (progress < 1) requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [inView, to])

  return (
    <div ref={ref} className="stat-number">
      {count}{suffix}
    </div>
  )
}

export function Stats() {
  return (
    <div className="stats-bar">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          className="stat-item"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Counter to={s.value} suffix={s.suffix} />
          <div className="stat-label">{s.label}</div>
        </motion.div>
      ))}
    </div>
  )
}
