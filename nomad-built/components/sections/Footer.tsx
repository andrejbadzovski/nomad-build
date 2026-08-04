'use client'
import { motion } from 'framer-motion'
import type { SiteSettings } from '@/lib/constants'

export function Footer({ data }: { data: SiteSettings & any }) {
  const email       = data?.ctaEmail    || 'info@talcondevelopments.com.au'
  const phone       = data?.ctaPhone    || '0420 970 991'
  const phone2      = data?.ctaPhone2   || ''
  const instagram   = data?.instagramUrl || 'https://www.instagram.com/talcondevelopments/'
  const footerAbout = data?.footerAbout  || 'New homes, townhouses and extensions across Geelong, the Surfcoast and Melbourne\'s Western Suburbs. Built with precision and pride.'
  const licenceVIC  = data?.licenceNSW   || 'CDB-U 72278'

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="footer-grid">
        <div className="footer-brand">
          <span className="footer-logo">Talcon <span>Developments</span></span>
          <p className="footer-about">{footerAbout}</p>
        </div>

        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            {['New Builds', 'Renovations', 'Extensions', 'Design & Build', 'Luxury Fit-Outs'].map(s => (
              <li key={s}><a href="#services">{s}</a></li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#team">Our Team</a></li>
            <li><a href="#portfolio">Projects</a></li>
            <li><a href="#testimonials">Reviews</a></li>
            <li><a href="#process">Our Process</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li><a href={`mailto:${email}`}>{email}</a></li>
            <li><a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a></li>
            {phone2 && <li><a href={`tel:${phone2.replace(/\s/g, '')}`}>{phone2}</a></li>}
            <li><a href="#">Geelong, VIC</a></li>
            <li><a href="#">Melbourne Western Suburbs, VIC</a></li>
          </ul>
        </div>
      </div>

      {/* Accreditations / licence — monochrome, matching the current site */}
      <div className="footer-credentials">
        <p className="footer-licence">
          License number: <strong>{licenceVIC}</strong>
        </p>
        <div className="footer-badges">
          {/* Drop the logo files into public/images/badges/ with these exact names.
              Missing files are hidden automatically. */}
          <img
            className="footer-badge-img"
            src="/images/badges/registered-building-practitioner.webp"
            alt="Registered Building Practitioner — Victorian Building Authority"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          />
          <img
            className="footer-badge-img"
            src="/images/badges/hia-member.webp"
            alt="HIA Member"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          />
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">
          © {new Date().getFullYear()} Talcon Developments Pty Ltd. All rights reserved.
        </p>
        <div className="footer-socials">
          <a href={instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
    </motion.footer>
  )
}
