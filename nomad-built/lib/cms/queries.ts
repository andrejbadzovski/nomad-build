import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '@/keystatic.config'

// Reads content from the local Keystatic files (content/*). These helpers keep the
// exact same names/return shapes the old Sanity query layer had, so the pages and
// section components didn't need to change. Each returns plain objects with `_id`
// (the entry slug) plus the schema fields; ordering is by the `order` field.
const reader = createReader(process.cwd(), keystaticConfig)

function byOrder(
  a: { order?: number | null },
  b: { order?: number | null }
): number {
  const ao = a.order ?? Number.MAX_SAFE_INTEGER
  const bo = b.order ?? Number.MAX_SAFE_INTEGER
  return ao - bo
}

export async function getSiteSettings() {
  return reader.singletons.siteSettings.read()
}

async function readProjects() {
  const all = await reader.collections.projects.all()
  return all.map(({ slug, entry }) => ({ _id: slug, ...entry })).sort(byOrder)
}

export async function getFeaturedProjects() {
  const projects = await readProjects()
  return projects.slice(0, 5)
}

export async function getAllProjects() {
  return readProjects()
}

export async function getServices() {
  const all = await reader.collections.services.all()
  return all.map(({ slug, entry }) => ({ _id: slug, ...entry })).sort(byOrder)
}

export async function getTestimonials() {
  const all = await reader.collections.testimonials.all()
  return all.map(({ slug, entry }) => ({ _id: slug, ...entry })).sort(byOrder)
}

export async function getTeam() {
  const all = await reader.collections.team.all()
  return all.map(({ slug, entry }) => ({ _id: slug, ...entry })).sort(byOrder)
}
