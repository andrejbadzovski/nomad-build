import { getSiteSettings, getFeaturedProjects, getServices, getTestimonials, getTeam } from '@/sanity/lib/queries'
import { defaultData } from '@/lib/constants'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/sections/Hero'
import { Stats } from '@/components/sections/Stats'
import { About } from '@/components/sections/About'
import { Services } from '@/components/sections/Services'
import { Process } from '@/components/sections/Process'
import { Portfolio } from '@/components/sections/Portfolio'
import { Testimonials } from '@/components/sections/Testimonials'
import { Team } from '@/components/sections/Team'
import { CTA } from '@/components/sections/CTA'
import { Footer } from '@/components/sections/Footer'
import { CustomCursor } from '@/components/CustomCursor'
import { SmoothScroll } from '@/components/SmoothScroll'
import { ScrollProgress } from '@/components/ScrollProgress'
import { Grain } from '@/components/Grain'

// Re-fetch from Sanity every 30 seconds so CMS changes appear without redeploying
export const revalidate = 30

export default async function Home() {
  let siteSettings = defaultData.siteSettings as any
  let projects = defaultData.projects as any[]
  let services = defaultData.services as any[]
  let testimonials = defaultData.testimonials as any[]
  let team = defaultData.team as any[]

  try {
    const [s, p, sv, t, tm] = await Promise.all([
      getSiteSettings(),
      getFeaturedProjects(),
      getServices(),
      getTestimonials(),
      getTeam(),
    ])
    if (s)  siteSettings  = s
    if (p?.length)  projects     = p
    if (sv?.length) services     = sv
    if (t?.length)  testimonials = t
    if (tm?.length) team         = tm
  } catch {
    // Sanity not configured — static fallback data is already set above
  }

  return (
    <SmoothScroll>
      <Grain />
      <CustomCursor />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero data={siteSettings} />
        <Stats />
        <About data={siteSettings} />
        <Services data={services} />
        <Process />
        <Portfolio data={projects} />
        <Testimonials data={testimonials} />
        <Team data={team} />
        <CTA data={siteSettings} />
        <Footer data={siteSettings} />
      </main>
    </SmoothScroll>
  )
}
