const toggleBtn = document.getElementById("theme-toggle");
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        toggleBtn.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        toggleBtn.textContent = "🌙";
    }
});


const menuBtn = document.getElementById("menu-toggle");
const navLinks = document.querySelector("nav ul");

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    navLinks.classList.toggle("show");
});


navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        menuBtn.classList.remove("active");
        navLinks.classList.remove("show");
    });
});




const texts = ["Electrical Engineering Student", "Frontend Developer", "Problem Solver"];
const typingText = document.getElementById("typing-text");
let textIndex = 0, charIndex = 0, deleting = false;
function typeEffect() {
    const currentText = texts[textIndex];
    if (!deleting) {
        typingText.textContent = currentText.slice(0, charIndex++);
        if (charIndex > currentText.length) setTimeout(() => deleting = true, 1200);
    } else {
        typingText.textContent = currentText.slice(0, charIndex--);
        if (charIndex < 0) {
            deleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
    }
}
setInterval(typeEffect, 90);


const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add("active"); });
}, { threshold: 0.15 });
reveals.forEach(section => observer.observe(section));


const skillSection = document.querySelector('.skills-grid');
const skillBars = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            skillBars.forEach(bar => {
                const targetWidth = bar.getAttribute('style').match(/width:\s*(\d+)%/)[1];
                bar.style.width = targetWidth + "%";

                
                const percentSpan = bar.querySelector('.skill-percent');
                let current = 0;
                const target = parseInt(targetWidth);
                const increment = target / 50;
                const interval = setInterval(() => {
                    current += increment;
                    if(current >= target){ current = target; clearInterval(interval); }
                    percentSpan.textContent = Math.round(current) + "%";
                }, 20);
            });
            skillObserver.unobserve(skillSection);
        }
    });
}, { threshold: 0.3 });

skillObserver.observe(skillSection);


document.querySelectorAll(".social-btn").forEach(btn => {
    btn.addEventListener("mousemove", e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `
            translate(${x * 0.25}px, ${y * 0.25}px)
            scale(1.15)
        `;
        btn.style.boxShadow = `
            ${-x * 0.15}px ${-y * 0.15}px 20px rgba(0,0,0,0.35)
        `;
    });

    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translate(0,0) scale(1)";
        btn.style.boxShadow = "0 6px 15px rgba(0,0,0,0.3)";
    });
});


