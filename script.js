// Initialize Lenis for Smooth Scrolling
let lenis;
try {
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
} catch (e) {
  console.error("Lenis smooth scroll could not be loaded", e);
}

// Connect Lenis to GSAP ScrollTrigger
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Custom Cursor Logic
const cursor = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', (e) => {
  if (cursor) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  }
});

// CPU Circuit Background Canvas
const canvas = document.getElementById('space-canvas');
const ctx = canvas.getContext('2d');
let width, height, nodes = [], packets = [];

// Evolving Canvas State
const bgState = {
  packetBaseSpeed: 0.005,
  packetSpeedRange: 0.015,
  lineOpacity: 0.08,
  spawnChance: 0.85,
  maxPackets: 80,
  nodeColorAlpha: 0.5
};

function initCPU() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  nodes = [];
  packets = [];
  
  // Create grid of nodes
  const cols = Math.floor(width / 120);
  const rows = Math.floor(height / 120);
  
  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j <= rows; j++) {
      if (Math.random() > 0.3) {
        nodes.push({
          x: i * 120 + (Math.random() * 60 - 30),
          y: j * 120 + (Math.random() * 60 - 30),
          connections: []
        });
      }
    }
  }

  // Connect nodes
  nodes.forEach(node => {
    let distances = nodes.map(n => ({ n, d: Math.hypot(n.x - node.x, n.y - node.y) }));
    distances.sort((a, b) => a.d - b.d);
    // connect to 2-3 closest nodes
    for(let k = 1; k < 4; k++) {
      if(distances[k] && distances[k].d < 200) {
        node.connections.push(distances[k].n);
      }
    }
  });
}

function spawnPacket() {
  if (nodes.length === 0) return;
  const startNode = nodes[Math.floor(Math.random() * nodes.length)];
  if (startNode.connections.length === 0) return;
  const endNode = startNode.connections[Math.floor(Math.random() * startNode.connections.length)];
  
  packets.push({
    x: startNode.x,
    y: startNode.y,
    targetX: endNode.x,
    targetY: endNode.y,
    progress: 0,
    speed: bgState.packetBaseSpeed + Math.random() * bgState.packetSpeedRange
  });
}

function animateCPU() {
  ctx.clearRect(0, 0, width, height);
  
  // Draw connections
  ctx.strokeStyle = `rgba(0, 240, 255, ${bgState.lineOpacity})`;
  ctx.lineWidth = 1;
  nodes.forEach(node => {
    node.connections.forEach(target => {
      ctx.beginPath();
      ctx.moveTo(node.x, node.y);
      ctx.lineTo(target.x, target.y);
      ctx.stroke();
    });
  });

  // Draw nodes
  ctx.fillStyle = `rgba(112, 0, 255, ${bgState.nodeColorAlpha})`;
  nodes.forEach(node => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
    ctx.fill();
  });

  // Update and draw packets (data moving)
  for (let i = packets.length - 1; i >= 0; i--) {
    let p = packets[i];
    p.progress += p.speed;
    
    if (p.progress >= 1) {
      packets.splice(i, 1);
      continue;
    }
    
    const currX = p.x + (p.targetX - p.x) * p.progress;
    const currY = p.y + (p.targetY - p.y) * p.progress;
    
    // Packet head
    ctx.fillStyle = 'rgba(0, 240, 255, 0.9)';
    ctx.beginPath();
    ctx.arc(currX, currY, 2.5, 0, Math.PI * 2);
    ctx.fill();
    
    // Packet trail
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const trailProgress = Math.max(0, p.progress - 0.15);
    ctx.moveTo(p.x + (p.targetX - p.x) * trailProgress, p.y + (p.targetY - p.y) * trailProgress);
    ctx.lineTo(currX, currY);
    ctx.stroke();
  }
  
  // Randomly spawn data packets
  if (Math.random() > bgState.spawnChance && packets.length < bgState.maxPackets) {
    spawnPacket();
  }

  requestAnimationFrame(animateCPU);
}

initCPU();
animateCPU();
window.addEventListener('resize', initCPU);

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.add('scrolled'); // keep glassmorphism always or adapt based on design
  }
});

// GSAP Animations
if (typeof gsap !== 'undefined') {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach((el) => {
    gsap.fromTo(el, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  });

  const scaleReveals = document.querySelectorAll('.reveal-scale');
  scaleReveals.forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        }
      }
    );
  });

  // Evolving Background & Cluster Timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      invalidateOnRefresh: true // Re-calculates positions on window resize
    }
  });

  // Hero -> About
  tl.to('#global-avatar', { left: '85%', top: '20%', scale: 0.5, rotation: 180, opacity: 0.7, ease: 'none' })
    .to(bgState, { packetBaseSpeed: 0.01, packetSpeedRange: 0.02, lineOpacity: 0.15, maxPackets: 120, spawnChance: 0.7, nodeColorAlpha: 0.7, ease: 'none' }, "<")
    
  // About -> Experience Top (Center on the left timeline line)
    .to('#global-avatar', { 
      left: () => {
        const tlEl = document.querySelector('.timeline');
        return tlEl ? (tlEl.getBoundingClientRect().left) + 'px' : '10%';
      }, 
      top: '30%', 
      scale: 0.25, 
      rotation: 360, 
      opacity: 0.9, 
      ease: 'none' 
    })
    .to(bgState, { packetBaseSpeed: 0.02, packetSpeedRange: 0.03, lineOpacity: 0.25, maxPackets: 150, spawnChance: 0.5, nodeColorAlpha: 0.8, ease: 'none' }, "<")
    
  // Experience Top -> Experience Bottom (Slide straight down the timeline)
    .to('#global-avatar', { 
      left: () => {
        const tlEl = document.querySelector('.timeline');
        return tlEl ? (tlEl.getBoundingClientRect().left) + 'px' : '10%';
      }, 
      top: '70%', 
      scale: 0.25, 
      rotation: 540, 
      opacity: 0.9, 
      ease: 'none' 
    })
    .to(bgState, { packetBaseSpeed: 0.03, packetSpeedRange: 0.04, lineOpacity: 0.35, maxPackets: 200, spawnChance: 0.3, nodeColorAlpha: 0.9, ease: 'none' }, "<")

  // Experience Bottom -> Education (Move to far right top)
    .to('#global-avatar', { left: '90%', top: '25%', scale: 0.45, rotation: 720, opacity: 0.7, ease: 'none' }) 
    .to(bgState, { packetBaseSpeed: 0.04, packetSpeedRange: 0.05, lineOpacity: 0.45, maxPackets: 230, spawnChance: 0.2, nodeColorAlpha: 0.9, ease: 'none' }, "<")
    
  // Education -> Projects (Bigger and a bit down at mid high center)
    .to('#global-avatar', { left: '50%', top: '35%', scale: 1, rotation: 900, opacity: 0.9, ease: 'none' })
    .to(bgState, { packetBaseSpeed: 0.05, packetSpeedRange: 0.06, lineOpacity: 0.6, maxPackets: 260, spawnChance: 0.1, nodeColorAlpha: 1, ease: 'none' }, "<")
    
  // Projects -> Contact (Stop and stay at Projects location, do not follow to connect)
    .to('#global-avatar', { left: '50%', top: '35%', scale: 1, rotation: 1080, opacity: 0.9, ease: 'none' })
    .to(bgState, { packetBaseSpeed: 0.06, packetSpeedRange: 0.07, lineOpacity: 0.8, maxPackets: 300, spawnChance: 0.05, nodeColorAlpha: 1, ease: 'none' }, "<");
}

// Fetch GitHub Projects
async function fetchGithubProjects() {
  const container = document.getElementById('github-projects');
  try {
    const response = await fetch('https://api.github.com/users/MatanNoam1/repos?sort=updated&direction=desc');
    const repos = await response.json();
    
    // Filter out forks and keep max 6
    const validRepos = repos.filter(r => !r.fork).slice(0, 6);
    
    container.innerHTML = '';
    
    if (validRepos.length === 0) {
      container.innerHTML = '<p>No repositories found.</p>';
      return;
    }

    validRepos.forEach(repo => {
      // Pick a language color pseudo-randomly for aesthetic if not provided by GitHub api easily
      const techColor = repo.language === 'Python' ? '#3572A5' : (repo.language === 'Java' ? '#b07219' : 'var(--accent-1)');
      
      const card = document.createElement('div');
      card.className = 'project-card glass-panel reveal';
      card.innerHTML = `
        <div class="project-top">
          <svg class="project-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
          <div class="project-links">
            <a href="${repo.html_url}" target="_blank">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </div>
        </div>
        <h3 class="project-title">${repo.name}</h3>
        <p class="project-desc">${repo.description || 'No description provided.'}</p>
        <div class="project-tech">
          <span class="tech-dot" style="background-color: ${techColor}"></span>
          ${repo.language || 'Code'}
        </div>
      `;
      container.appendChild(card);
    });
    
    // Re-trigger scrolltrigger for dynamic content
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }

  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    container.innerHTML = '<p>Failed to load projects. Check GitHub later.</p>';
  }
}

document.addEventListener('DOMContentLoaded', fetchGithubProjects);

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      if (typeof lenis !== 'undefined' && lenis) {
        lenis.scrollTo(target, { offset: -80 });
      } else {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
  });
});
