// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ===== MOBILE NAV =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== TYPING EFFECT =====
const phrases = [
  'Software Engineering Student',
  'Python Instructor & Mentor',
  'Team Leader',
  'Problem Solver',
  'Future Tech Builder',
];

const typedEl = document.getElementById('typed');
let phraseIdx = 0;
let charIdx = 0;
let deleting = false;
let typingPause = false;

function type() {
  const current = phrases[phraseIdx];

  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      typingPause = true;
      setTimeout(() => { typingPause = false; deleting = true; requestAnimationFrame(typingLoop); }, 2200);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(() => requestAnimationFrame(typingLoop), 400);
      return;
    }
  }

  setTimeout(() => requestAnimationFrame(typingLoop), deleting ? 45 : 90);
}

function typingLoop() { if (!typingPause) type(); }
setTimeout(typingLoop, 800);

// ===== INTERSECTION OBSERVER — SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

// Hero elements — trigger immediately
document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// Scroll-animated elements
document.querySelectorAll(
  '.about-grid, .skill-card, .tl-item, .edu-card, .repo-card, .contact-card'
).forEach(el => {
  el.classList.add('scroll-reveal');
  revealObserver.observe(el);
});

// ===== GITHUB REPOS =====
const LANG_COLORS = {
  Python:     '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Java:       '#b07219',
  'C++':      '#f34b7d',
  C:          '#555555',
  HTML:       '#e34c26',
  CSS:        '#563d7c',
  Shell:      '#89e051',
  Go:         '#00ADD8',
  Rust:       '#dea584',
  Ruby:       '#701516',
};

function langColor(lang) {
  return LANG_COLORS[lang] || '#8b949e';
}

function renderRepos(repos) {
  const grid = document.getElementById('reposGrid');
  grid.innerHTML = '';

  if (!repos || repos.length === 0) {
    grid.innerHTML = '<p class="repo-error">No public repositories found.</p>';
    return;
  }

  const sorted = repos
    .filter(r => !r.fork)
    .sort((a, b) => (b.stargazers_count - a.stargazers_count) || new Date(b.updated_at) - new Date(a.updated_at));

  sorted.forEach((repo, i) => {
    const card = document.createElement('a');
    card.href = repo.html_url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.className = 'repo-card';
    card.style.transitionDelay = `${i * 0.05}s`;

    const desc = repo.description
      ? `<p class="repo-desc">${repo.description}</p>`
      : `<p class="repo-desc" style="font-style:italic;opacity:0.5">No description</p>`;

    const langDot = repo.language
      ? `<span class="lang-dot" style="background:${langColor(repo.language)}"></span>${repo.language}`
      : '';

    card.innerHTML = `
      <div class="repo-name">
        <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
          <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 010-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
        </svg>
        ${repo.name}
      </div>
      ${desc}
      <div class="repo-meta">
        ${repo.language ? `<span class="repo-lang">${langDot}</span>` : ''}
        ${repo.stargazers_count > 0 ? `<span class="repo-stars">⭐ ${repo.stargazers_count}</span>` : ''}
        ${repo.forks_count > 0 ? `<span class="repo-forks">🍴 ${repo.forks_count}</span>` : ''}
      </div>
    `;

    grid.appendChild(card);

    // Trigger scroll reveal for newly added cards
    setTimeout(() => revealObserver.observe(card), 10);
  });
}

function loadRepos() {
  fetch('https://api.github.com/users/MatanNoam1/repos?per_page=100&sort=updated')
    .then(r => {
      if (!r.ok) throw new Error(`GitHub API: ${r.status}`);
      return r.json();
    })
    .then(renderRepos)
    .catch(err => {
      document.getElementById('reposGrid').innerHTML = `
        <div class="repo-error">
          <p>Could not load repositories. Visit
            <a href="https://github.com/MatanNoam1" target="_blank" style="color:var(--primary-l)">github.com/MatanNoam1</a>
            directly.
          </p>
        </div>`;
      console.error(err);
    });
}

loadRepos();

// ===== SMOOTH ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
