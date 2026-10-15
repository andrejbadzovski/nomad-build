'use client'
import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { urlFor } from '@/lib/cms/image'
import type { Project } from '@/lib/constants'

type Media = { type: 'image' | 'video'; src: string }

// Gallery items are `{ discriminant: 'image' | 'video', value: path }` from Keystatic.
// Plain strings (the older image-only format) are still accepted as images.
function getMedia(project: Project, fallback: string): Media[] {
  const media: Media[] = [{ type: 'image', src: project.image ? urlFor(project.image).url() : fallback }]
  project.gallery?.forEach((g: any) => {
    if (typeof g === 'string') {
      if (g) media.push({ type: 'image', src: g })
    } else if (g?.value) {
      media.push({ type: g.discriminant === 'video' ? 'video' : 'image', src: g.value })
    }
  })
  return media
}

export function ProjectLightbox({ project, fallback, onClose }: { project: Project; fallback: string; onClose: () => void }) {
  const media = getMedia(project, fallback)
  const [idx, setIdx] = useState(0)
  const [mounted, setMounted] = useState(false)

  const prev = useCallback(() => setIdx(i => (i - 1 + media.length) % media.length), [media.length])
  const next = useCallback(() => setIdx(i => (i + 1) % media.length), [media.length])

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

  const current = media[idx]

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
        <button className="lightbox-close" onClick={onClose} aria-label="Close">✕</button>

        <div className={`lightbox-image-wrap${current.type === 'video' ? ' lightbox-image-wrap--video' : ''}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              className="lightbox-image"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {current.type === 'video' ? (
                <video
                  src={current.src}
                  controls
                  autoPlay
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000' }}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={current.src} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              )}
            </motion.div>
          </AnimatePresence>

          {media.length > 1 && (
            <>
              <button className="lightbox-arrow lightbox-arrow--left" onClick={prev} aria-label="Previous">←</button>
              <button className="lightbox-arrow lightbox-arrow--right" onClick={next} aria-label="Next">→</button>
              <div className="lightbox-dots">
                {media.map((m, i) => (
                  <button
                    key={i}
                    className={`lightbox-dot${i === idx ? ' active' : ''}`}
                    onClick={() => setIdx(i)}
                    aria-label={`${m.type === 'video' ? 'Video' : 'Image'} ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="lightbox-info">
          <div>
            <p className="lightbox-location">{project.location}</p>
            <h2 className="lightbox-title">{project.name}</h2>
            <p className="lightbox-tag">{project.category} · {project.year}</p>
          </div>
          {media.length > 1 && <p className="lightbox-counter">{idx + 1} / {media.length}</p>}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  )
}
