const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');

toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
  });
});

const projectIdeas = [
  {
    title: 'Campus helpdesk portal',
    description: 'A simple way to submit, assign, and track campus support requests.',
    category: 'CSE · WEB',
  },
  {
    title: 'Phishing awareness tool',
    description: 'Explore suspicious URL patterns with a small educational classifier.',
    category: 'CSE · DATA & AI',
  },
  {
    title: 'Smart irrigation prototype',
    description: 'Use soil moisture readings to demonstrate responsive irrigation control.',
    category: 'ENGINEERING · IoT',
  },
  {
    title: 'Energy use monitor',
    description: 'Collect sample power readings and make usage trends easier to understand.',
    category: 'ENGINEERING · ENERGY',
  },
];

const showcase = document.querySelector('.project-showcase');
if (showcase) {
  const title = document.querySelector('#idea-title');
  const description = document.querySelector('#idea-description');
  const category = document.querySelector('#idea-category');
  const count = document.querySelector('#idea-count');
  const progress = document.querySelector('#idea-progress');
  const nextButton = document.querySelector('.showcase-next');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let currentIdea = 0;
  let cycleTimer;

  const showIdea = (nextIndex) => {
    currentIdea = nextIndex % projectIdeas.length;
    showcase.classList.add('is-switching');
    window.setTimeout(() => {
      const idea = projectIdeas[currentIdea];
      title.textContent = idea.title;
      description.textContent = idea.description;
      category.textContent = idea.category;
      count.textContent = `${String(currentIdea + 1).padStart(2, '0')} / ${String(projectIdeas.length).padStart(2, '0')}`;
      progress.style.width = `${((currentIdea + 1) / projectIdeas.length) * 100}%`;
      showcase.classList.remove('is-switching');
    }, 180);
  };

  nextButton.addEventListener('click', () => showIdea(currentIdea + 1));
  if (!reducedMotion) {
    cycleTimer = window.setInterval(() => showIdea(currentIdea + 1), 4800);
    nextButton.addEventListener('click', () => {
      window.clearInterval(cycleTimer);
      cycleTimer = window.setInterval(() => showIdea(currentIdea + 1), 4800);
    });
  }
}
