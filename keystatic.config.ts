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
        // ── Navigation ────────────────────────────────────────
        navLogo: fields.text({ label: 'Nav — Logo Text' }),
        navLogoAccent: fields.text({ label: 'Nav — Logo Accent Word' }),
        navCta: fields.text({ label: 'Nav — Button Text (desktop)' }),
        navCtaMobile: fields.text({ label: 'Nav — Button Text (mobile menu)' }),

        // ── Hero ──────────────────────────────────────────────
        heroEyebrow: fields.text({ label: 'Hero Eyebrow Text' }),
        heroTitle: fields.text({ label: 'Hero Title (line 1)' }),
        heroTitleEm: fields.text({ label: 'Hero Title (italic word)' }),
        heroTitle3: fields.text({ label: 'Hero Title (line 3)' }),
        heroSubtitle: fields.text({ label: 'Hero Subtitle', multiline: true }),
        heroBtnPrimary: fields.text({ label: 'Hero — Primary Button' }),
        heroBtnSecondary: fields.text({ label: 'Hero — Secondary Button' }),
        heroBadgeNum: fields.text({ label: 'Hero — Badge Number (e.g. 5★)' }),
        heroBadgeText: fields.text({ label: 'Hero — Badge Text', multiline: true }),
        heroScrollLabel: fields.text({ label: 'Hero — Scroll Indicator Label' }),
        heroTicker: fields.array(fields.text({ label: 'Ticker Item' }), {
          label: 'Hero — Ticker Items',
          itemLabel: (p) => p.value || 'Item',
        }),
        heroImage: fields.image({
          label: 'Hero Background Image',
          description: 'Large architectural photo shown on the right side of the hero.',
          directory: 'public/images/site',
          publicPath: '/images/site',
        }),

        // ── About ─────────────────────────────────────────────
        aboutEyebrow: fields.text({ label: 'About Eyebrow' }),
        aboutTitle: fields.text({ label: 'About Title' }),
        aboutTitleEm: fields.text({ label: 'About Title (italic part)' }),
        aboutParagraph1: fields.text({ label: 'About Paragraph 1', multiline: true }),
        aboutParagraph2: fields.text({ label: 'About Paragraph 2', multiline: true }),
        aboutButton: fields.text({ label: 'About — Button Text' }),
        aboutImage: fields.image({
          label: 'About Main Image',
          directory: 'public/images/site',
          publicPath: '/images/site',
        }),
        aboutQuote: fields.text({ label: 'About Pull Quote' }),

        // ── Services (section copy; the cards are in "Services" collection) ──
        servicesEyebrow: fields.text({ label: 'Services — Eyebrow' }),
        servicesTitle: fields.text({ label: 'Services — Title' }),
        servicesTitleEm: fields.text({ label: 'Services — Title (italic part)' }),
        servicesIntro: fields.text({ label: 'Services — Intro Paragraph', multiline: true }),
        servicesCardLink: fields.text({ label: 'Services — Card Link Text (e.g. Learn More)' }),

        // ── Process ───────────────────────────────────────────
        processEyebrow: fields.text({ label: 'Process — Eyebrow' }),
        processTitle: fields.text({ label: 'Process — Title' }),
        processTitleEm: fields.text({ label: 'Process — Title (italic part)' }),
        processSteps: fields.array(
          fields.object({
            num: fields.text({ label: 'Step Label (e.g. Step 01)' }),
            name: fields.text({ label: 'Step Title' }),
            desc: fields.text({ label: 'Step Description', multiline: true }),
          }),
          {
            label: 'Process — Steps',
            itemLabel: (p) => p.fields.name.value || 'Step',
          }
        ),

        // ── "Already Have Plans?" band ────────────────────────
        drawingsEyebrow: fields.text({ label: 'Drawings Band — Eyebrow' }),
        drawingsTitle: fields.text({ label: 'Drawings Band — Title' }),
        drawingsTitleEm: fields.text({ label: 'Drawings Band — Title (italic part)' }),
        drawingsText: fields.text({ label: 'Drawings Band — Paragraph', multiline: true }),
        drawingsCta: fields.text({ label: 'Drawings Band — Button Text' }),

        // ── Portfolio (Featured Projects section copy) ────────
        portfolioEyebrow: fields.text({ label: 'Portfolio — Eyebrow' }),
        portfolioTitle: fields.text({ label: 'Portfolio — Title' }),
        portfolioTitleEm: fields.text({ label: 'Portfolio — Title (italic part)' }),
        portfolioViewAll: fields.text({ label: 'Portfolio — "View All" Button' }),
        portfolioCardView: fields.text({ label: 'Portfolio — Card Hover Text' }),

        // ── Testimonials (section copy; cards are in "Testimonials" collection) ──
        testimonialsEyebrow: fields.text({ label: 'Testimonials — Eyebrow' }),
        testimonialsTitle: fields.text({ label: 'Testimonials — Title' }),
        testimonialsTitleEm: fields.text({ label: 'Testimonials — Title (italic part)' }),

        // ── Team (section copy; members are in "Team Members" collection) ──
        teamEyebrow: fields.text({ label: 'Team — Eyebrow' }),
        teamTitle: fields.text({ label: 'Team — Title' }),
        teamTitleEm: fields.text({ label: 'Team — Title (italic part)' }),
        teamIntro: fields.text({ label: 'Team — Intro Paragraph', multiline: true }),

        // ── CTA band ──────────────────────────────────────────
        ctaTitle: fields.text({ label: 'CTA — Title' }),
        ctaTitleEm: fields.text({ label: 'CTA — Title (italic part)' }),
        ctaText: fields.text({ label: 'CTA — Paragraph', multiline: true }),
        ctaBtnPrimary: fields.text({ label: 'CTA — Primary Button' }),
        ctaBtnSecondary: fields.text({ label: 'CTA — Secondary Button' }),

        // ── All Projects page (/projects) ─────────────────────
        projectsPageEyebrow: fields.text({ label: 'Projects Page — Eyebrow' }),
        projectsPageTitle: fields.text({ label: 'Projects Page — Title' }),
        projectsPageTitleEm: fields.text({ label: 'Projects Page — Title (italic part)' }),
        projectsPageIntro: fields.text({ label: 'Projects Page — Intro Paragraph', multiline: true }),
        projectsPageBack: fields.text({ label: 'Projects Page — Back Link Text' }),
        projectsPageCardView: fields.text({ label: 'Projects Page — Card Hover Text' }),

        // ── Contact / Social ──────────────────────────────────
        ctaEmail: fields.text({ label: 'Contact Email' }),
        ctaPhone: fields.text({ label: 'Contact Phone (primary)' }),
        ctaPhone2: fields.text({ label: 'Contact Phone (secondary)' }),
        address: fields.text({ label: 'Head Office Address' }),
        instagramUrl: fields.text({ label: 'Instagram URL' }),

        // ── Footer ────────────────────────────────────────────
        footerAbout: fields.text({ label: 'Footer About Text', multiline: true }),
        footerServicesHeading: fields.text({ label: 'Footer — Services Column Heading' }),
        footerServices: fields.array(fields.text({ label: 'Service' }), {
          label: 'Footer — Services List',
          itemLabel: (p) => p.value || 'Service',
        }),
        footerCompanyHeading: fields.text({ label: 'Footer — Company Column Heading' }),
        footerContactHeading: fields.text({ label: 'Footer — Contact Column Heading' }),
        footerLocations: fields.array(fields.text({ label: 'Location' }), {
          label: 'Footer — Locations List',
          itemLabel: (p) => p.value || 'Location',
        }),
        footerLicenceLabel: fields.text({ label: 'Footer — Licence Label (e.g. "License number:")' }),
        licenceNSW: fields.text({ label: 'Licence Number (primary)' }),
        licenceQLD: fields.text({ label: 'Licence Number (secondary)' }),
        footerSocialLabel: fields.text({ label: 'Footer — Social Link Label' }),
        footerCopyright: fields.text({ label: 'Footer — Copyright Text (year is added automatically)' }),
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
