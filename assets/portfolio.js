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
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let activeIndex = -1;
  let transitionId = 0;
  async function selectTab(index) {
    if (index === activeIndex) return;
    const id = ++transitionId;
    const previous = panels.find(({ section }) => !section.hidden)?.section;
    activeIndex = index;
    tabs.style.setProperty("--active-tab", index);
    panels.forEach(({ section }) => section.getAnimations().forEach(animation => animation.cancel()));
    if (previous && !reducedMotion.matches && previous.isConnected) {
      await previous.animate(
        [{ opacity: 1 }, { opacity: 0, transform: "translateY(8px)" }],
        { duration: 140, easing: "ease-out", fill: "forwards" },
      ).finished.catch(() => {});
    }
    if (id !== transitionId) return;
    panels.forEach(({ tab, section }, position) => {
      section.getAnimations().forEach(animation => animation.cancel());
      const selected = position === index;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      section.hidden = !selected;
    });
    const current = panels[index].section;
    if (!reducedMotion.matches && current.isConnected) {
      current.animate(
        [{ opacity: 0, transform: "translateY(16px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 480, easing: "cubic-bezier(.22, 1, .36, 1)" },
      );
    }
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
      const image = element("img", "project-image");
      image.src = project.image;
      image.alt = project.imageAlt;
      image.width = 1200;
      image.height = 800;
      image.loading = "lazy";
      image.decoding = "async";
      const visual = project.url ? externalLink(project.url) : element("div");
      visual.className = "project-visual";
      if (project.url) visual.setAttribute("aria-label", `View ${project.title}`);
      visual.append(image);
      card.append(visual);
      const caption = element("div", "project-caption");
      const heading = element("h3");
      if (project.url) {
        heading.append(externalLink(project.url, project.title));
      } else {
        heading.textContent = project.title;
      }
      const header = element("div", "project-heading");
      header.append(heading);
      if (project.status) header.append(element("span", "status", project.status));
      caption.append(header, element("p", "", project.description));
      card.append(caption);
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
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      reveal.unobserve(target);
      if (reducedMotion.matches) return;
      target.animate(
        [{ opacity: 0, transform: "translateY(24px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 750, easing: "cubic-bezier(.22, 1, .36, 1)" },
      );
    });
  }, { threshold: 0.08 });
  document.querySelectorAll(".profile, .intro, .background, .project-card").forEach(node => reveal.observe(node));
  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) document.getAnimations().forEach(animation => animation.cancel());
  });
}

loadPortfolio().catch((error) => {
  console.error(error);
  const message = element("p", "muted", "Projects couldn’t load. ");
  const retry = element("a", "", "Try again.");
  retry.href = location.href;
  message.append(retry);
  document.getElementById("projects").replaceChildren(message);
});
