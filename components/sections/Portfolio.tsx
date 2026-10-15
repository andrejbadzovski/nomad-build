'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { urlFor } from '@/lib/cms/image'
import { ProjectLightbox } from '@/components/ProjectLightbox'
import type { Project } from '@/lib/constants'
import { FALLBACK_IMAGES } from '@/lib/constants'

export function Portfolio({ data, settings }: { data: Project[]; settings?: any }) {
  const [active, setActive] = useState<{ project: Project; fallback: string } | null>(null)

  const eyebrow  = settings?.portfolioEyebrow || 'Our Work'
  const title    = settings?.portfolioTitle || 'Featured'
  const titleEm  = settings?.portfolioTitleEm || 'Projects'
  const viewAll  = settings?.portfolioViewAll || 'View All Projects'
  const cardView = settings?.portfolioCardView || 'View Project'

  return (
    <section id="portfolio">
      <div className="portfolio-header">
        <div>
          <motion.p className="section-eyebrow" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            {eyebrow}
          </motion.p>
          <motion.h2 className="section-title" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.08 }}>
            {title} <em>{titleEm}</em>
          </motion.h2>
        </div>
        <motion.a href="/projects" className="btn-ghost" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
          {viewAll} <span className="btn-ghost-arrow">→</span>
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
              <div className="project-view">{cardView}</div>
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
        {active && <ProjectLightbox project={active.project} fallback={active.fallback} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  )
}
