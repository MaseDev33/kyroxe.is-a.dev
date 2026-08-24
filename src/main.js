import './style.css';

const app = document.querySelector('#app');

const go = (path) => { history.pushState({}, '', path); render(); window.scrollTo(0, 0); };

function frame(content, active = '') {
  return `<div class="scanlines"></div><header class="topbar"><button class="quit" data-route="/" aria-label="Return to main menu"><span>←</span> QUIT</button><div class="status"><span class="status-dot"></span> KYROXE SYSTEMS <span class="divider">//</span> ONLINE</div><div class="clock">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div></header><main class="game-frame ${active}">${content}</main><footer class="footer"><span>KYX-001</span><span>© 2025 KYROXE</span><span>BUILD 01.04</span></footer>`;
}

function menu() {
  return `<div class="menu-view"><div class="menu-noise"></div><section class="title-block"><p class="eyebrow">PERSONAL ARCHIVE / PLAYER ONE</p><h1>KYROXE<span class="cursor">_</span></h1><p class="subtitle">DEVELOPER · CREATOR · EXPLORER</p></section><nav class="main-menu" aria-label="Main menu"><button class="menu-option selected" data-route="/about"><span class="option-index">01</span><span>ENTER PROFILE</span><span class="option-arrow">↗</span></button><button class="menu-option" data-route="/credits"><span class="option-index">02</span><span>CREDITS</span><span class="option-arrow">↗</span></button></nav><div class="menu-hint"><span class="key">↑ ↓</span> SELECT <span class="key">ENTER</span> CONFIRM</div><div class="menu-orbit orbit-a"></div><div class="menu-orbit orbit-b"></div><div class="menu-build">PORTFOLIO.EXE // v1.0.4</div></div>`;
}

function about() {
  return frame(`<section class="page-grid about-page"><div class="page-intro"><p class="eyebrow">01 / PROFILE DATA</p><h2>PLAYER<br><em>ONE</em></h2><p class="lede">A developer in progress, collecting ideas and turning them into things you can click.</p><div class="portrait"><div class="portrait-grid"></div><span class="portrait-mark">KX</span><span class="portrait-label">SIGNAL FOUND</span></div></div><div class="data-panel"><div class="panel-heading"><span>IDENTITY.LOG</span><span class="panel-state">● ACTIVE</span></div><div class="stats"><div><span class="label">CODENAME</span><strong>KYROXE</strong></div><div><span class="label">AGE</span><strong>15</strong></div><div><span class="label">PRONOUNS</span><strong>THEY / THEM</strong></div><div><span class="label">CURRENT LEVEL</span><strong>GRADE 11</strong></div><div><span class="label">BASE</span><strong>EARTH // ONLINE</strong></div></div><div class="bio-copy"><p>Hey, I'm Kyroxe. I spend my time exploring code, designing digital spaces, and learning how the pieces fit together.</p><p>This portfolio is my little save point: a place for experiments, notes, and whatever I build next.</p></div><div class="skill-list"><span class="label">CURRENT LOADOUT</span><div class="chips"><span>HTML / CSS</span><span>JAVASCRIPT</span><span>UI DESIGN</span><span>LEARNING</span></div></div></div></section>`, 'about');
}

function credits() {
  return frame(`<section class="credits-page"><p class="eyebrow">02 / ATTRIBUTION</p><div class="credits-center"><p class="credit-small">A PORTFOLIO BY</p><h2>KYROXE</h2><div class="credit-line"></div><p class="credit-role">DEVELOPER · DESIGNER · HUMAN</p><a class="email-link" href="mailto:me@kyroxe.is-a.dev">me@kyroxe.is-a.dev <span>↗</span></a><p class="credit-note">Thanks for visiting my corner of the internet.<br>Press QUIT to return to the main menu.</p></div><div class="credits-foot"><span>ALL SYSTEMS NOMINAL</span><span>MADE WITH CURIOSITY</span></div></section>`, 'credits');
}

function loading() {
  app.innerHTML = `<div class="loading"><div class="loading-logo">KYROXE<span>_</span></div><div class="loading-track"><div class="loading-fill"></div></div><div class="loading-copy"><span>INITIALIZING PORTFOLIO.EXE</span><span>PLEASE WAIT</span></div></div>`;
  setTimeout(render, 1150);
}

function render() {
  const path = location.pathname.replace(/\/$/, '') || '/';
  if (path === '/' && !sessionStorage.getItem('kyroxe-loaded')) { sessionStorage.setItem('kyroxe-loaded', '1'); loading(); return; }
  app.innerHTML = path === '/' ? menu() : path === '/about' ? about() : path === '/credits' ? credits() : menu();
  bind();
}

function bind() {
  document.querySelectorAll('[data-route]').forEach((button) => button.addEventListener('click', () => go(button.dataset.route)));
  const menuOptions = [...document.querySelectorAll('.menu-option')];
  menuOptions.forEach((button, index) => button.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') go(button.dataset.route);
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    const nextIndex = event.key === 'ArrowDown' ? (index + 1) % menuOptions.length : (index - 1 + menuOptions.length) % menuOptions.length;
    menuOptions[nextIndex].focus();
  }));
  if (menuOptions.length) menuOptions[0].focus();
}

window.addEventListener('popstate', render);
render();
