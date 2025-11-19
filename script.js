
(function matrix() {
  const canvas = document.getElementById("matrix");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;

  const fontSize = 14;
  let columns = Math.floor(w / fontSize);
  let drops = new Array(columns).fill(1);
  const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*+=-";

  function draw() {
    ctx.fillStyle = "rgba(0,0,0,0.06)";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#00ff95";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > h && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  let interval = setInterval(draw, 45);
  window.addEventListener("resize", () => {
    clearInterval(interval);
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    columns = Math.floor(w / fontSize);
    drops = new Array(columns).fill(1);
    interval = setInterval(draw, 45);
  });
})();

const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    if (document.body.classList.contains("light")) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem("theme", "light");
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem("theme", "dark");
    }
  });
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
}


(function holoTilt() {
  const holo = document.getElementById("holoCard");
  if (!holo) return;
  let rafId = null;
  let targetX = 0, targetY = 0, curX = 0, curY = 0;
  const ease = 0.12;

  function animate() {
    curX += (targetX - curX) * ease;
    curY += (targetY - curY) * ease;
    holo.style.transform = `perspective(900px) rotateX(${curY}deg) rotateY(${curX}deg) scale(1.02)`;
    rafId = requestAnimationFrame(animate);
  }

  holo.addEventListener("mousemove", (e) => {
    const r = holo.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    targetX = (dx / (r.width / 2)) * -8;
    targetY = (dy / (r.height / 2)) * 8;
  });
  holo.addEventListener("mouseenter", () => { if (!rafId) animate(); });
  holo.addEventListener("mouseleave", () => { cancelAnimationFrame(rafId); rafId = null; holo.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale(1)'; });
})();

(function cardTilt() {
  const cards = document.querySelectorAll(".neon-card");
  if (!cards) return;
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2, cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * 8;
      const rotateY = ((x - cx) / cx) * -8;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });
    card.addEventListener("mouseleave", () => { card.style.transform = ''; });
  });
})();

window.SCRIPT_URL = window.SCRIPT_URL || "https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec";

(function contactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  const responseMsg = document.getElementById("responseMessage");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    responseMsg.style.color = '';
    responseMsg.textContent = "Sending...";
    const fd = new FormData(form);

  
    if (!fd.get('name') || !fd.get('email') || !fd.get('message')) {
      responseMsg.textContent = "Please fill all fields.";
      responseMsg.style.color = "#ff6666";
      return;
    }

    try {
      const res = await fetch(window.SCRIPT_URL, { method: 'POST', body: fd, mode: 'cors' });
     
      let data;
      try { data = await res.json(); } catch (err) { data = { result: 'success' }; }
      if (res.ok && data.result === 'success') {
        responseMsg.style.color = "#00ff95";
        responseMsg.textContent = "Message sent. Thanks!";
        form.reset();
      } else {
        throw new Error('non-success');
      }
    } catch (err) {
      console.error(err);
      responseMsg.style.color = "#ff6666";
      responseMsg.innerHTML = 'Could not send. Try email at <a href="mailto:souravmaji852006@gmail.com">souravmaji852006@gmail.com</a>';
    }
  });
})();


(function neonDoorController() {
  const door = document.getElementById('neonDoor');
  const content = document.querySelector('main') || document.querySelector('.page') || document.body;
  if (!door) {
    if (content) content.classList.add('main-reveal', 'revealed'); // fallback
    return;
  }

  content.classList.add('main-reveal');
  function openDoor(playCallback) {
    door.classList.remove('hidden');
    requestAnimationFrame(() => {
      door.classList.add('open');
      const totalDuration = 1100 + 300; 
      setTimeout(() => {
        content.classList.add('revealed');
        setTimeout(() => {
          door.classList.add('hidden');
        }, 300);
        if (typeof playCallback === 'function') playCallback();
      }, totalDuration);
    });
  }

  function resetDoor() {
    door.classList.remove('open', 'hidden');
    content.classList.remove('revealed');
    requestAnimationFrame(() => {
    });
  }

  window.openNeonDoor = openDoor;
  window.resetNeonDoor = resetDoor;

  document.addEventListener('DOMContentLoaded', () => {
  
    setTimeout(() => {
   
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        content.classList.add('revealed');
        door.classList.add('hidden');
      } else {
        openDoor();
      }
    }, 600);
  });


  const trigger = document.getElementById('triggerDoor');
  if (trigger) trigger.addEventListener('click', () => {
    if (door.classList.contains('hidden')) {
      resetDoor();
      setTimeout(() => openDoor(), 80);
    } else {
      openDoor();
    }
  });
})();


(function sidebarMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('siteSidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const closeBtn = document.getElementById('closeSidebar');

  if (!sidebar || !menuToggle) return;

  function openSidebar() {
    sidebar.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    overlay.hidden = false;
    overlay.style.display = 'block';
 
    sidebar.focus();
  }
  function closeSidebar() {
    sidebar.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    overlay.hidden = true;
    overlay.style.display = '';
    menuToggle.focus();
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = sidebar.getAttribute('aria-hidden') === 'false';
    if (isOpen) closeSidebar(); else openSidebar();
  });
  closeBtn && closeBtn.addEventListener('click', closeSidebar);
  overlay && overlay.addEventListener('click', closeSidebar);

  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.getAttribute('aria-hidden') === 'false') {
      closeSidebar();
    }
  });


  const collBtns = sidebar.querySelectorAll('.collapsible-btn');
  collBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      const panel = btn.nextElementSibling;
      if (!panel) return;
      if (open) {
        panel.hidden = true;
      } else {
        panel.hidden = false;
      }
    });
  });

  
  sidebar.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    setTimeout(() => closeSidebar(), 120);
  });


  (function setActiveFromPath() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const links = sidebar.querySelectorAll('a, .desktop-only a');
    links.forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href.endsWith(path) || (href === './' && path === 'index.html')) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  })();

})();



(function preciseWelcomeFast(){
  const el = document.querySelector('.glitch.welcome');
  if (!el) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.style.transform = 'none';
    return;
  }

  const ONE_WAY_MS = 1500; 
  let rafId = null;
  let startTime = null;
  let direction = 1; 
  let moveDistance = 0;

  function calcDistance() {
    const rect = el.getBoundingClientRect();
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    moveDistance = Math.max(0, vw - rect.width);
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const t = Math.min(1, elapsed / ONE_WAY_MS);
    const eased = 0.5 - 0.5 * Math.cos(Math.PI * t);
    const x = direction === 1 ? eased * moveDistance : (1 - eased) * moveDistance;
    el.style.setProperty('--xp', x + 'px');

    if (t >= 1) {
      direction *= -1;
      startTime = null;
      rafId = requestAnimationFrame(step);
    } else {
      rafId = requestAnimationFrame(step);
    }
  }
  function startLoop() {
    cancelAnimationFrame(rafId);
    startTime = null;
    rafId = requestAnimationFrame(step);
  }
  function init() {
    calcDistance();
    el.style.setProperty('--xp', '0px');
    direction = 1;
    startLoop();
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(init).catch(init);
  } else {
    window.addEventListener('load', init);
    setTimeout(init, 120); // fallback
  }
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      calcDistance();
      startLoop();
    }, 120);
  });
  window.addEventListener('beforeunload', () => cancelAnimationFrame(rafId));
})();

