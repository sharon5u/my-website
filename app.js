const data = {
  about: {
    text: "Beyond economics and statistics, I enjoy music, film production, theatre, basketball, volleyball, hiking, snowboarding, and creative projects that bring people together. This space is where I can show a more personal side of my work and interests.",
    hobbies: [
      { caption: "Cello and orchestra", image: "" },
      { caption: "Film, theatre, and storytelling", image: "" },
      { caption: "Sports, hiking, and snowboarding", image: "" }
    ]
  },
  experience: [
    {
      title: "Intern",
      org: "Software AI Company",
      meta: "Shanghai, China | Dec 2023 - Jan 2024",
      details: "Conducted success-rate analysis on a web development system. Collaborated with senior engineers to develop an AI-powered information import program and presented data-driven insights to support decision-making."
    },
    {
      title: "Harvard Summer School",
      org: "Money and Power",
      meta: "Boston, MA | Jun 2024 - Jul 2024",
      details: "Completed the course with an A+. Produced three research papers on trade, money, market structure, hierarchy, and culture."
    }
  ],
  projects: [
    {
      title: "Crowe National Case Competition",
      org: "Supply Chain Strategy",
      meta: "Apr 2026",
      details: "Led a team of four to diagnose supply chain over-concentration for a sustainable clothing brand. Proposed diversified sourcing that reduced per-unit cost by $0.95, recommended a new pricing strategy, and developed a three-phase operations model cutting lead times by about 50%."
    },
    {
      title: "Consumer Behavior and Market Trends",
      org: "Research Project",
      meta: "2024 - 2025",
      details: "Analyzed consumer cognitive biases in marketing strategies, applied statistical hypothesis testing to predict market trends, and built a prediction model to forecast revenue impact across behavioral scenarios."
    },
    {
      title: "Taxation on Demerit Goods",
      org: "Policy Analysis",
      meta: "Research Project",
      details: "Evaluated fiscal impacts and limitations of demerit goods taxation in developing countries. Analyzed effects of regulatory tax policy on cash flows and industry profitability using data analysis and policy evaluation."
    }
  ],
  leadership: [
    {
      title: "Founder and Executive Member",
      org: "Economics and Society Club",
      meta: "Aug 2024 - May 2025",
      details: "Led a team to the National Economics Challenge national round through structured case-solving training. Organized case competitions, market simulations, weekly stock analysis roundtables, and finance industry guest speaker events."
    },
    {
      title: "Executive Member",
      org: "Empowerment of Self-Esteem and Education",
      meta: "Aug 2022 - May 2025",
      details: "Led a team of 50 club members providing weekly English tutoring for 80 elementary students from low-income migrant families."
    },
    {
      title: "Arts and Athletics",
      org: "School and Community",
      meta: "Ongoing",
      details: "CMU AUO Orchestra cellist. Experience in film production and theatre. Junior Varsity Basketball captain, plus volleyball, hiking, and snowboarding."
    }
  ],
  skills: [
    "Python",
    "Statistical hypothesis testing",
    "Economic research",
    "Market analysis",
    "Microsoft Office",
    "Film editing",
    "Native English",
    "Native Mandarin",
    "Intermediate French",
    "Teamwork",
    "Problem solving",
    "Communication"
  ]
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderCards(section, targetId) {
  const target = document.querySelector(targetId);
  target.innerHTML = data[section].map(item => `
    <article class="card">
      <div class="card-top">
        <h3>${escapeHtml(item.title)}</h3>
        <span class="card-meta">${escapeHtml(item.meta)}</span>
      </div>
      <div class="card-org">${escapeHtml(item.org)}</div>
      <p>${escapeHtml(item.details)}</p>
    </article>
  `).join("");
}

function renderSkills() {
  const target = document.querySelector("#skillsList");
  target.innerHTML = data.skills.map(skill => `<span class="tag">${escapeHtml(skill)}</span>`).join("");
}

function renderAbout() {
  document.querySelector("#aboutText").textContent = data.about.text;
  document.querySelector("#hobbyGallery").innerHTML = data.about.hobbies.map(hobby => {
    const media = hobby.image
      ? `<img src="${hobby.image}" alt="${escapeHtml(hobby.caption || "Hobby photo")}">`
      : `<div class="hobby-placeholder" aria-hidden="true">${escapeHtml(hobby.caption.slice(0, 1) || "H")}</div>`;
    return `
      <figure class="hobby-card">
        ${media}
        <figcaption>${escapeHtml(hobby.caption || "Untitled hobby")}</figcaption>
      </figure>
    `;
  }).join("");
}

renderAbout();
renderCards("experience", "#experienceList");
renderCards("projects", "#projectsList");
renderCards("leadership", "#leadershipList");
renderSkills();
