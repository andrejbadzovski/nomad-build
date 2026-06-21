'use client'
import { motion } from 'framer-motion'
import type { SiteSettings } from '@/lib/constants'

export function Footer({ data }: { data: SiteSettings & any }) {
  const email       = data?.ctaEmail    || 'hello@nomadbuilt.com.au'
  const phone       = data?.ctaPhone    || '0489 073 885'
  const phone2      = data?.ctaPhone2   || '0483 912 475'
  const instagram   = data?.instagramUrl || 'https://www.instagram.com/nomadbuiltau/'
  const facebook    = data?.facebookUrl  || '#'
  const linkedin    = data?.linkedinUrl  || 'https://au.linkedin.com/company/nomadbuiltau'
  const houzz       = data?.houzzUrl     || '#'
  const footerAbout = data?.footerAbout  || 'Bespoke architectural builds and luxury renovations across Sydney and the Sunshine Coast. Delivering excellence since 2020.'
  const licenceNSW  = data?.licenceNSW   || '361367C'
  const licenceQLD  = data?.licenceQLD   || '15157359'

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="footer-grid">
        <div className="footer-brand">
          <span className="footer-logo">Nomad <span>Built</span></span>
          <p className="footer-about">{footerAbout}</p>
          <p className="footer-licence">
            NSW Fair Trading Licence #{licenceNSW}<br />
            QBCC No. #{licenceQLD}<br />
            Building Practitioner Licence #BUP0001091
          </p>
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
            <li><a href={`tel:${phone.replace(/\s/g, '')}`}>Sydney: {phone}</a></li>
            <li><a href={`tel:${phone2.replace(/\s/g, '')}`}>Sunshine Coast: {phone2}</a></li>
            <li><a href="#">Sydney, NSW</a></li>
            <li><a href="#">Sunshine Coast, QLD</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">
          © {new Date().getFullYear()} Nomad Built Pty Ltd. All rights reserved. Built with precision.
        </p>
        <div className="footer-socials">
          <a href={instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={facebook}  target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href={houzz}     target="_blank" rel="noopener noreferrer">Houzz</a>
          <a href={linkedin}  target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </motion.footer>
  )
}
