'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = ['About', 'Services', 'Projects', 'Reviews', 'Team']

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setOpen(false)
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        className={`nav ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <a href="#" className="nav-logo" onClick={(e) => handleNavClick(e, '#hero')}>
          Talcon <span>Developments</span>
        </a>

        <ul className="nav-links">
          {links.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, `#${item.toLowerCase()}`)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#cta"
          className="nav-cta"
          onClick={(e) => handleNavClick(e, '#cta')}
        >
          Get in Touch
        </a>

        <button
          className="nav-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }} transition={{ duration: 0.25 }} />
          <motion.span animate={{ opacity: open ? 0 : 1 }} transition={{ duration: 0.2 }} />
          <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }} transition={{ duration: 0.25 }} />
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {links.map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="mobile-link"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => handleNavClick(e, `#${item.toLowerCase()}`)}
              >
                {item}
              </motion.a>
            ))}
            <motion.a
              href="#cta"
              className="btn-primary"
              style={{ marginTop: 16 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: links.length * 0.07 + 0.05 }}
              onClick={(e) => handleNavClick(e, '#cta')}
            >
              Book a Call
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
