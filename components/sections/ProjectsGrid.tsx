'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { urlFor } from '@/lib/cms/image'
import { ProjectLightbox } from '@/components/ProjectLightbox'
import type { Project } from '@/lib/constants'
import { FALLBACK_IMAGES } from '@/lib/constants'

export function ProjectsGrid({ data, settings }: { data: Project[]; settings?: any }) {
  const [active, setActive] = useState<{ project: Project; fallback: string } | null>(null)

  const back     = settings?.projectsPageBack || 'Back to Home'
  const eyebrow  = settings?.projectsPageEyebrow || 'Our Work'
  const title    = settings?.projectsPageTitle || 'All'
  const titleEm  = settings?.projectsPageTitleEm || 'Projects'
  const intro    = settings?.projectsPageIntro || 'Browse our completed new homes, townhouses and extensions across Geelong, the Surfcoast and Melbourne.'
  const cardView = settings?.projectsPageCardView || 'View Gallery'

  return (
    <section className="all-projects-section">
      {/* Header */}
      <div className="all-projects-header">
        <motion.a href="/" className="btn-ghost" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <span style={{ transform: 'scaleX(-1)', display: 'inline-block' }}>→</span> {back}
        </motion.a>
        <div>
          <motion.p className="section-eyebrow" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            {eyebrow}
          </motion.p>
          <motion.h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08 }}>
            {title} <em>{titleEm}</em>
          </motion.h1>
          <motion.p className="section-text" style={{ maxWidth: 480 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
            {intro}
          </motion.p>
        </div>
      </div>

      {/* Grid */}
      <div className="all-projects-grid">
        {data.map((project, i) => {
          const fallback = FALLBACK_IMAGES.projects[i % FALLBACK_IMAGES.projects.length]
          return (
            <motion.div
              key={project._id}
              className="project-card"
              onClick={() => setActive({ project, fallback })}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="project-bg">
                {project.image ? (
                  <Image src={urlFor(project.image).width(900).height(600).url()} alt={project.name} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={fallback} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
              </div>
              <div className="project-overlay" />
              <div className="project-view">{cardView}</div>
              <motion.div className="project-info" initial={{ y: 16, opacity: 0.8 }} whileHover={{ y: 0, opacity: 1 }} transition={{ duration: 0.35 }}>
                <p className="project-location">{project.location}</p>
                <h3 className="project-name">{project.name}</h3>
                <p className="project-tag">{project.category} · {project.year}</p>
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      <AnimatePresence>
        {active && <ProjectLightbox project={active.project} fallback={active.fallback} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  )
}
