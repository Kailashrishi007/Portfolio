# Portfolio — Kailash Ganeshkumar

A modern personal portfolio built with React, Vite and Tailwind CSS. This repository implements a polished, accessible developer portfolio featuring animated UI, an interactive terminal About section, audio cues, a horizontally sliding projects carousel (desktop) and per-project detail views.

## Overview

Key goals:
- Showcase projects and experience with good performance and accessibility.
- Provide a modern, responsive UX with subtle motion and audio.
- Offer reusable components so project detail pages are easy to extend.

## Features

- Permanent dark mode (applied at load to prevent flicker)
- Hero with typing effect and core skill chips
- Interactive terminal with typed output animation, history, and resume download
- Click SFX and optional background music
- Experience with animated skill bars and certification cards
- Horizontal projects carousel on desktop (auto-slide, pause-on-hover) and swipe/scroll on mobile
- Project detail modal reused for each project
- Contact area with direct CV download and Gmail compose shortcut

## Tech Stack

- React (Vite)
- Tailwind CSS
- Tiny utilities: IntersectionObserver hook, sound manager

## Getting Started

Prereqs: Node.js (>=18) and npm or yarn

```bash
cd portfolio
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

Open the URL printed by Vite (usually http://localhost:5173).

> Note: run commands from the `portfolio` project directory.

## Important Files & Structure

- `src/`
  - `main.jsx` & `index.css` — entry and global styles
  - `App.jsx` — app shell and hash-based `ProjectDetail` rendering
  - `data/data.js` — projects, skills and experience data
  - `components/` — UI components
    - `Navbar.jsx` — navigation, music toggle, repo link
    - `Hero.jsx` — hero content, skill chips, View Projects button
    - `About.jsx` — terminal UI (`TerminalBox`) and typed output
    - `Projects.jsx` — carousel and cards (opens `ProjectDetail` modal)
    - `ProjectDetail.jsx` — reusable project detail modal component
    - `Experience.jsx` — skill graph + certifications
    - `Contact.jsx` — CV download, Gmail compose, LinkedIn
    - `Footer.jsx` — repo link and copyright
  - `hooks/useReveal.js` — reveal-on-scroll helper
  - `lib/soundManager.js` — audio helpers

Assets are in `src/assets/` (images, logos, audio, resume PDF).

## Projects & Detail Views

- Project list is stored in `src/data/data.js`.
- Clicking a card sets the URL hash to `#project-<id>` which `App.jsx` listens for and uses to render `ProjectDetail`.
- `ProjectDetail.jsx` is intentionally reusable — add images/screenshots and extended writeups to `data.js` for richer detail pages.

## Carousel Behavior & Tuning

- The carousel uses CSS keyframes to auto-slide on desktop and is paused when the user hovers/focuses the carousel.
- Mobile devices disable auto-slide and fall back to horizontal scrolling (swipe).
- Tweak `src/index.css` -> `.carousel-track` animation duration to speed up or slow down auto-scroll.

## Terminal (About)

- The terminal uses a `typeOut` word-by-word animation for outputs and supports command history (ArrowUp / ArrowDown).
- Commands implemented: `help`, `whoareyou`, `showskills` (outputs skills), `needresume` (triggers client-side resume download), `clear`.

## Accessibility

- Focus management: sections that receive programmatic focus use `tabIndex={-1}`.
- Keyboard: Escape closes modals; terminal input supports arrow key history and Enter.
- Motion respects user `prefers-reduced-motion` where applicable.

## Audio & Browser Policies

- Click SFX plays for general clicks (ignored on form fields).
- Background music requires a user gesture due to browser autoplay restrictions. Use the music toggle in the navbar to start/stop.

## Customization & Next Steps

- Add images/screenshots for each project in `src/assets/` and add image paths to `src/data/data.js`.
- Change carousel speed in `src/index.css` by editing `.carousel-track` animation duration.
- Convert to React Router if you want clean URLs like `/projects/1`.

## Deployment

- Deploy the `dist/` output to Netlify, Vercel, GitHub Pages or other static hosts.

## Contributing

- Fork, branch, and open a PR. Keep changes scoped and consistent with Tailwind-based styling.

## Contact

- Email: kailashrishi777@gmail.com
- GitHub: https://github.com/Kailashrishi007/Portfolio

## License

- MIT (add `LICENSE` file if you want to publish with this license)

---

If you want, I can next add screenshots to `ProjectDetail` for each project or convert project detail views to dedicated routes using React Router.
