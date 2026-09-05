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
  const response = await fetch("config.json");
  if (!response.ok) throw new Error("Unable to load portfolio");
  const config = await response.json();
  document.getElementById("name").textContent = config.personal.name;
  document.getElementById("title").textContent = config.personal.title;
  const projects = document.createDocumentFragment();
  config.projects.forEach((project) => {
    const card = element("article", "project-card");
    card.append(
      element("h3", "", project.title),
      element("p", "", project.description),
    );
    const meta = element("div", "project-meta");
    if (project.url) {
      const link = externalLink(project.url, "View project ↗");
      link.setAttribute("aria-label", "View " + project.title);
      meta.append(link);
    }
    if (project.status) meta.append(element("span", "status", project.status));
    card.append(meta);
    projects.append(card);
  });
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
        externalLink(social.url, social.name + " ↗"),
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
