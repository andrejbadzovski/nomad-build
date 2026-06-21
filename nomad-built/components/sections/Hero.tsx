'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { SiteSettings } from '@/lib/constants'
import { FALLBACK_IMAGES } from '@/lib/constants'

const lineVariants = {
  hidden: { y: '110%' },
  visible: (i: number) => ({
    y: '0%',
    transition: { duration: 1, delay: 0.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
}

export function Hero({ data }: { data: SiteSettings & any }) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  // Parallax: hero image moves at 50% scroll speed
  const imageY = useTransform(scrollY, [0, 700], [0, 140])

  const heroTitle  = data?.heroTitle  || 'Spaces Built for'
  const heroTitleEm = data?.heroTitleEm || 'Extraordinary'
  const heroTitle3 = data?.heroTitle3 || 'Living'
  const eyebrow    = data?.heroEyebrow || 'Geelong · Surfcoast · Melbourne'
  const subtitle   = data?.heroSubtitle || 'We craft bespoke architectural homes and full-scale renovations that reflect your unique vision — guided by precision, elevated by design.'
  const heroImage  = data?.heroImage

  return (
    <section id="hero" ref={sectionRef}>
      <div className="hero-bg" />

      {/* Parallax image block */}
      <motion.div className="hero-image-block" style={{ y: imageY }}>
        {heroImage ? (
          <Image
            src={urlFor(heroImage).width(1400).url()}
            alt="Talcon Developments hero"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={FALLBACK_IMAGES.hero} alt="Talcon Developments hero" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        )}
      </motion.div>

      <div className="hero-content">
        {/* Eyebrow */}
        <motion.p
          className="hero-eyebrow"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {eyebrow}
        </motion.p>

        {/* Title — each line clips up from below baseline */}
        <h1 className="hero-title">
          {[heroTitle, <em key="em">{heroTitleEm}</em>, heroTitle3].map((line, i) => (
            <span key={i} className="hero-title-line">
              <motion.span
                style={{ display: 'block' }}
                custom={i}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Description */}
        <motion.p
          className="hero-desc"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          {subtitle}
        </motion.p>

        {/* Actions */}
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href="#portfolio" className="btn-primary">View Our Work</a>
          <a href="#about" className="btn-ghost">
            Our Story <span className="btn-ghost-arrow">→</span>
          </a>
        </motion.div>
      </div>

      {/* Floating award badge */}
      <motion.div
        className="hero-badge"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="hero-badge-circle">
          <div className="hero-badge-inner">
            <span className="hero-badge-num">5★</span>
            <span className="hero-badge-text">Rated<br />Excellence</span>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        <div className="scroll-line" />
        <span>Scroll</span>
      </motion.div>

      {/* Marquee ticker */}
      <motion.div
        className="hero-ticker"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <div className="ticker-track">
          {[...Array(2)].map((_, pass) =>
            ['New Home Builds', 'Townhouses', 'Architectural Extensions', 'Design & Build', 'Precision Craftsmanship', 'Geelong · Surfcoast · Melbourne'].map((label) => (
              <span key={`${pass}-${label}`} className="ticker-item">
                {label}
                <span className="ticker-dot" />
              </span>
            ))
          )}
        </div>
      </motion.div>
    </section>
  )
}
