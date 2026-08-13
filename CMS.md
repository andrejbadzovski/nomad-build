# Content management (Keystatic)

This site uses **[Keystatic](https://keystatic.com)** as its CMS. It replaced Sanity.
Keystatic is free and open source, needs **no database and no external service**, and
stores all content as files inside this repo.

## Where content lives

| Type | Editing UI | Stored at |
| --- | --- | --- |
| Site Settings (hero, about, contact, footer) | Site Settings singleton | `content/site-settings/` |
| Projects | Projects collection | `content/projects/*.json` |
| Services | Services collection | `content/services/*.json` |
| Testimonials | Testimonials collection | `content/testimonials/*.json` |
| Team Members | Team Members collection | `content/team/*.json` |
| Uploaded images | (attached to the above) | `public/images/**` |

If a field or collection is empty, the site falls back to the built-in defaults in
`lib/constants.ts` (`defaultData` / `FALLBACK_IMAGES`), so the site always renders.

## Editing content

Run the app and open the admin:

```bash
npm run dev
```

Then go to **http://localhost:3000/keystatic**. Changes are written straight to the
`content/` and `public/images/` files — commit them to git to publish.

## Letting the client edit the live site

The config already switches automatically:

- **Local dev** (`npm run dev`) → `local` storage. Edits write to the files on disk,
  no login. Use this to test and to bulk-edit content yourself.
- **Production** (Vercel) → **Keystatic Cloud**. This lets you invite the client **by
  email** — they do **not** need a GitHub account.

### One-time Cloud setup (so the client can edit the live site)

Prerequisites: this repo is pushed to GitHub and the site is deployed to Vercel.

1. Go to **https://keystatic.cloud** and sign in with GitHub (you, the site owner).
2. Create a **team**, then a **project**, and connect it to this GitHub repo.
3. Copy the project slug — it looks like `your-team/your-project`.
4. In **Vercel → your project → Settings → Environment Variables**, add:
   - `NEXT_PUBLIC_KEYSTATIC_CLOUD_PROJECT` = `your-team/your-project`

   Then redeploy.
5. In the Keystatic Cloud dashboard, **invite the client by email** (Team → invite).
   Free tier covers up to 3 users.
6. The client visits `https://your-site.com/keystatic`, accepts the email invite, and
   edits. Their changes are committed to the repo, which triggers a Vercel redeploy and
   updates the live site.

Docs: https://keystatic.com/docs/cloud

> Note: on the free tier, uploaded images are stored in the repo under
> `public/images/**` (same as now). Keystatic Cloud's optimized image hosting is a paid
> feature and is optional.

## How the app reads content

- `lib/cms/queries.ts` — Keystatic Reader API; same function names/shapes the old
  Sanity layer exposed (`getSiteSettings`, `getFeaturedProjects`, `getAllProjects`,
  `getServices`, `getTestimonials`, `getTeam`).
- `lib/cms/image.ts` — `urlFor()` compat shim. Keystatic returns a local image path;
  Next.js `<Image>` handles resizing (the old `.width().height()` calls are no-ops).

## Notes

- **Hosting:** because the Reader API reads local files, deploy to a Node host or use
  Next's static/ISR build (`npm run build && npm run start`). On fully serverless
  platforms, build content into the deploy rather than reading it at request time.
- **Next.js version:** the project is on `next@14.2.14`, which has a known security
  advisory. Patching to the latest `14.2.x` (`npm i next@14.2`) is recommended and does
  **not** require a major upgrade.
