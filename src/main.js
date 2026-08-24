import './style.css';

const adminPath = import.meta.env.VITE_BLOG_ADMIN_PATH || '/blogadmin';
const adminUsername = import.meta.env.VITE_BLOG_ADMIN_USERNAME || '';
const adminPassword = import.meta.env.VITE_BLOG_ADMIN_PASSWORD || '';
const app = document.querySelector('#app');
const defaultPosts = [
  { id: 1, date: '2025.04.18', tag: 'DEV LOG', title: 'Building tiny tools that feel huge', body: 'I like making focused tools with a little personality. The best interfaces explain themselves through rhythm, feedback, and a few well-placed surprises.' },
  { id: 2, date: '2025.03.02', tag: 'NOTES', title: 'Why I keep coming back to the web', body: 'There is something special about shipping a thought as a URL. The web is a sketchbook, an arcade cabinet, and a place to leave breadcrumbs for curious people.' }
];

const getPosts = () => JSON.parse(localStorage.getItem('kyroxe-posts') || 'null') || defaultPosts;
const go = (path) => { history.pushState({}, '', path); render(); window.scrollTo(0, 0); };
const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));

function frame(content, active = '') {
  return `<div class="scanlines"></div><header class="topbar"><button class="quit" data-route="/" aria-label="Return to main menu"><span>←</span> QUIT</button><div class="status"><span class="status-dot"></span> KYROXE SYSTEMS <span class="divider">//</span> ONLINE</div><div class="clock">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div></header><main class="game-frame ${active}">${content}</main><footer class="footer"><span>KYX-001</span><span>© 2025 KYROXE</span><span>BUILD 01.04</span></footer>`;
}

function menu() {
  return `<div class="menu-view"><div class="menu-noise"></div><section class="title-block"><p class="eyebrow">PERSONAL ARCHIVE / PLAYER ONE</p><h1>KYROXE<span class="cursor">_</span></h1><p class="subtitle">DEVELOPER · CREATOR · EXPLORER</p></section><nav class="main-menu" aria-label="Main menu"><button class="menu-option selected" data-route="/about"><span class="option-index">01</span><span>ENTER PROFILE</span><span class="option-arrow">↗</span></button><button class="menu-option" data-route="/blog"><span class="option-index">02</span><span>READ THE BLOG</span><span class="option-arrow">↗</span></button><button class="menu-option" data-route="/credits"><span class="option-index">03</span><span>CREDITS</span><span class="option-arrow">↗</span></button></nav><div class="menu-hint"><span class="key">↑ ↓</span> SELECT <span class="key">ENTER</span> CONFIRM</div><div class="menu-orbit orbit-a"></div><div class="menu-orbit orbit-b"></div><div class="menu-build">PORTFOLIO.EXE // v1.0.4</div></div>`;
}

function about() {
  return frame(`<section class="page-grid about-page"><div class="page-intro"><p class="eyebrow">01 / PROFILE DATA</p><h2>PLAYER<br><em>ONE</em></h2><p class="lede">A developer in progress, collecting ideas and turning them into things you can click.</p><div class="portrait"><div class="portrait-grid"></div><span class="portrait-mark">KX</span><span class="portrait-label">SIGNAL FOUND</span></div></div><div class="data-panel"><div class="panel-heading"><span>IDENTITY.LOG</span><span class="panel-state">● ACTIVE</span></div><div class="stats"><div><span class="label">CODENAME</span><strong>KYROXE</strong></div><div><span class="label">AGE</span><strong>15</strong></div><div><span class="label">PRONOUNS</span><strong>THEY / THEM</strong></div><div><span class="label">CURRENT LEVEL</span><strong>GRADE 11</strong></div><div><span class="label">BASE</span><strong>EARTH // ONLINE</strong></div></div><div class="bio-copy"><p>Hey, I'm Kyroxe. I spend my time exploring code, designing digital spaces, and learning how the pieces fit together.</p><p>This portfolio is my little save point: a place for experiments, notes, and whatever I build next.</p></div><div class="skill-list"><span class="label">CURRENT LOADOUT</span><div class="chips"><span>HTML / CSS</span><span>JAVASCRIPT</span><span>UI DESIGN</span><span>LEARNING</span></div></div></div></section>`, 'about');
}

function blog() {
  const posts = getPosts();
  return frame(`<section class="blog-page"><div class="blog-heading"><div><p class="eyebrow">02 / TRANSMISSIONS</p><h2>THE <em>LOG</em></h2></div><p class="lede">Thoughts from the workshop.<br>New entries when the signal is strong.</p></div><div class="post-list">${posts.map((post, index) => `<article class="post" style="--delay:${index * 100}ms"><div class="post-number">${String(index + 1).padStart(2, '0')}</div><div class="post-content"><div class="post-meta"><span>${esc(post.date)}</span><span class="tag">${esc(post.tag)}</span></div><h3>${esc(post.title)}</h3><p>${esc(post.body)}</p><button class="text-button" data-post="${post.id}">OPEN ENTRY <span>↗</span></button></div></article>`).join('')}</div><div class="signal-bar"><span class="signal-bars">▂ ▅ ▇</span> END OF TRANSMISSION <span class="signal-bars">▇ ▅ ▂</span></div></section>`, 'blog');
}

function credits() {
  return frame(`<section class="credits-page"><p class="eyebrow">03 / ATTRIBUTION</p><div class="credits-center"><p class="credit-small">A PORTFOLIO BY</p><h2>KYROXE</h2><div class="credit-line"></div><p class="credit-role">DEVELOPER · DESIGNER · HUMAN</p><a class="email-link" href="mailto:me@kyroxe.is-a.dev">me@kyroxe.is-a.dev <span>↗</span></a><p class="credit-note">Thanks for visiting my corner of the internet.<br>Press QUIT to return to the main menu.</p></div><div class="credits-foot"><span>ALL SYSTEMS NOMINAL</span><span>MADE WITH CURIOSITY</span></div></section>`, 'credits');
}

function adminLogin() {
  return frame(`<section class="login-page"><div class="login-panel"><p class="eyebrow">RESTRICTED CONSOLE</p><h2>ACCESS <em>REQUIRED</em></h2><p class="login-copy">Authenticate to access the transmission editor.</p><form class="admin-form" id="login-form"><label>USERNAME<input name="username" autocomplete="username" required /></label><label>PASSWORD<input name="password" type="password" autocomplete="current-password" required /></label><p class="login-error" id="login-error" role="alert"></p><button class="submit-button" type="submit">AUTHENTICATE <span>↗</span></button></form></div></section>`, 'admin');
}

function admin() {
  const posts = getPosts();
  return frame(`<section class="admin-page"><div class="blog-heading"><div><p class="eyebrow">RESTRICTED CONSOLE</p><h2>POST <em>ADMIN</em></h2></div><button class="logout-button" id="logout-button">LOG OUT <span>↗</span></button></div><form class="admin-form" id="post-form"><label>TITLE<input name="title" required placeholder="A new transmission" /></label><label>TAG<input name="tag" value="DEV LOG" required /></label><label>BODY<textarea name="body" required placeholder="Write something worth transmitting..."></textarea></label><button class="submit-button" type="submit">SAVE ENTRY <span>↗</span></button></form><div class="admin-entries"><span class="label">SAVED ENTRIES</span>${posts.map((post) => `<div class="admin-row"><span>${esc(post.date)} · ${esc(post.title)}</span><button class="delete-button" data-delete="${post.id}" aria-label="Delete ${esc(post.title)}">×</button></div>`).join('')}</div></section>`, 'admin');
}

function loading() {
  app.innerHTML = `<div class="loading"><div class="loading-logo">KYROXE<span>_</span></div><div class="loading-track"><div class="loading-fill"></div></div><div class="loading-copy"><span>INITIALIZING PORTFOLIO.EXE</span><span>PLEASE WAIT</span></div></div>`;
  setTimeout(render, 1150);
}

function render() {
  const path = location.pathname.replace(/\/$/, '') || '/';
  if (path === '/' && !sessionStorage.getItem('kyroxe-loaded')) { sessionStorage.setItem('kyroxe-loaded', '1'); loading(); return; }
  app.innerHTML = path === '/' ? menu() : path === '/about' ? about() : path === '/blog' ? blog() : path === '/credits' ? credits() : path === adminPath ? (sessionStorage.getItem('kyroxe-admin-auth') === 'true' ? admin() : adminLogin()) : menu();
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
  const loginForm = document.querySelector('#login-form');
  if (loginForm) loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(loginForm);
    const error = document.querySelector('#login-error');
    if (data.get('username') === adminUsername && data.get('password') === adminPassword && adminUsername && adminPassword) {
      sessionStorage.setItem('kyroxe-admin-auth', 'true');
      render();
      return;
    }
    error.textContent = 'ACCESS DENIED // CHECK CREDENTIALS';
  });
  const logoutButton = document.querySelector('#logout-button');
  if (logoutButton) logoutButton.addEventListener('click', () => { sessionStorage.removeItem('kyroxe-admin-auth'); render(); });
  const form = document.querySelector('#post-form');
  if (form) form.addEventListener('submit', (event) => { event.preventDefault(); const data = new FormData(form); const posts = getPosts(); posts.unshift({ id: Date.now(), date: new Date().toISOString().slice(0, 10).replaceAll('-', '.'), tag: data.get('tag'), title: data.get('title'), body: data.get('body') }); localStorage.setItem('kyroxe-posts', JSON.stringify(posts)); render(); });
  document.querySelectorAll('[data-delete]').forEach((button) => button.addEventListener('click', () => { localStorage.setItem('kyroxe-posts', JSON.stringify(getPosts().filter((post) => String(post.id) !== button.dataset.delete))); render(); }));
}

window.addEventListener('popstate', render);
render();
