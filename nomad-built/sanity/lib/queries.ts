import { groq } from 'next-sanity'
import { client } from './client'

export async function getSiteSettings() {
  if (!client) return null
  return client.fetch(groq`*[_type == "siteSettings"][0]`)
}

export async function getFeaturedProjects() {
  if (!client) return null
  return client.fetch(
    groq`*[_type == "project"] | order(order asc) [0...5] {
      _id, name, location, category, year, image, gallery, order
    }`
  )
}

export async function getAllProjects() {
  if (!client) return null
  return client.fetch(
    groq`*[_type == "project"] | order(order asc) {
      _id, name, location, category, year, image, gallery, order
    }`
  )
}

export async function getServices() {
  if (!client) return null
  return client.fetch(
    groq`*[_type == "service"] | order(order asc) {
      _id, number, name, description
    }`
  )
}

export async function getTestimonials() {
  if (!client) return null
  return client.fetch(
    groq`*[_type == "testimonial"] | order(order asc) {
      _id, quote, author, location, rating
    }`
  )
}

export async function getTeam() {
  if (!client) return null
  return client.fetch(
    groq`*[_type == "teamMember"] | order(order asc) {
      _id, name, role, bio, photo
    }`
  )
}
