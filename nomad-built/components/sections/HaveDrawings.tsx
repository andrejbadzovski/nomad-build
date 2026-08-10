'use client'
import { motion } from 'framer-motion'

export function HaveDrawings() {
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
          <p className="section-eyebrow">Already Have Plans?</p>
          <h2 className="drawings-title">
            Already have drawings? <em>We can build that too.</em>
          </h2>
          <p className="drawings-text">
            Bring your architect&apos;s plans or council-approved drawings — our team will take
            them from paper to a finished build with the same precision and care.
          </p>
        </div>

        <a href="#cta" className="btn-ghost drawings-cta">
          Start Your Build <span className="btn-ghost-arrow">→</span>
        </a>
      </motion.div>
    </section>
  )
}
