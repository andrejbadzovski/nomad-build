import { getAllProjects } from '@/sanity/lib/queries'
import { defaultData } from '@/lib/constants'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/sections/Footer'
import { SmoothScroll } from '@/components/SmoothScroll'
import { CustomCursor } from '@/components/CustomCursor'
import { ScrollProgress } from '@/components/ScrollProgress'
import { Grain } from '@/components/Grain'
import { ProjectsGrid } from '@/components/sections/ProjectsGrid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Projects — Talcon Developments',
  description: 'Browse all our completed new homes, townhouses and extensions across Geelong, the Surfcoast and Melbourne Western Suburbs.',
}

export const revalidate = 30

export default async function ProjectsPage() {
  let projects = defaultData.projects as any[]
  let siteSettings = defaultData.siteSettings as any

  try {
    const data = await getAllProjects()
    if (data?.length) projects = data
  } catch {
    // fall back to default data
  }

  return (
    <SmoothScroll>
      <Grain />
      <CustomCursor />
      <ScrollProgress />
      <Nav />
      <main>
        <ProjectsGrid data={projects} />
        <Footer data={siteSettings} />
      </main>
    </SmoothScroll>
  )
}
