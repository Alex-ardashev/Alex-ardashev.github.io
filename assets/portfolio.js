function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function externalLink(url, text) {
  const link = element("a", "", text);
  link.href = url;
  if (new URL(url, location.href).origin !== location.origin) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
  return link;
}

async function loadPortfolio() {
  const response = await fetch("config.json", { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to load portfolio");
  const config = await response.json();
  document.getElementById("name").textContent = config.personal.name;
  document.getElementById("title").textContent = config.personal.title;
  const projects = document.createDocumentFragment();
  const tabs = element("div", "project-tabs");
  tabs.setAttribute("role", "tablist");
  tabs.setAttribute("aria-label", "Projects");
  projects.append(tabs);
  const panels = [];
  function selectTab(index) {
    panels.forEach(({ tab, section }, position) => {
      const selected = position === index;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      section.hidden = !selected;
    });
  }
  config.projectGroups.forEach((group, index) => {
    const tab = element("button", "project-tab", group.title);
    tab.type = "button";
    tab.id = `${group.id}-tab`;
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", group.id);
    tab.addEventListener("click", () => selectTab(index));
    tab.addEventListener("keydown", (event) => {
      const last = panels.length - 1;
      const next = {
        ArrowRight: (index + 1) % panels.length,
        ArrowLeft: (index + last) % panels.length,
        Home: 0,
        End: last,
      }[event.key];
      if (next === undefined) return;
      event.preventDefault();
      selectTab(next);
      panels[next].tab.focus();
    });
    tabs.append(tab);
    const section = element("section", "project-group");
    section.id = group.id;
    section.setAttribute("role", "tabpanel");
    section.setAttribute("aria-labelledby", tab.id);
    section.tabIndex = 0;
    panels.push({ tab, section });
    group.projects.forEach((project) => {
      const card = element("article", "project-card");
      const heading = element("h3");
      if (project.url) {
        heading.append(externalLink(project.url, project.title));
      } else {
        heading.textContent = project.title;
      }
      card.append(heading, element("p", "", project.description));
      const meta = element("div", "project-meta");
      if (project.status) meta.append(element("span", "status", project.status));
      card.append(meta);
      section.append(card);
    });
    projects.append(section);
  });
  selectTab(0);
  document.getElementById("projects").replaceChildren(projects);
  const experience = document.getElementById("experience");
  config.experience.forEach((item) => {
    const row = element("li");
    const comma = item.lastIndexOf(",");
    row.append(element("span", "", comma < 0 ? item : item.slice(0, comma)));
    if (comma >= 0)
      row.append(
        element("span", "experience-place", item.slice(comma + 1).trim()),
      );
    experience.append(row);
  });
  document.getElementById("education").textContent = config.education || "";
  document
    .getElementById("social-links")
    .replaceChildren(
      ...config.social.map((social) =>
        externalLink(social.url, social.name),
      ),
    );
}

loadPortfolio().catch((error) => {
  console.error(error);
  const message = element("p", "muted", "Projects couldn’t load. ");
  const retry = element("a", "", "Try again.");
  retry.href = location.href;
  message.append(retry);
  document.getElementById("projects").replaceChildren(message);
});
