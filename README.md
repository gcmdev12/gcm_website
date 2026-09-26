# Glory Children Ministry — NestJS Website

This is the first development slice of the redesigned Glory Children Ministry website, implemented as a NestJS MVC application with Handlebars templates and responsive CSS.

## What is included

- Responsive desktop/mobile visual system based on the approved mockup.
- Logo/brand palette extracted from the supplied Glory Children Ministry logo.
- Contact strip and footer structure for phone, email, location and social channels.
- X, Facebook, WhatsApp, TikTok and LinkedIn URLs are configurable through `.env`.
- Home page with hero, calls to action, causes, impact, gallery placeholder and news/update placeholders.
- `/causes` and `/causes/:slug` pages.
- `/contact` page with a basic POST contact flow.
- NestJS feature-module structure ready for database, authentication, donations, volunteer management, news and CMS functionality.

## Run locally

Requires Node.js 20+.

```bash
npm install
cp .env.example .env
npm run start:dev
```

Then open `http://localhost:3000`.

## Important content note

The contact values and social URLs in `.env.example` are placeholders and should be replaced with the ministry's verified details before launch. The public site found during research exposes a different `.org` domain/contact set, while the `.com` URL supplied for this project was not accessible to the web retrieval tool, so those details have deliberately not been assumed to be the same organization/site. The indexed `.org` site lists causes including clean water, shelter/food, healthcare/medication, education and clothing. citeturn2search0turn2search2

## Next engineering phase

1. Connect PostgreSQL + Prisma for causes, projects, donations, volunteers, stories and contact submissions.
2. Add an admin dashboard for non-technical staff.
3. Integrate a real donation/payment provider after the ministry confirms the preferred payment rails.
4. Add image/media management and replace all placeholders with approved ministry photography.
5. Add SEO, analytics, security headers, rate limiting, email delivery and production deployment configuration.
