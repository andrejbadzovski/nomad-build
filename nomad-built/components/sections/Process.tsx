'use client'
import { motion } from 'framer-motion'

const steps = [
  {
    num: 'Step 01', name: 'Discovery Call',
    desc: 'We immerse ourselves in your vision — exploring your site, style, and lifestyle needs through an in-depth conversation and on-site assessment.',
  },
  {
    num: 'Step 02', name: 'Bespoke Design',
    desc: 'Your ideas are translated into detailed architectural plans and 3D visualisations. We refine every element until the design is perfectly aligned with your vision.',
  },
  {
    num: 'Step 03', name: 'Expert Construction',
    desc: "Our skilled team brings your design to life with meticulous attention to detail. You're kept informed at every stage with full transparency and accountability.",
  },
  {
    num: 'Step 04', name: 'Handover & Beyond',
    desc: "We deliver your finished home with pride, conduct a thorough walkthrough, and provide ongoing aftercare support — because our relationship doesn't end at handover.",
  },
]

export function Process() {
  return (
    <section id="process">
      <div className="process-header">
        <motion.p
          className="section-eyebrow"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          How It Works
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.08 }}
        >
          A Clear Path from <em>Vision to Reality</em>
        </motion.h2>
      </div>

      <div className="process-steps">
        {/* Animated connector line */}
        <div className="process-connector">
          <motion.div
            className="process-connector-fill"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          />
        </div>

        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            className="process-step"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: i * 0.15 + 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="step-dot"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 + 0.5, type: 'spring', stiffness: 300 }}
            />
            <div className="step-num">{step.num}</div>
            <h3 className="step-name">{step.name}</h3>
            <p className="step-desc">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
