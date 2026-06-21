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
  title: 'Talcon Developments — New Homes, Townhouses & Extensions',
  description:
    'Specialising in new homes, townhouses and extensions across Geelong, the Surfcoast and Melbourne Western Suburbs. Built with precision and pride.',
  openGraph: {
    title: 'Talcon Developments — New Homes, Townhouses & Extensions',
    description:
      'Specialising in new homes, townhouses and extensions across Geelong, the Surfcoast and Melbourne Western Suburbs.',
    type: 'website',
    url: 'https://talcondevelopments.com.au',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>{children}</body>
    </html>
  )
}
