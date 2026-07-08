import type { Metadata } from 'next'
import { Montserrat, Inter } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
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
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
