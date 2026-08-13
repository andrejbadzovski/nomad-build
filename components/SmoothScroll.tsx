'use client'
import { useEffect } from 'react'
import { ReactLenis } from 'lenis/react'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
