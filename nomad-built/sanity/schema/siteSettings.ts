import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    // ── Hero ────────────────────────────────────────────────
    defineField({ name: 'heroEyebrow', title: 'Hero Eyebrow Text', type: 'string', initialValue: 'Sydney & Sunshine Coast · Est. 2020' }),
    defineField({ name: 'heroTitle', title: 'Hero Title (line 1)', type: 'string', initialValue: 'Spaces Built for' }),
    defineField({ name: 'heroTitleEm', title: 'Hero Title (italic word)', type: 'string', initialValue: 'Extraordinary' }),
    defineField({ name: 'heroTitle3', title: 'Hero Title (line 3)', type: 'string', initialValue: 'Living' }),
    defineField({ name: 'heroSubtitle', title: 'Hero Subtitle', type: 'text', rows: 3 }),
    defineField({ name: 'heroImage', title: 'Hero Background Image', type: 'image', options: { hotspot: true }, description: 'Large architectural photo shown on the right side of the hero.' }),

    // ── About ────────────────────────────────────────────────
    defineField({ name: 'aboutTitle', title: 'About Title', type: 'string' }),
    defineField({ name: 'aboutTitleEm', title: 'About Title (italic part)', type: 'string' }),
    defineField({ name: 'aboutParagraph1', title: 'About Paragraph 1', type: 'text', rows: 5 }),
    defineField({ name: 'aboutParagraph2', title: 'About Paragraph 2', type: 'text', rows: 5 }),
    defineField({ name: 'aboutImage', title: 'About Main Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'aboutQuote', title: 'About Pull Quote', type: 'string' }),

    // ── Contact / Social ─────────────────────────────────────
    defineField({ name: 'ctaEmail', title: 'Contact Email', type: 'string' }),
    defineField({ name: 'ctaPhone', title: 'Contact Phone (Sydney)', type: 'string' }),
    defineField({ name: 'ctaPhone2', title: 'Contact Phone (Sunshine Coast)', type: 'string' }),
    defineField({ name: 'address', title: 'Head Office Address', type: 'string' }),
    defineField({ name: 'instagramUrl', title: 'Instagram URL', type: 'url' }),
    defineField({ name: 'facebookUrl', title: 'Facebook URL', type: 'url' }),
    defineField({ name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url' }),
    defineField({ name: 'houzzUrl', title: 'Houzz URL', type: 'url' }),

    // ── Footer ───────────────────────────────────────────────
    defineField({ name: 'footerAbout', title: 'Footer About Text', type: 'text', rows: 3 }),
    defineField({ name: 'licenceNSW', title: 'NSW Licence Number', type: 'string' }),
    defineField({ name: 'licenceQLD', title: 'QBCC Number', type: 'string' }),
  ],
})
