'use client'
import { motion } from 'framer-motion'
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

export function Testimonials({ data }: { data: Testimonial[] }) {
  // Duplicate for seamless infinite loop
  const doubled = [...data, ...data]

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
          Client Stories
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.08 }}
        >
          What Our Clients <em>Say</em>
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
    </section>
  )
}
