import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nomad Built — Bespoke Homes & Renovations',
  description:
    'Crafting bespoke architectural homes and full-scale renovations across Sydney and the Sunshine Coast. Delivering excellence since 2020.',
  openGraph: {
    title: 'Nomad Built — Bespoke Homes & Renovations',
    description:
      'Crafting bespoke architectural homes and full-scale renovations across Sydney and the Sunshine Coast.',
    type: 'website',
    url: 'https://nomadbuilt.com.au',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>{children}</body>
    </html>
  )
}
