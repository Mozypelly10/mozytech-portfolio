"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/lib/projects";

const filters = ["All work", "Web & desktop", "Mobile apps", "Cloud", "Logos & branding", "Flyers", "Automation"];
function discipline(project: Project) {
  if (project.category === "Branding & design") return "Logos & branding";
  if (project.category === "Flyers & social design") return "Flyers";
  if (project.category === "Mobile application") return "Mobile apps";
  if (project.category === "Cloud infrastructure") return "Cloud";
  if (["Automation", "Messaging automation"].includes(project.category || "")) return "Automation";
  return "Web & desktop";
}

export default function ProjectGallery({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All work");
  const visible = projects.filter((project) => filter === "All work" || discipline(project) === filter);
  return <>
    <div className="project-filters" role="group" aria-label="Filter projects">
      {filters.map((label) => <button key={label} type="button" aria-pressed={filter === label} onClick={() => setFilter(label)}>{label}<span>{label === "All work" ? projects.length : projects.filter((project) => discipline(project) === label).length}</span></button>)}
    </div>
    <p className="sr-only" role="status">Showing {visible.length} projects</p>
    <div className="project-grid">
      {visible.map((project) => <article key={project.id} className={`project-card ${project.featured ? "project-featured" : ""}`}>
        <div className={`project-art ${project.category === "Branding & design" ? "art-branding" : ""} ${project.category === "Cloud infrastructure" ? "art-cloud" : ""} ${discipline(project) === "Automation" ? "art-automation" : ""}`}>
          {project.imageUrl ? <Image src={project.imageUrl} alt={project.id === "classbridge" ? "Latest ClassBridge promotional artwork showing its school workspace and features" : project.id === "monthly-greeting-flyers" ? "MOZYTECH Happy New Month October flyer in blue and white" : `${project.title} visual identity collection`} fill sizes="(max-width: 720px) 100vw, 50vw" className={`project-image ${project.category === "Flyers & social design" ? "flyer-preview" : ""}`} /> : <div className="project-graphic" aria-hidden="true">
            <span className="graphic-symbol">{discipline(project) === "Cloud" ? "☁" : project.id === "family-locator" ? "◎" : project.category === "Branding & design" ? "Aa" : project.category === "Flyers & social design" ? "✳" : project.id === "mailer-app" ? "✉" : project.id === "scrapper-tools" ? "{ }" : project.id === "telegram-bot" ? "↗" : "▥"}</span>
            <span className="graphic-title">{project.id === "aws-ecommerce-deployment" ? "Built for the cloud." : project.title}</span>
            <span className="graphic-subtitle">{project.techStack.slice(0, 3).join(" / ")}</span>
          </div>}
          {project.featured && <span className="art-label">Featured work</span>}
        </div>
        <div className="project-content">
          <p className="eyebrow">{project.category || "Project"}</p>
          <h3>{project.title}</h3>
          <p className="project-description">{project.description}</p>
          <div className="tech-tags">{project.techStack.map((tech) => <span key={tech}>{tech}</span>)}</div>
          {project.highlights && <details className="project-details"><summary>Explore the project <span aria-hidden="true">+</span></summary><ul>{project.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
            {project.imageUrl && <a href={project.imageUrl} target="_blank" rel="noopener noreferrer">View full artwork ↗</a>}
          </details>}
          <div className="project-bottom">
            <span className="project-note">{project.note || (project.liveUrl ? "Website available" : project.githubUrl ? "Source available" : "Project showcase")}</span>
            <div className="project-links">
              {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} on GitHub`}>Code ↗</a>}
              {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title}`}>Visit site ↗</a>}
            </div>
          </div>
        </div>
      </article>)}
    </div>
  </>;
}
