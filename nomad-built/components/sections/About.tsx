'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { urlFor } from '@/sanity/lib/image'
import type { SiteSettings } from '@/lib/constants'
import { FALLBACK_IMAGES } from '@/lib/constants'

export function About({ data }: { data: SiteSettings & any }) {
  const aboutImage   = data?.aboutImage
  const quote        = data?.aboutQuote || 'Crafting homes that tell your story.'
  const title        = data?.aboutTitle || 'More Than Builders'
  const titleEm      = data?.aboutTitleEm || "We're Creators"
  const paragraph1   = data?.aboutParagraph1 || 'At Nomad Built, we are more than design and build contractors; we are creators of bespoke spaces that embody timeless style, precision craftsmanship, and modern functionality. Since 2020, our team has delivered luxury new builds and full-scale renovations across Sydney and the Sunshine Coast.'
  const paragraph2   = data?.aboutParagraph2 || 'Every project begins with a collaborative design journey and is guided seamlessly through construction with meticulous attention to detail. Our full-service approach ensures every stage — from concept to completion — is managed with expertise, transparency, and care.'

  return (
    <section id="about">
      {/* Image stack */}
      <div className="about-image-stack">
        {/* Main image — clip-path reveal left→right */}
        <motion.div
          className="about-img-main"
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {aboutImage ? (
            <Image
              src={urlFor(aboutImage).width(800).url()}
              alt="About Nomad Built"
              fill
              sizes="40vw"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={FALLBACK_IMAGES.about} alt="About Nomad Built" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
          )}
        </motion.div>

        {/* Accent quote box — slides up */}
        <motion.div
          className="about-img-accent"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <blockquote>{quote}</blockquote>
        </motion.div>

        <div className="about-year">2020</div>
      </div>

      {/* Text content */}
      <div>
        <motion.p
          className="section-eyebrow"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Who We Are
        </motion.p>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        >
          {title} — <em>{titleEm}</em>
        </motion.h2>

        {[paragraph1, paragraph2].map((p, i) => (
          <motion.p
            key={i}
            className="section-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {p}
          </motion.p>
        ))}

        <motion.a
          href="#process"
          className="btn-ghost"
          style={{ marginTop: 20 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          How We Work <span className="btn-ghost-arrow">→</span>
        </motion.a>
      </div>
    </section>
  )
}
