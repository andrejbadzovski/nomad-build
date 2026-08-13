'use client'
import { motion } from 'framer-motion'

export function HaveDrawings({ settings }: { settings?: any }) {
  const eyebrow = settings?.drawingsEyebrow || 'Already Have Plans?'
  const title   = settings?.drawingsTitle || 'Already have drawings?'
  const titleEm = settings?.drawingsTitleEm || 'We can build that too.'
  const text    = settings?.drawingsText || "Bring your architect's plans or council-approved drawings — our team will take them from paper to a finished build with the same precision and care."
  const cta     = settings?.drawingsCta || 'Start Your Build'

  return (
    <section id="have-drawings">
      <motion.div
        className="drawings-band"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="drawings-copy">
          <p className="section-eyebrow">{eyebrow}</p>
          <h2 className="drawings-title">
            {title} <em>{titleEm}</em>
          </h2>
          <p className="drawings-text">
            {text}
          </p>
        </div>

        <a href="#cta" className="btn-ghost drawings-cta">
          {cta} <span className="btn-ghost-arrow">→</span>
        </a>
      </motion.div>
    </section>
  )
}
