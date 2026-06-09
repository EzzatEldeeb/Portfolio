if (window.matchMedia("(pointer:fine)").matches) {
  const cur = document.getElementById("cur"),
    ring = document.getElementById("cur-r");
  let mx = 0,
    my = 0,
    rx = 0,
    ry = 0;
  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
  });
  (function tick() {
    cur.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(tick);
  })();
}

// Nav
window.addEventListener("scroll", () => {
  document.getElementById("nav").classList.toggle("scrolled", scrollY > 50);
});

// Reveal
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        if (
          e.target.id === "skills-sec" ||
          e.target.classList.contains("skills-wrap")
        )
          animSkills();
      }
    });
  },
  { threshold: 0.15 },
);
document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

// Skills
let done = false;
function animSkills() {
  if (done) return;
  done = true;
  document
    .querySelectorAll(".sk-fill")
    .forEach((b) => (b.style.width = b.dataset.w + "%"));
}
const so = new IntersectionObserver(
  (e) => {
    if (e[0].isIntersecting) animSkills();
  },
  { threshold: 0.3 },
);
const ss = document.getElementById("skills-sec");
if (ss) so.observe(ss);

// Form
async function handleForm(e) {
  e.preventDefault();
  const btn = document.getElementById("fsub");
  const n = document.getElementById("fn").value.trim();
  const em = document.getElementById("fe").value.trim();
  const m = document.getElementById("fm").value.trim();
  if (!n || !em || !m) {
    btn.textContent = "⚠ Fill all fields";
    setTimeout(() => (btn.textContent = "Send Message →"), 2000);
    return;
  }
  btn.textContent = "Sending...";
  try {
    const res = await fetch("https://formspree.io/f/xwvjbpzw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name: n, email: em, message: m }),
    });
    if (res.ok) {
      btn.textContent = "✓ Sent!";
      btn.style.background = "var(--accent2)";
      document.getElementById("fn").value = "";
      document.getElementById("fe").value = "";
      document.getElementById("fm").value = "";
      setTimeout(() => {
        btn.textContent = "Send Message →";
        btn.style.background = "var(--accent)";
      }, 3000);
    } else {
      btn.textContent = "⚠ Try again";
      setTimeout(() => (btn.textContent = "Send Message →"), 2000);
    }
  } catch (err) {
    btn.textContent = "⚠ Network error";
    setTimeout(() => (btn.textContent = "Send Message →"), 2000);
  }
}
