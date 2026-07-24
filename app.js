const STORAGE_KEY = "sharon-portfolio-content-v1";

const defaultData = {
  text: {
    heroEyebrow: "Economics + Statistics student at Carnegie Mellon University",
    heroName: "Sharon Wu",
    heroIntro: "I am interested in economic research, data analysis, market strategy, and technology that turns messy information into useful decisions.",
    profileSchoolLabel: "School",
    profileSchool: "Carnegie Mellon University",
    profileMajorLabel: "Major",
    profileMajor: "Economics and Statistics",
    profileGraduationLabel: "Graduation",
    profileGraduation: "May 2029",
    profileLocationLabel: "Location",
    profileLocation: "Pittsburgh, PA",
    portraitInitials: "SW",
    aboutKicker: "About Me",
    aboutHeading: "Outside the resume.",
    educationKicker: "Education",
    educationHeading: "Building a quantitative foundation.",
    cmuTitle: "Carnegie Mellon University",
    cmuDates: "Aug 2025 - May 2029",
    cmuSummary: "B.S. in Economics and Statistics. Fall 2025 Dean's List.",
    cmuCoursework: "Relevant coursework: microeconomics, macroeconomics, multivariate analysis, computing, concepts of mathematics, programming, and computer science.",
    isbTitle: "International School of Beijing",
    isbDates: "Aug 2021 - May 2025",
    isbSummary: "International Baccalaureate Diploma.",
    isbCoursework: "Coursework included IB Economics HL, Mathematics HL, Chinese, English, Biology, and Psychology.",
    experienceKicker: "Experience",
    experienceHeading: "Work and applied learning.",
    projectsKicker: "Projects",
    projectsHeading: "Research, strategy, and analysis.",
    leadershipKicker: "Leadership",
    leadershipHeading: "Community, clubs, and collaboration.",
    skillsKicker: "Skills",
    skillsHeading: "Tools and strengths.",
    footerName: "Sharon Wu"
  },
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
  ],
  resume: {
    name: "sharon-wu-resume.pdf",
    href: "./sharon-wu-resume.pdf"
  }
};

let data = loadData();
let activeSection = null;
let activeIndex = -1;
let activeSkillIndex = -1;
let activeHobbyIndex = -1;

const editToggle = document.querySelector("#editToggle");
const editorDialog = document.querySelector("#editorDialog");
const editorForm = document.querySelector("#editorForm");
const dialogTitle = document.querySelector("#dialogTitle");
const itemTitle = document.querySelector("#itemTitle");
const itemOrg = document.querySelector("#itemOrg");
const itemMeta = document.querySelector("#itemMeta");
const itemDetails = document.querySelector("#itemDetails");
const deleteItem = document.querySelector("#deleteItem");
const skillDialog = document.querySelector("#skillDialog");
const skillForm = document.querySelector("#skillForm");
const skillInput = document.querySelector("#skillInput");
const deleteSkill = document.querySelector("#deleteSkill");
const aboutText = document.querySelector("#aboutText");
const hobbyGallery = document.querySelector("#hobbyGallery");
const editAboutButton = document.querySelector("#editAboutButton");
const hobbyImageInput = document.querySelector("#hobbyImageInput");
const aboutDialog = document.querySelector("#aboutDialog");
const aboutForm = document.querySelector("#aboutForm");
const aboutInput = document.querySelector("#aboutInput");
const hobbyDialog = document.querySelector("#hobbyDialog");
const hobbyForm = document.querySelector("#hobbyForm");
const hobbyCaptionInput = document.querySelector("#hobbyCaptionInput");
const deleteHobby = document.querySelector("#deleteHobby");
const resumeLink = document.querySelector("#resumeLink");
const resumeInput = document.querySelector("#resumeInput");

function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return structuredClone(defaultData);
  try {
    const parsed = JSON.parse(saved);
    const merged = { ...structuredClone(defaultData), ...parsed };
    merged.text = { ...structuredClone(defaultData.text), ...(parsed.text || {}) };
    merged.about = { ...structuredClone(defaultData.about), ...(parsed.about || {}) };
    merged.about.hobbies = parsed.about?.hobbies || structuredClone(defaultData.about.hobbies);
    merged.resume = { ...structuredClone(defaultData.resume), ...(parsed.resume || {}) };
    return merged;
  } catch {
    return structuredClone(defaultData);
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

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
  target.innerHTML = data[section].map((item, index) => `
    <article class="card">
      <div class="card-top">
        <h3 data-card-field="title" data-section="${section}" data-index="${index}">${escapeHtml(item.title)}</h3>
        <span class="card-meta" data-card-field="meta" data-section="${section}" data-index="${index}">${escapeHtml(item.meta)}</span>
      </div>
      <div class="card-org" data-card-field="org" data-section="${section}" data-index="${index}">${escapeHtml(item.org)}</div>
      <p data-card-field="details" data-section="${section}" data-index="${index}">${escapeHtml(item.details)}</p>
      <div class="edit-only card-actions">
        <button type="button" data-edit="${section}" data-index="${index}">Edit</button>
      </div>
    </article>
  `).join("");
}

function renderSkills() {
  const target = document.querySelector("#skillsList");
  target.innerHTML = data.skills.map((skill, index) => `
    <span class="tag">
      <span data-skill-label="${index}">${escapeHtml(skill)}</span>
      <button type="button" data-skill-index="${index}" aria-label="Edit ${escapeHtml(skill)}">×</button>
    </span>
  `).join("");
}

function renderStaticText() {
  document.querySelectorAll("[data-text-key]").forEach(element => {
    const key = element.dataset.textKey;
    if (data.text[key] != null) element.textContent = data.text[key];
  });
  document.title = `${data.text.heroName || "Sharon Wu"} | Portfolio`;
}

function renderResume() {
  resumeLink.href = data.resume.href || "./sharon-wu-resume.pdf";
  resumeLink.title = data.resume.name ? `Open ${data.resume.name}` : "Open resume";
  resumeLink.textContent = data.resume.name && data.resume.name !== defaultData.resume.name ? "Resume Updated" : "Resume";
}

function renderAbout() {
  aboutText.textContent = data.about.text;
  hobbyGallery.innerHTML = data.about.hobbies.map((hobby, index) => {
    const media = hobby.image
      ? `<img src="${hobby.image}" alt="${escapeHtml(hobby.caption || "Hobby photo")}">`
      : `<div class="hobby-placeholder" aria-hidden="true">${escapeHtml(hobby.caption.slice(0, 1) || "H")}</div>`;
    return `
      <figure class="hobby-card">
        ${media}
        <figcaption data-hobby-caption="${index}">${escapeHtml(hobby.caption || "Untitled hobby")}</figcaption>
        <div class="edit-only card-actions">
          <button type="button" data-edit-hobby="${index}">Edit</button>
        </div>
      </figure>
    `;
  }).join("");
}

function render() {
  renderStaticText();
  renderResume();
  renderAbout();
  renderCards("experience", "#experienceList");
  renderCards("projects", "#projectsList");
  renderCards("leadership", "#leadershipList");
  renderSkills();
  syncEditableState();
}

function syncEditableState() {
  const isEditing = document.body.classList.contains("editing");
  document.querySelectorAll("[data-text-key], [data-card-field], [data-skill-label], [data-hobby-caption], #aboutText").forEach(element => {
    element.contentEditable = String(isEditing);
    element.spellcheck = isEditing;
  });
}

function openItemDialog(section, index = -1) {
  activeSection = section;
  activeIndex = index;
  const item = index >= 0 ? data[section][index] : { title: "", org: "", meta: "", details: "" };
  dialogTitle.textContent = index >= 0 ? "Edit item" : "Add item";
  itemTitle.value = item.title;
  itemOrg.value = item.org;
  itemMeta.value = item.meta;
  itemDetails.value = item.details;
  deleteItem.hidden = index < 0;
  editorDialog.showModal();
}

function openSkillDialog(index = -1) {
  activeSkillIndex = index;
  skillInput.value = index >= 0 ? data.skills[index] : "";
  deleteSkill.hidden = index < 0;
  skillDialog.showModal();
}

function openHobbyDialog(index) {
  activeHobbyIndex = index;
  hobbyCaptionInput.value = data.about.hobbies[index].caption;
  hobbyDialog.showModal();
}

editToggle.addEventListener("click", () => {
  document.body.classList.toggle("editing");
  const isEditing = document.body.classList.contains("editing");
  editToggle.textContent = isEditing ? "Done" : "Edit";
  syncEditableState();
});

document.addEventListener("input", event => {
  const editableText = event.target.closest("[data-text-key]");
  if (editableText) {
    data.text[editableText.dataset.textKey] = editableText.textContent.trim();
    saveData();
    if (editableText.dataset.textKey === "heroName") {
      document.title = `${data.text.heroName || "Sharon Wu"} | Portfolio`;
    }
  }

  if (event.target === aboutText) {
    data.about.text = aboutText.textContent.trim();
    saveData();
  }

  const cardField = event.target.closest("[data-card-field]");
  if (cardField) {
    const section = cardField.dataset.section;
    const index = Number(cardField.dataset.index);
    const field = cardField.dataset.cardField;
    if (data[section]?.[index]) {
      data[section][index][field] = cardField.textContent.trim();
      saveData();
    }
  }

  const skillLabel = event.target.closest("[data-skill-label]");
  if (skillLabel) {
    const index = Number(skillLabel.dataset.skillLabel);
    if (data.skills[index] != null) {
      data.skills[index] = skillLabel.textContent.trim();
      saveData();
    }
  }

  const hobbyCaption = event.target.closest("[data-hobby-caption]");
  if (hobbyCaption) {
    const index = Number(hobbyCaption.dataset.hobbyCaption);
    if (data.about.hobbies[index]) {
      data.about.hobbies[index].caption = hobbyCaption.textContent.trim();
      saveData();
    }
  }
});

document.addEventListener("click", event => {
  const addButton = event.target.closest("[data-add]");
  if (addButton) openItemDialog(addButton.dataset.add);

  const editButton = event.target.closest("[data-edit]");
  if (editButton) openItemDialog(editButton.dataset.edit, Number(editButton.dataset.index));

  const addSkill = event.target.closest("[data-add-skill]");
  if (addSkill) openSkillDialog();

  const skillButton = event.target.closest("[data-skill-index]");
  if (skillButton) openSkillDialog(Number(skillButton.dataset.skillIndex));

  const hobbyButton = event.target.closest("[data-edit-hobby]");
  if (hobbyButton) openHobbyDialog(Number(hobbyButton.dataset.editHobby));
});

editAboutButton.addEventListener("click", () => {
  aboutInput.value = data.about.text;
  aboutDialog.showModal();
});

hobbyImageInput.addEventListener("change", () => {
  const file = hobbyImageInput.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    data.about.hobbies.push({
      caption: file.name.replace(/\.[^.]+$/, ""),
      image: reader.result
    });
    saveData();
    render();
    hobbyImageInput.value = "";
  });
  reader.readAsDataURL(file);
});

resumeInput.addEventListener("change", () => {
  const file = resumeInput.files?.[0];
  if (!file) return;
  if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
    resumeInput.value = "";
    return;
  }
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    data.resume = {
      name: file.name,
      href: reader.result
    };
    saveData();
    renderResume();
    resumeInput.value = "";
  });
  reader.readAsDataURL(file);
});

editorForm.addEventListener("submit", event => {
  if (event.submitter?.value === "cancel") return;
  event.preventDefault();
  const item = {
    title: itemTitle.value.trim(),
    org: itemOrg.value.trim(),
    meta: itemMeta.value.trim(),
    details: itemDetails.value.trim()
  };
  if (activeIndex >= 0) {
    data[activeSection][activeIndex] = item;
  } else {
    data[activeSection].push(item);
  }
  saveData();
  render();
  editorDialog.close();
});

deleteItem.addEventListener("click", () => {
  if (activeSection && activeIndex >= 0) {
    data[activeSection].splice(activeIndex, 1);
    saveData();
    render();
  }
  editorDialog.close();
});

aboutForm.addEventListener("submit", event => {
  if (event.submitter?.value === "cancel") return;
  event.preventDefault();
  data.about.text = aboutInput.value.trim();
  saveData();
  render();
  aboutDialog.close();
});

hobbyForm.addEventListener("submit", event => {
  if (event.submitter?.value === "cancel") return;
  event.preventDefault();
  if (activeHobbyIndex >= 0) {
    data.about.hobbies[activeHobbyIndex].caption = hobbyCaptionInput.value.trim();
    saveData();
    render();
  }
  hobbyDialog.close();
});

deleteHobby.addEventListener("click", () => {
  if (activeHobbyIndex >= 0) {
    data.about.hobbies.splice(activeHobbyIndex, 1);
    saveData();
    render();
  }
  hobbyDialog.close();
});

skillForm.addEventListener("submit", event => {
  if (event.submitter?.value === "cancel") return;
  event.preventDefault();
  const skill = skillInput.value.trim();
  if (!skill) return;
  if (activeSkillIndex >= 0) {
    data.skills[activeSkillIndex] = skill;
  } else {
    data.skills.push(skill);
  }
  saveData();
  render();
  skillDialog.close();
});

deleteSkill.addEventListener("click", () => {
  if (activeSkillIndex >= 0) {
    data.skills.splice(activeSkillIndex, 1);
    saveData();
    render();
  }
  skillDialog.close();
});

render();
