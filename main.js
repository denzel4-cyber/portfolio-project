/* ============================================
   PORTFOLIO — main.js
   Form validation + scroll animations
   ============================================ */

/* === ACTIVE NAV LINK === */
(function setActiveNav() {
  const links = document.querySelectorAll('.nav-links a');
  const current = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* === NAV SHADOW ON SCROLL === */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (!nav) return;
  if (window.scrollY > 20) {
    nav.style.borderBottomColor = 'rgba(124, 106, 247, 0.2)';
  } else {
    nav.style.borderBottomColor = 'rgba(255,255,255,0.07)';
  }
});

/* === SKILL BARS ANIMATION === */
function animateSkillBars() {
  const fills = document.querySelectorAll('.skill-bar-fill');
  fills.forEach(fill => {
    const width = fill.dataset.width || '0%';
    fill.style.width = '0%';
    setTimeout(() => { fill.style.width = width; }, 100);
  });
}

/* === INTERSECTION OBSERVER — Reveal on scroll === */
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';

      /* Trigger skill bars once visible */
      if (entry.target.classList.contains('skills-section')) {
        animateSkillBars();
      }

      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.card, .highlight-card, .timeline-item, .skills-section, .about-content, .stat-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

/* === CONTACT FORM VALIDATION === */
const form = document.getElementById('contactForm');
if (form) {
  const fields = {
    name:    { el: document.getElementById('name'),    errorEl: document.getElementById('nameError') },
    email:   { el: document.getElementById('email'),   errorEl: document.getElementById('emailError') },
    subject: { el: document.getElementById('subject'), errorEl: document.getElementById('subjectError') },
    message: { el: document.getElementById('message'), errorEl: document.getElementById('messageError') },
  };

  function showError(field, msg) {
    fields[field].el.classList.add('error');
    fields[field].errorEl.textContent = msg;
  }

  function clearError(field) {
    fields[field].el.classList.remove('error');
    fields[field].errorEl.textContent = '';
  }

  /* Live validation on blur */
  fields.name.el.addEventListener('blur', () => {
    const val = fields.name.el.value.trim();
    if (!val) showError('name', 'Please enter your name.');
    else if (val.length < 2) showError('name', 'Name must be at least 2 characters.');
    else clearError('name');
  });

  fields.email.el.addEventListener('blur', () => {
    const val = fields.email.el.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!val) showError('email', 'Please enter your email.');
    else if (!emailRegex.test(val)) showError('email', 'Please enter a valid email address.');
    else clearError('email');
  });

  fields.subject.el.addEventListener('blur', () => {
    const val = fields.subject.el.value.trim();
    if (!val) showError('subject', 'Please enter a subject.');
    else clearError('subject');
  });

  fields.message.el.addEventListener('blur', () => {
    const val = fields.message.el.value.trim();
    if (!val) showError('message', 'Please enter your message.');
    else if (val.length < 20) showError('message', 'Message must be at least 20 characters.');
    else clearError('message');
  });

  /* Submit */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const nameVal = fields.name.el.value.trim();
    if (!nameVal || nameVal.length < 2) { showError('name', 'Please enter your full name.'); valid = false; }
    else clearError('name');

    const emailVal = fields.email.el.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal || !emailRegex.test(emailVal)) { showError('email', 'Please enter a valid email address.'); valid = false; }
    else clearError('email');

    const subjectVal = fields.subject.el.value.trim();
    if (!subjectVal) { showError('subject', 'Please enter a subject.'); valid = false; }
    else clearError('subject');

    const messageVal = fields.message.el.value.trim();
    if (!messageVal || messageVal.length < 20) { showError('message', 'Message must be at least 20 characters.'); valid = false; }
    else clearError('message');

    if (valid) {
      form.style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
    }
  });
}
