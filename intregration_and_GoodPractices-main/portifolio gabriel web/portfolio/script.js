/* ==========================================
   LOADER
========================================== */

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => loader.classList.add("hide"), 800);
});

/* ==========================================
   TEXTO DIGITANDO (typing effect)
========================================== */

const titleText = "Bem-vindo ao meu portfólio, eu sou o Kauan!";
const typingElement = document.getElementById("typing");
let index = 0;

function typing() {
  typingElement.innerHTML = titleText.substring(0, index++);
  if (index <= titleText.length) {
    setTimeout(typing, 60);
  }
}
typing();

/* ==========================================
   PARTÍCULAS NO FUNDO
========================================== */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.onresize = resize;

let particles = [];

for (let i = 0; i < 90; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.6,
    dy: (Math.random() - 0.5) * 0.6
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#4ea8ff";

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });

  requestAnimationFrame(drawParticles);
}
drawParticles();

/* ==========================================
   MODO CLARO/ESCURO
========================================== */

const toggleBtn = document.querySelector('.dark-toggle');
const body = document.body;

if (localStorage.getItem('theme') === 'light') {
  body.classList.add('light-mode');
  toggleBtn.innerHTML = `<i class="fas fa-sun"></i>`;
}

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('light-mode');

  if (body.classList.contains('light-mode')) {
    toggleBtn.innerHTML = `<i class="fas fa-sun"></i>`;
    localStorage.setItem('theme', 'light');
  } else {
    toggleBtn.innerHTML = `<i class="fas fa-moon"></i>`;
    localStorage.setItem('theme', 'dark');
  }
});

/* ==========================================
   SCROLL SUAVE
========================================== */

document.querySelectorAll('nav ul li a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const alvo = document.querySelector(link.getAttribute('href'));
    alvo.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ==========================================
   ANIMAÇÃO AO ROLAR (fade-up)
========================================== */

const observador = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('aparecer');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('section').forEach(sec => {
  sec.classList.add('invisivel');
  observador.observe(sec);
});

/* ==========================================
   CARDS 3D (projetos)
========================================== */

const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    let rotateX = (y - rect.height / 2) / 20;
    let rotateY = (x - rect.width / 2) / 20;

    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
});
