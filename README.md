# MatanNoam

> Personal portfolio website for **Matan Noam** — Software Engineering student at Ben-Gurion University & Python instructor.

**Live site:** [matan-noam.vercel.app](https://matan-noam.vercel.app)

---

## Overview

A fully responsive personal landing page built with zero dependencies — no frameworks, no build tools, no npm. Open `index.html` and it runs. Designed to be fast, clean, and maintainable.

---

## Features

- **Hero** — Animated gradient name, typing effect cycling through roles, floating gradient orbs
- **About** — Spinning avatar ring, quick stats, bio, social links
- **Skills** — 4 category cards with tag-based skill display
- **Experience** — Vertical timeline of 5 roles (reverse chronological)
- **Education** — Degree and coursework cards
- **GitHub Projects** — Live-fetched repo cards via GitHub public API, sorted by stars
- **Contact** — Direct links to email, LinkedIn, GitHub, phone
- **Responsive** — Mobile-first layout with hamburger nav at ≤768px
- **Animations** — IntersectionObserver scroll reveals, CSS keyframe orbs, typing effect

---

## Tech Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

| Layer | Details |
|---|---|
| Structure | Semantic HTML5 |
| Styling | CSS custom properties, Grid, Flexbox, keyframe animations |
| Behavior | Vanilla ES6+ — IntersectionObserver, Fetch API |
| Fonts | Google Fonts — Inter + JetBrains Mono (CDN) |
| Repos | GitHub public REST API (`/users/MatanNoam1/repos`) |

---

## Project Structure

```
matannoam1.github.io/
├── index.html      # All sections and content
├── styles.css      # Design system, layout, animations
├── script.js       # Typing effect, scroll reveals, GitHub API
└── README.md
```

---

## Running Locally

No installation required.

```bash
git clone https://github.com/MatanNoam1/MatanNoam1.github.io.git
cd MatanNoam1.github.io
# Open index.html in any browser
```

Or with a local dev server (optional, for live reload):

```bash
npx serve .
# or
python3 -m http.server 3000
```

---

## Deployment

Deployed via **GitHub Pages** — pushing to `main` automatically updates the live site.

Source: `main` branch → `/ (root)` → served at `https://matannoam1.github.io`

---

## Contact

| | |
|---|---|
| Email | matannoam3@gmail.com |
| LinkedIn | [matan-noam-software-data](https://www.linkedin.com/in/matan-noam-software-data/) |
| GitHub | [@MatanNoam1](https://github.com/MatanNoam1) |
