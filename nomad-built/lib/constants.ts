// Static fallback data — used when Sanity is not yet configured
// or when fields haven't been filled in the CMS yet.

export const defaultData = {
  siteSettings: {
    heroTitle: 'Homes Built for',
    heroTitleEm: 'Extraordinary',
    heroTitle3: 'Living',
    heroEyebrow: 'Geelong · Surfcoast · Melbourne',
    heroSubtitle:
      "Specialising in new homes, townhouses and extensions across Geelong, the Surfcoast and Melbourne's Western Suburbs — built with precision and pride.",
    aboutTitle: 'More Than Builders',
    aboutTitleEm: "We're Creators",
    aboutParagraph1:
      "At Talcon Developments, we are more than builders; we are creators of bespoke spaces built to stand the test of time. Our team specialises in new homes, townhouses and extensions across Geelong, the Surfcoast and Melbourne's Western Suburbs.",
    aboutParagraph2:
      'Every project begins with a collaborative design journey and is guided seamlessly through construction with meticulous attention to detail. Our full-service approach ensures every stage — from concept to completion — is managed with expertise, transparency, and care.',
    aboutQuote: 'Crafting homes that tell your story.',
    ctaEmail: 'info@talcondevelopments.com.au',
    ctaPhone: '0420 970 991',
    instagramUrl: 'https://instagram.com/talcondevelopments',
    facebookUrl: '#',
    linkedinUrl: '#',
  },
  projects: [
    { _id: '1', name: 'Newtown Family Home', location: 'Newtown, Geelong', category: 'New Build', year: 2024, image: null, order: 1 },
    { _id: '2', name: 'Torquay Coastal Retreat', location: 'Torquay, Surfcoast', category: 'New Build', year: 2024, image: null, order: 2 },
    { _id: '3', name: 'Werribee Townhouses', location: 'Werribee, Melbourne West', category: 'Townhouse', year: 2023, image: null, order: 3 },
    { _id: '4', name: 'Belmont Extension', location: 'Belmont, Geelong', category: 'Extension', year: 2023, image: null, order: 4 },
    { _id: '5', name: 'Anglesea Beach House', location: 'Anglesea, Surfcoast', category: 'New Build', year: 2022, image: null, order: 5 },
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
    { _id: '1', quote: 'From day one contact to completion, it was a pleasure. Our home went from bare land to exactly what we dreamed of. The team were professional every step of the way.', author: 'M. & R. Fletcher', location: 'Geelong, VIC', rating: 5, order: 1 },
    { _id: '2', quote: 'Talcon completed a high-quality build for us ahead of time and on budget. All trades were professional, tidy and the workmanship was top class.', author: 'T. Whitmore', location: 'Torquay, VIC', rating: 5, order: 2 },
    { _id: '3', quote: 'The team built our extension seamlessly. Every subcontractor was professional, punctual, and genuinely cared about the quality of their work.', author: 'S. & J. Harrington', location: 'Werribee, VIC', rating: 5, order: 3 },
  ],
  team: [
    { _id: '1', name: 'Director', role: 'Director & Founder', bio: '', photo: null, order: 1 },
    { _id: '2', name: 'Site Manager', role: 'Head of Construction', bio: '', photo: null, order: 2 },
    { _id: '3', name: 'Project Manager', role: 'Project Manager', bio: '', photo: null, order: 3 },
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
