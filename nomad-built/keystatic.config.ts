import { config, fields, collection, singleton } from '@keystatic/core'

// Keystatic replaces Sanity as the content source.
// Content is stored as files in the repo (content/*) and images in public/images/*.
// Storage is `local` for development — the admin at /keystatic writes directly to
// these files. To let the client edit the live site, switch `storage` to a GitHub
// connection (see README / storage notes below).
export default config({
  // Local dev writes straight to the files on disk (no login) so you can test the
  // admin instantly with `npm run dev`. In production (Vercel) it uses Keystatic
  // Cloud, which lets you invite the client by email — no GitHub account needed.
  // See CMS.md for the one-time Cloud setup.
  storage:
    process.env.NODE_ENV === 'production' ? { kind: 'cloud' } : { kind: 'local' },
  cloud: {
    // Keystatic Cloud project slug (from https://keystatic.cloud). Hardcoded so no
    // Vercel env var is needed for the CMS.
    project: 'talcom/talcondevelopments',
  },

  ui: {
    brand: { name: 'Talcon Developments' },
  },

  singletons: {
    siteSettings: singleton({
      label: 'Site Settings',
      path: 'content/site-settings',
      format: { data: 'json' },
      schema: {
        // ── Hero ──────────────────────────────────────────────
        heroEyebrow: fields.text({ label: 'Hero Eyebrow Text' }),
        heroTitle: fields.text({ label: 'Hero Title (line 1)' }),
        heroTitleEm: fields.text({ label: 'Hero Title (italic word)' }),
        heroTitle3: fields.text({ label: 'Hero Title (line 3)' }),
        heroSubtitle: fields.text({ label: 'Hero Subtitle', multiline: true }),
        heroImage: fields.image({
          label: 'Hero Background Image',
          description: 'Large architectural photo shown on the right side of the hero.',
          directory: 'public/images/site',
          publicPath: '/images/site',
        }),

        // ── About ─────────────────────────────────────────────
        aboutTitle: fields.text({ label: 'About Title' }),
        aboutTitleEm: fields.text({ label: 'About Title (italic part)' }),
        aboutParagraph1: fields.text({ label: 'About Paragraph 1', multiline: true }),
        aboutParagraph2: fields.text({ label: 'About Paragraph 2', multiline: true }),
        aboutImage: fields.image({
          label: 'About Main Image',
          directory: 'public/images/site',
          publicPath: '/images/site',
        }),
        aboutQuote: fields.text({ label: 'About Pull Quote' }),

        // ── Contact / Social ──────────────────────────────────
        ctaEmail: fields.text({ label: 'Contact Email' }),
        ctaPhone: fields.text({ label: 'Contact Phone (primary)' }),
        ctaPhone2: fields.text({ label: 'Contact Phone (secondary)' }),
        address: fields.text({ label: 'Head Office Address' }),
        instagramUrl: fields.text({ label: 'Instagram URL' }),
        facebookUrl: fields.text({ label: 'Facebook URL' }),
        linkedinUrl: fields.text({ label: 'LinkedIn URL' }),
        houzzUrl: fields.text({ label: 'Houzz URL' }),

        // ── Footer ────────────────────────────────────────────
        footerAbout: fields.text({ label: 'Footer About Text', multiline: true }),
        licenceNSW: fields.text({ label: 'Licence Number (primary)' }),
        licenceQLD: fields.text({ label: 'Licence Number (secondary)' }),
      },
    }),
  },

  collections: {
    projects: collection({
      label: 'Projects',
      path: 'content/projects/*',
      slugField: 'name',
      format: { data: 'json' },
      columns: ['name', 'location'],
      schema: {
        name: fields.slug({ name: { label: 'Project Name' } }),
        location: fields.text({ label: 'Location (e.g. Mosman, Sydney)' }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'New Build', value: 'New Build' },
            { label: 'Full Renovation', value: 'Full Renovation' },
            { label: 'Extension', value: 'Extension' },
            { label: 'Fit-Out', value: 'Fit-Out' },
            { label: 'Kitchen & Bath', value: 'Kitchen & Bath' },
            { label: 'Design & Build', value: 'Design & Build' },
          ],
          defaultValue: 'New Build',
        }),
        year: fields.integer({ label: 'Year Completed' }),
        image: fields.image({
          label: 'Cover Image',
          directory: 'public/images/projects',
          publicPath: '/images/projects',
        }),
        gallery: fields.array(
          fields.image({
            label: 'Gallery Image',
            directory: 'public/images/projects/gallery',
            publicPath: '/images/projects/gallery',
          }),
          { label: 'Gallery Images' }
        ),
        featured: fields.checkbox({ label: 'Show on Homepage', defaultValue: true }),
        order: fields.integer({ label: 'Display Order (1 = first)' }),
      },
    }),

    services: collection({
      label: 'Services',
      path: 'content/services/*',
      slugField: 'name',
      format: { data: 'json' },
      columns: ['name'],
      schema: {
        name: fields.slug({ name: { label: 'Service Name' } }),
        number: fields.text({
          label: 'Number (01, 02…)',
          description: 'Display number shown large behind the card.',
        }),
        description: fields.text({ label: 'Description', multiline: true }),
        order: fields.integer({ label: 'Display Order' }),
      },
    }),

    testimonials: collection({
      label: 'Testimonials',
      path: 'content/testimonials/*',
      slugField: 'author',
      format: { data: 'json' },
      columns: ['author', 'location'],
      schema: {
        author: fields.slug({ name: { label: 'Author Name' } }),
        quote: fields.text({ label: 'Quote', multiline: true }),
        location: fields.text({ label: 'Location' }),
        rating: fields.integer({ label: 'Rating (1–5)', defaultValue: 5 }),
        order: fields.integer({ label: 'Display Order' }),
      },
    }),

    team: collection({
      label: 'Team Members',
      path: 'content/team/*',
      slugField: 'name',
      format: { data: 'json' },
      columns: ['name', 'role'],
      schema: {
        name: fields.slug({ name: { label: 'Full Name' } }),
        role: fields.text({ label: 'Role / Title' }),
        bio: fields.text({ label: 'Short Bio', multiline: true }),
        photo: fields.image({
          label: 'Photo',
          directory: 'public/images/team',
          publicPath: '/images/team',
        }),
        order: fields.integer({ label: 'Display Order' }),
      },
    }),
  },
})
