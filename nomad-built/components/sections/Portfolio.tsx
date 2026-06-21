'use client'
import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { urlFor } from '@/sanity/lib/image'
import type { Project } from '@/lib/constants'
import { FALLBACK_IMAGES } from '@/lib/constants'

function getImages(project: Project, fallback: string): string[] {
  const imgs: string[] = []
  if (project.image) imgs.push(urlFor(project.image).width(1400).height(900).url())
  else imgs.push(fallback)
  if (project.gallery?.length) {
    project.gallery.forEach((g: any) => imgs.push(urlFor(g).width(1400).height(900).url()))
  }
  return imgs
}

function Lightbox({ project, fallback, onClose }: { project: Project; fallback: string; onClose: () => void }) {
  const images = getImages(project, fallback)
  const [idx, setIdx] = useState(0)
  const [mounted, setMounted] = useState(false)

  const prev = useCallback(() => setIdx(i => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setIdx(i => (i + 1) % images.length), [images.length])

  useEffect(() => {
    setMounted(true)
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next])

  if (!mounted) return null

  return createPortal(
    <motion.div
      className="lightbox-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="lightbox-panel"
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 24 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button className="lightbox-close" onClick={onClose} aria-label="Close">✕</button>

        {/* Image */}
        <div className="lightbox-image-wrap">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              className="lightbox-image"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={images[idx]} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>
          </AnimatePresence>

          {images.length > 1 && (
            <>
              <button className="lightbox-arrow lightbox-arrow--left" onClick={prev} aria-label="Previous">←</button>
              <button className="lightbox-arrow lightbox-arrow--right" onClick={next} aria-label="Next">→</button>
            </>
          )}

          {images.length > 1 && (
            <div className="lightbox-dots">
              {images.map((_, i) => (
                <button key={i} className={`lightbox-dot${i === idx ? ' active' : ''}`} onClick={() => setIdx(i)} aria-label={`Image ${i + 1}`} />
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="lightbox-info">
          <div>
            <p className="lightbox-location">{project.location}</p>
            <h2 className="lightbox-title">{project.name}</h2>
            <p className="lightbox-tag">{project.category} · {project.year}</p>
          </div>
          {images.length > 1 && (
            <p className="lightbox-counter">{idx + 1} / {images.length}</p>
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  )
}

export function Portfolio({ data }: { data: Project[] }) {
  const [active, setActive] = useState<{ project: Project; fallback: string } | null>(null)

  return (
    <section id="portfolio">
      <div className="portfolio-header">
        <div>
          <motion.p className="section-eyebrow" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            Our Work
          </motion.p>
          <motion.h2 className="section-title" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.08 }}>
            Featured <em>Projects</em>
          </motion.h2>
        </div>
        <motion.a href="#" className="btn-ghost" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
          View All Projects <span className="btn-ghost-arrow">→</span>
        </motion.a>
      </div>

      <div className="portfolio-grid">
        {data.map((project, i) => {
          const fallback = FALLBACK_IMAGES.projects[i % FALLBACK_IMAGES.projects.length]
          return (
            <motion.div
              key={project._id}
              className="project-card"
              onClick={() => setActive({ project, fallback })}
              initial={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
              whileInView={{ clipPath: 'inset(0% 0 0 0)', opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                clipPath: { duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
                opacity:  { duration: 0.4, delay: i * 0.1 },
              }}
            >
              <div className="project-bg">
                {project.image ? (
                  <Image src={urlFor(project.image).width(900).height(500).url()} alt={project.name} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={fallback} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
              </div>
              <div className="project-overlay" />
              <div className="project-view">View Project</div>
              <motion.div className="project-info" initial={{ y: 16, opacity: 0.8 }} whileHover={{ y: 0, opacity: 1 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
                <p className="project-location">{project.location}</p>
                <h3 className="project-name">{project.name}</h3>
                <p className="project-tag">{project.category} · {project.year}</p>
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      <AnimatePresence>
        {active && <Lightbox project={active.project} fallback={active.fallback} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  )
}
