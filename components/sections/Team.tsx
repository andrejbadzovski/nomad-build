'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { urlFor } from '@/lib/cms/image'
import type { TeamMember } from '@/lib/constants'

export function Team({ data, settings }: { data: TeamMember[]; settings?: any }) {
  const eyebrow = settings?.teamEyebrow || 'The People'
  const title   = settings?.teamTitle || 'Meet the'
  const titleEm = settings?.teamTitleEm || 'Team'
  const intro   = settings?.teamIntro || 'The Talcon team brings decades of combined expertise and a shared vision for building homes that endure — across Geelong, the Surfcoast and Melbourne.'
  const viewMore = settings?.teamViewMore || 'View More'
  const viewLess = settings?.teamViewLess || 'Show Less'

  // Homepage shows the first row; "View More" reveals the rest in place
  const INITIAL_COUNT = 3
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? data : data.slice(0, INITIAL_COUNT)
  const hasMore = data.length > INITIAL_COUNT

  return (
    <section id="team">
      <div className="team-header">
        <div>
          <motion.p
            className="section-eyebrow"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {eyebrow}
          </motion.p>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.08 }}
          >
            {title} <em>{titleEm}</em>
          </motion.h2>
        </div>
        <motion.p
          className="section-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {intro}
        </motion.p>
      </div>

      <div className="team-grid">
        {visible.map((member, i) => (
          <motion.div
            key={member._id}
            className="team-card"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: (i % INITIAL_COUNT) * 0.12 }}
          >
            {/* Portrait — reveals upward via clip-path */}
            <motion.div
              className="team-portrait"
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: (i % INITIAL_COUNT) * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              {member.photo ? (
                <Image
                  src={urlFor(member.photo).width(600).height(700).url()}
                  alt={member.name}
                  fill
                  sizes="33vw"
                  style={{ objectFit: 'cover', objectPosition: 'center top', position: 'relative', zIndex: 1 }}
                />
              ) : null}
              <div className="team-hover-overlay">
                <div className="team-overlay-name">{member.name}</div>
                <div className="team-overlay-role">{member.role}</div>
              </div>
            </motion.div>

            <motion.div
              className="team-info"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % INITIAL_COUNT) * 0.12 + 0.4 }}
            >
              <div className="team-name">{member.name}</div>
              <div className="team-role">{member.role}</div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {hasMore && (
        <div className="section-more">
          <button className="btn-ghost" onClick={() => setExpanded(e => !e)} aria-expanded={expanded}>
            {expanded ? viewLess : viewMore}{' '}
            <span className="btn-ghost-arrow" style={{ transform: expanded ? 'rotate(-90deg)' : 'rotate(90deg)' }}>→</span>
          </button>
        </div>
      )}
    </section>
  )
}
