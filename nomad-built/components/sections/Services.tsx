'use client'
import { motion } from 'framer-motion'
import type { Service } from '@/lib/constants'

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
}

export function Services({ data }: { data: Service[] }) {
  return (
    <section id="services">
      <div className="services-header">
        <div>
          <motion.p
            className="section-eyebrow"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            What We Do
          </motion.p>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.05 }}
          >
            Our <em>Expertise</em>
          </motion.h2>
        </div>
        <motion.p
          className="section-text"
          style={{ alignSelf: 'end' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          From bespoke new builds to full home transformations, every service is delivered with the same unwavering commitment to quality.
        </motion.p>
      </div>

      <div className="services-grid">
        {data.map((service, i) => (
          <motion.div
            key={service._id}
            className="service-card"
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <div className="service-number">{service.number}</div>
            <h3 className="service-name">{service.name}</h3>
            <p className="service-text">{service.description}</p>
            <a href="#cta" className="service-link">Learn More</a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
