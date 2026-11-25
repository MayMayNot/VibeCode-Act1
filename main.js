const $ = (s, r = document) => r.querySelector(s);
const PAGES = [
  ["index.html", "dashboard", "🏠", "Dashboard"], ["schedule.html", "schedule", "📅", "Class schedule"],
  ["grades.html", "grades", "📊", "Grades"], ["announcements.html", "announcements", "📢", "Announcements"],
  ["profile.html", "profile", "👤", "Profile"]
];
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const POINTS = { "A": 4, "A-": 3.7, "B+": 3.3, "B": 3, "B-": 2.7, "C+": 2.3, "C": 2, "C-": 1.7, "D": 1, "F": 0 };
const letter = s => s >= 93 ? "A" : s >= 90 ? "A-" : s >= 87 ? "B+" : s >= 83 ? "B" : s >= 80 ? "B-" : s >= 77 ? "C+" : s >= 73 ? "C" : s >= 70 ? "C-" : s >= 60 ? "D" : "F";
const credits = () => GRADES.reduce((a, g) => a + g.credits, 0);
const gpa = () => GRADES.reduce((a, g) => a + POINTS[letter(g.score)] * g.credits, 0) / credits();
const initials = n => n.split(" ").map(w => w[0]).join("").slice(0, 2);
const fmtTime = t => { const [h, m] = t.split(":").map(Number); return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`; };
const fmtDate = d => new Date(d + "T00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
const todayName = () => ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date().getDay()];
const mins = t => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
const hue = h => `style="--h:${h}"`;

function classCard(c, extra = "") {
  return `<div class="class-card" ${hue(c.hue)}>
    <div class="cc-time">${fmtTime(c.start)} – ${fmtTime(c.end)}</div>
    <strong>${c.course}</strong><span class="muted">${c.code} · ${c.room}</span>
    <span class="muted">${c.teacher}</span>${extra}</div>`;
}

function shell(page) {
  let theme = "light";
  try { theme = localStorage.getItem("theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); } catch (e) {}
  document.documentElement.dataset.theme = theme;
  const title = PAGES.find(p => p[1] === page)[3];
  $("#sidebar").innerHTML = `
    <div class="brand"><span class="logo">N</span><span>Northfield<small>Student Portal</small></span></div>
    <nav>${PAGES.map(p => `<a href="${p[0]}" class="${p[1] === page ? "active" : ""}"><i>${p[2]}</i>${p[3]}</a>`).join("")}</nav>
    <div class="side-foot">${STUDENT.semester}</div>`;
  $("#topbar").innerHTML = `
    <button class="icon-btn menu" aria-label="Open menu">☰</button>
    <h1>${title}</h1>
    <button class="icon-btn" id="theme" aria-label="Toggle dark mode">${theme === "dark" ? "☀️" : "🌙"}</button>
    <a class="avatar" href="profile.html" aria-label="Your profile">${initials(STUDENT.name)}</a>`;
  $("#theme").onclick = () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    $("#theme").textContent = next === "dark" ? "☀️" : "🌙";
    try { localStorage.setItem("theme", next); } catch (e) {}
  };
  const toggle = () => document.body.classList.toggle("nav-open");
  $(".menu").onclick = toggle; $("#scrim").onclick = toggle;
}

const views = {
  dashboard() {
    const today = SCHEDULE.filter(c => c.day === todayName());
    const now = new Date().getHours() * 60 + new Date().getMinutes();
    const first = STUDENT.name.split(" ")[0];
    const hour = new Date().getHours();
    const greet = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
    return `
    <section class="hero">
      <div><h2>${greet}, ${first}</h2>
      <p>${today.length ? `You have ${today.length} class${today.length > 1 ? "es" : ""} today.` : "No classes today. Enjoy the break."} ${ANNOUNCEMENTS.length} announcements are posted this month.</p></div>
      <div class="hero-gpa"><b>${gpa().toFixed(2)}</b><span>Current GPA</span></div>
    </section>
    <section class="stats">
      <div class="card stat"><span class="muted">Credits this term</span><b>${credits()}</b></div>
      <div class="card stat"><span class="muted">Courses</span><b>${GRADES.length}</b></div>
      <div class="card stat"><span class="muted">Average score</span><b>${(GRADES.reduce((a, g) => a + g.score, 0) / GRADES.length).toFixed(1)}%</b></div>
      <div class="card stat"><span class="muted">Status</span><b class="ok">${STUDENT.status}</b></div>
    </section>
    <section class="grid-2">
      <div class="card"><div class="card-head"><h3>Today's classes</h3><a href="schedule.html">Full schedule</a></div>
        ${today.length ? today.map(c => classCard(c, now >= mins(c.start) && now <= mins(c.end) ? `<span class="badge live">In progress</span>` : "")).join("") : `<p class="empty">Nothing scheduled. Check the weekly schedule for upcoming classes.</p>`}
      </div>
      <div class="card"><div class="card-head"><h3>Latest announcements</h3><a href="announcements.html">View all</a></div>
        ${ANNOUNCEMENTS.slice(0, 3).map(a => `<div class="mini"><span class="badge">${a.category}</span><strong>${a.title}</strong><span class="muted">${fmtDate(a.date)}</span></div>`).join("")}
      </div>
    </section>
    <section class="card"><div class="card-head"><h3>Grade overview</h3><a href="grades.html">Details</a></div>
      ${GRADES.map(g => `<div class="bar-row" ${hue(g.hue)}><span>${g.course}</span><div class="bar"><i style="width:${g.score}%"></i></div><b>${g.score}%</b></div>`).join("")}
    </section>`;
  },

  schedule() {
    const t = todayName();
    return `<p class="lead">Your weekly timetable. Today is highlighted.</p>
    <section class="week">${DAYS.map(d => `
      <div class="day ${d === t ? "today" : ""}"><h3>${d}${d === t ? ` <span class="badge live">Today</span>` : ""}</h3>
        ${SCHEDULE.filter(c => c.day === d).map(c => classCard(c)).join("") || `<p class="empty">No classes</p>`}
      </div>`).join("")}</section>`;
  },

  grades() {
    return `<section class="stats">
      <div class="card stat"><span class="muted">GPA</span><b>${gpa().toFixed(2)}</b></div>
      <div class="card stat"><span class="muted">Credits</span><b>${credits()}</b></div>
      <div class="card stat"><span class="muted">Highest score</span><b>${Math.max(...GRADES.map(g => g.score))}%</b></div>
    </section>
    <section class="card table-wrap"><table>
      <thead><tr><th>Course</th><th>Credits</th><th>Score</th><th>Grade</th></tr></thead>
      <tbody>${GRADES.map(g => `<tr ${hue(g.hue)}>
        <td><span class="dot"></span><strong>${g.course}</strong><br><span class="muted">${g.code}</span></td>
        <td>${g.credits}</td>
        <td><div class="bar-row inline"><div class="bar"><i style="width:${g.score}%"></i></div><span>${g.score}%</span></div></td>
        <td><span class="badge grade g-${letter(g.score)[0]}">${letter(g.score)}</span></td></tr>`).join("")}
      </tbody></table></section>
    <p class="muted note">GPA is calculated on a 4.0 scale, weighted by credits.</p>`;
  },

  announcements() {
    const cats = ["All", ...new Set(ANNOUNCEMENTS.map(a => a.category))];
    return `<div class="filters">
      <input id="q" type="search" placeholder="Search announcements" aria-label="Search announcements">
      <div class="chips">${cats.map((c, i) => `<button class="chip ${i ? "" : "on"}" data-c="${c}">${c}</button>`).join("")}</div></div>
    <section id="list"></section>`;
  },

  profile() {
    const rows = [["Student ID", STUDENT.id], ["Program", STUDENT.program], ["Year level", STUDENT.year], ["Email", STUDENT.email],
      ["Phone", STUDENT.phone], ["Address", STUDENT.address], ["Birthday", STUDENT.birthday], ["Advisor", `${STUDENT.advisor} (${STUDENT.advisorEmail})`]];
    return `<section class="card profile-head"><div class="avatar big">${initials(STUDENT.name)}</div>
      <div><h2>${STUDENT.name}</h2><p class="muted">${STUDENT.program} · ${STUDENT.year}</p><span class="badge live">${STUDENT.status}</span></div>
      <button class="btn" onclick="window.print()">Print profile</button></section>
    <section class="grid-2">
      <div class="card"><h3>Personal information</h3><dl>${rows.map(r => `<div><dt>${r[0]}</dt><dd>${r[1]}</dd></div>`).join("")}</dl></div>
      <div class="card"><h3>About</h3><p>${STUDENT.bio}</p>
        <h3 class="gap">Academic summary</h3><dl><div><dt>GPA</dt><dd>${gpa().toFixed(2)}</dd></div><div><dt>Credits this term</dt><dd>${credits()}</dd></div><div><dt>Semester</dt><dd>${STUDENT.semester}</dd></div></dl></div>
    </section>`;
  }
};

function initAnnouncements() {
  let cat = "All";
  const draw = () => {
    const q = $("#q").value.toLowerCase();
    const items = ANNOUNCEMENTS.filter(a => (cat === "All" || a.category === cat) && (a.title + a.body).toLowerCase().includes(q));
    $("#list").innerHTML = items.map(a => `<details class="card ann"><summary><span class="badge">${a.category}</span><strong>${a.title}</strong><span class="muted">${fmtDate(a.date)}</span></summary><p>${a.body}</p></details>`).join("")
      || `<p class="empty">No announcements match. Try a different search or category.</p>`;
  };
  $("#q").oninput = draw;
  document.querySelectorAll(".chip").forEach(b => b.onclick = () => {
    document.querySelectorAll(".chip").forEach(x => x.classList.remove("on"));
    b.classList.add("on"); cat = b.dataset.c; draw();
  });
  draw();
}

const page = document.body.dataset.page;
shell(page);
$("#view").innerHTML = views[page]();
if (page === "announcements") initAnnouncements();
