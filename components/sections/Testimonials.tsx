'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Testimonial } from '@/lib/constants'

function Stars({ count }: { count: number }) {
  return (
    <div className="testimonial-stars">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="star">★</span>
      ))}
    </div>
  )
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="testimonial-card">
      <Stars count={t.rating} />
      <p className="testimonial-text">"{t.quote}"</p>
      <div className="testimonial-author">{t.author}</div>
      <div className="testimonial-location">{t.location}</div>
    </div>
  )
}

export function Testimonials({ data, settings }: { data: Testimonial[]; settings?: any }) {
  // Duplicate for seamless infinite loop
  const doubled = [...data, ...data]

  const eyebrow = settings?.testimonialsEyebrow || 'Client Stories'
  const title   = settings?.testimonialsTitle || 'What Our Clients'
  const titleEm = settings?.testimonialsTitleEm || 'Say'
  const viewMore = settings?.testimonialsViewMore || 'View More'
  const viewLess = settings?.testimonialsViewLess || 'Show Less'

  const [expanded, setExpanded] = useState(false)

  return (
    <section id="testimonials">
      <div className="testimonials-header">
        <motion.p
          className="section-eyebrow"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {eyebrow}
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.08 }}
        >
          {title} <em>{titleEm}</em>
        </motion.h2>
      </div>

      <motion.div
        className="testimonials-track-wrap"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.15 }}
      >
        <div className="testimonials-track">
          {doubled.map((t, i) => (
            <TestimonialCard key={`${t._id}-${i}`} t={t} />
          ))}
        </div>
      </motion.div>

      {/* Full list of every testimonial, revealed under the scrolling strip */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            className="testimonials-grid"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {data.map((t) => (
              <TestimonialCard key={t._id} t={t} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="section-more">
        <button className="btn-ghost" onClick={() => setExpanded(e => !e)} aria-expanded={expanded}>
          {expanded ? viewLess : viewMore}{' '}
          <span className="btn-ghost-arrow" style={{ transform: expanded ? 'rotate(-90deg)' : 'rotate(90deg)' }}>→</span>
        </button>
      </div>
    </section>
  )
}
