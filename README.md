# Glory Children Ministry — Next.js TypeScript Home Page

A responsive Next.js + TypeScript recreation of the supplied Glory Children Ministry desktop/mobile mockups, with an added About Us section and an overlapping impact counter card.

## Stack

- Next.js App Router
- React + TypeScript only
- CSS Modules are not required; the page uses a single global stylesheet for pixel-level responsive layout control
- lucide-react for UI icons
- No JavaScript source files
- No NestJS, Handlebars, or mixed server-template code

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For production:

```bash
npm run build
npm start
```

## Main files

- `app/page.tsx` — complete home page
- `app/globals.css` — responsive desktop/mobile styling
- `app/layout.tsx` — metadata and root layout
- `public/images/logo.png` — cleaned transparent ministry logo
- `public/images/hero-children.png` — supplied mockup-derived hero image
- `public/images/about-children.png` — supplied mockup-derived supporting image
