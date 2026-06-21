'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { SiteSettings } from '@/lib/constants'
import { FALLBACK_IMAGES } from '@/lib/constants'

export function CTA({ data }: { data: SiteSettings & any }) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  const email = data?.ctaEmail || 'hello@nomadbuilt.com.au'
  const phone = data?.ctaPhone || '+61483912475'

  return (
    <section id="cta" ref={sectionRef}>
      {/* Parallax background image */}
      <motion.div className="cta-bg-image" style={{ y: bgY }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={FALLBACK_IMAGES.cta} alt="" aria-hidden="true" />
      </motion.div>
      <div className="cta-bg-overlay" />

      {/* Animated radial glow */}
      <motion.div
        className="cta-bg-glow"
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.h2
        className="cta-title"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        Ready to Build Your <em>Dream Home?</em>
      </motion.h2>

      <motion.p
        className="cta-text"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        Begin with a discovery call. We&apos;ll explore your vision, your site, and how we can bring your highest aspirations to life.
      </motion.p>

      <motion.div
        className="cta-actions"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <a href={`mailto:${email}`} className="btn-primary">Book a Discovery Call</a>
        <a href={`tel:${phone}`} className="btn-ghost">
          Call Us Today <span className="btn-ghost-arrow">→</span>
        </a>
      </motion.div>
    </section>
  )
}
