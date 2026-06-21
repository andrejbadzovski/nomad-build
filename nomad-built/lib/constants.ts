// Static fallback data — used when Sanity is not yet configured
// or when fields haven't been filled in the CMS yet.

export const defaultData = {
  siteSettings: {
    heroTitle: 'Spaces Built for Extraordinary Living',
    heroSubtitle:
      'We craft bespoke architectural homes and full-scale renovations that reflect your unique vision — guided by precision, elevated by design.',
    aboutTitle: "More Than Builders — We're Creators",
    aboutParagraph1:
      'At Nomad Built, we are more than design and build contractors; we are creators of bespoke spaces that embody timeless style, precision craftsmanship, and modern functionality. Since 2020, our team has delivered luxury new builds and full-scale renovations across Sydney and the Sunshine Coast.',
    aboutParagraph2:
      'Every project begins with a collaborative design journey and is guided seamlessly through construction with meticulous attention to detail. Our full-service approach ensures every stage — from concept to completion — is managed with expertise, transparency, and care.',
    aboutQuote: 'Crafting homes that tell your story.',
    ctaEmail: 'hello@nomadbuilt.com.au',
    ctaPhone: '+61483912475',
    instagramUrl: 'https://www.instagram.com/nomadbuiltau/',
    facebookUrl: '#',
    linkedinUrl: 'https://au.linkedin.com/company/nomadbuiltau',
  },
  projects: [
    { _id: '1', name: 'The Harbour Residence', location: 'Mosman, Sydney', category: 'New Build', year: 2024, image: null, order: 1 },
    { _id: '2', name: 'Beachside Retreat', location: 'Coolum Beach, QLD', category: 'Full Renovation', year: 2024, image: null, order: 2 },
    { _id: '3', name: 'Heritage Terrace', location: 'Paddington, Sydney', category: 'Extension', year: 2023, image: null, order: 3 },
    { _id: '4', name: 'Hinterland Sanctuary', location: 'Sunshine Coast', category: 'New Build', year: 2023, image: null, order: 4 },
    { _id: '5', name: 'The Loft Studio', location: 'Balmain, Sydney', category: 'Fit-Out', year: 2023, image: null, order: 5 },
  ],
  services: [
    { _id: '1', number: '01', name: 'New Home Builds', description: 'Your vision brought to life from the ground up. We design and construct bespoke architectural homes tailored precisely to your lifestyle and aspirations.', order: 1 },
    { _id: '2', number: '02', name: 'Full Renovations', description: "Transform your existing home into the space you've always imagined. Complete interior overhauls, extensions, and luxury upgrades — delivered on time.", order: 2 },
    { _id: '3', number: '03', name: 'Design & Build', description: 'A seamless end-to-end experience. Our design and construction teams collaborate closely, ensuring your project flows without gaps, friction, or compromise.', order: 3 },
    { _id: '4', number: '04', name: 'Extensions', description: 'Add space, light, and value. Our structural extensions blend seamlessly with your existing home while expanding how you live and feel within it.', order: 4 },
    { _id: '5', number: '05', name: 'Kitchen & Bath', description: 'Premium kitchen and bathroom transformations. From custom joinery to bespoke fixtures, every element is crafted to the highest specification.', order: 5 },
    { _id: '6', number: '06', name: 'Luxury Fit-Outs', description: 'Interior fit-outs that combine beauty and function. Premium materials, considered finishes, and craftsmanship that stands the test of time.', order: 6 },
  ],
  testimonials: [
    { _id: '1', quote: 'From day one contact to completion, it was a pleasure. Our unit went from drab to Wow factor. Our guests all say WOW when they walk in.', author: 'M. & R. Fletcher', location: 'Coolum Beach, QLD', rating: 5, order: 1 },
    { _id: '2', quote: 'Nomad completed a high-end renovation for our unit ahead of time and budget. All builders were very professional and the work was top class.', author: 'T. Whitmore', location: 'Sydney, NSW', rating: 5, order: 2 },
    { _id: '3', quote: 'Jack, Jake and the team did a renovation of our kitchen, bathroom, roof and driveway. Every subcontractor was professional, punctual, and genuinely cared.', author: 'S. & J. Harrington', location: 'Sunshine Coast, QLD', rating: 5, order: 3 },
  ],
  team: [
    { _id: '1', name: 'Jake Carter', role: 'Director & Co-Founder', bio: '', photo: null, order: 1 },
    { _id: '2', name: 'Jack Scoles', role: 'Director & Co-Founder', bio: '', photo: null, order: 2 },
    { _id: '3', name: 'James Behringer', role: 'Head of Construction', bio: '', photo: null, order: 3 },
  ],
}

export type SiteSettings = typeof defaultData.siteSettings
export type Project = (typeof defaultData.projects)[number] & { image: any }
export type Service = (typeof defaultData.services)[number]
export type Testimonial = (typeof defaultData.testimonials)[number]
export type TeamMember = (typeof defaultData.team)[number] & { photo: any }

// Real images from the client's website — used as fallbacks until Sanity is populated
export const FALLBACK_IMAGES = {
  hero:  'https://talcondevelopments.com.au/wp-content/uploads/2022/06/High-7487-copy-scaled.jpg',
  about: 'https://talcondevelopments.com.au/wp-content/uploads/2022/06/High-7475-copy-1-scaled.jpg',
  cta:   'https://talcondevelopments.com.au/wp-content/uploads/2022/06/High-7465.jpg',
  projects: [
    'https://talcondevelopments.com.au/wp-content/uploads/2022/06/High-7486-copy-scaled.jpg',
    'https://talcondevelopments.com.au/wp-content/uploads/2022/06/High-7460.jpg',
    'https://talcondevelopments.com.au/wp-content/uploads/2022/06/High-3.jpg',
    'https://talcondevelopments.com.au/wp-content/uploads/2022/06/High-7469.jpg',
    'https://talcondevelopments.com.au/wp-content/uploads/2022/06/High-7467.jpg',
  ],
}
