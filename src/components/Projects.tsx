
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Code2,
  ShoppingBag,
  Smartphone,
  Layers3,
  PanelsTopLeft,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import "./Projects.css";

type Category =
  | "All"
  | "Web Apps"
  | "E-Commerce"
  | "UI/UX"
  | "Other";

type Project = {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  type: Category;
  url?: string;
};

const categories: {
  label: Category;
  icon: typeof Code2;
}[] = [
  { label: "All", icon: Layers3 },
  { label: "Web Apps", icon: Code2 },
  { label: "E-Commerce", icon: ShoppingBag },
  { label: "UI/UX", icon: PanelsTopLeft },
  { label: "Other", icon: BookOpen },
];

const projects: Project[] = [
  {
    id: 1,
    category: "WEB APP",
    title: "Analytics Dashboard",
    description:
      "A modern analytics dashboard for tracking and visualizing data in real-time.",
    image: "/images/projects/analytics-dashboard.png",
    tags: ["React", "Next.js", "Tailwind"],
    type: "Web Apps",
  },
  {
    id: 2,
    category: "E-COMMERCE",
    title: "Modern E-Commerce",
    description:
      "A fully responsive e-commerce platform with a seamless shopping experience.",
    image: "/images/projects/creative-portfolio.png",
    tags: ["Next.js", "Stripe", "Tailwind"],
    type: "E-Commerce",
  },
  {
    id: 3,
    category: "MOBILE APP",
    title: "Travel Explorer",
    description:
      "A mobile application for discovering and exploring amazing destinations.",
    image: "/images/projects/travel-explorer.png",
    tags: ["React Native", "Firebase", "Figma"],
    type: "Other",
  },
  {
    id: 4,
    category: "SAAS",
    title: "Task Management",
    description:
      "A productivity tool to organize tasks, manage teams, and boost performance.",
    image: "/images/projects/task-management.png",
    tags: ["Next.js", "TypeScript", "Prisma"],
    type: "Web Apps",
  },
  {
    id: 5,
    category: "LANDING PAGE",
    title: "Creative Portfolio",
    description:
      "A clean and modern portfolio template for creatives and professionals.",
    image: "/images/projects/creative-portfolio.png",
    tags: ["React", "Framer Motion", "Tailwind"],
    type: "UI/UX",
  },
  {
    id: 6,
    category: "BLOG",
    title: "Minimal Blog",
    description:
      "A minimal and fast blog platform with a focus on clean content.",
    image: "/images/projects/minimal-blog.png",
    tags: ["Next.js", "MDX", "Tailwind"],
    type: "Other",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <a
        className="project-image-link"
        href={project.url || "#contact"}
        aria-label={`View ${project.title}`}
      >
        <img
          className="project-image"
          src={project.image}
          alt={`${project.title} project preview`}
          loading="lazy"
        />

        <div className="project-image-overlay" />

        <span className="project-image-action">
          <ArrowUpRight size={19} />
        </span>
      </a>

      <div className="project-card-body">
        <div className="project-card-top">
          <div className="project-card-copy">
            <span className="project-category">
              {project.category}
            </span>

            <h3>{project.title}</h3>
          </div>

          <a
            className="project-arrow"
            href={project.url || "#contact"}
            aria-label={`Explore ${project.title}`}
          >
            <ArrowRight size={20} />
          </a>
        </div>

        <p className="project-description">
          {project.description}
        </p>

        <div className="project-tags">
          {project.tags.map((tag) => (
            <span className="project-tag" key={tag}>
              <span className="tag-dot" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] =
    useState<Category>("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;

    return projects.filter(
      (project) => project.type === activeCategory,
    );
  }, [activeCategory]);

  return (
    <section className="projects-section" id="projects">
      <div className="projects-background-glow projects-glow-left" />
      <div className="projects-background-glow projects-glow-right" />

      <div className="projects-container">
        <header className="projects-header">
          <div className="projects-heading">
            <div className="projects-eyebrow">
              <span />
              MY WORK
            </div>

            <h2 className="projects-title">
              Featured <span>Projects</span>
            </h2>

            <p className="projects-intro">
              A collection of web applications I've designed and
              developed, combining clean design, modern technologies,
              and real-world solutions.
            </p>
          </div>

          <div
            className="projects-filters"
            role="group"
            aria-label="Filter projects by category"
          >
            {categories.map((category) => {
              const Icon = category.icon;
              const selected =
                activeCategory === category.label;

              return (
                <button
                  key={category.label}
                  type="button"
                  className={
                    selected
                      ? "project-filter active"
                      : "project-filter"
                  }
                  onClick={() =>
                    setActiveCategory(category.label)
                  }
                  aria-pressed={selected}
                >
                  <Icon
                    className="filter-icon"
                    size={14}
                  />
                  {category.label}
                </button>
              );
            })}
          </div>
        </header>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="projects-empty">
            No projects in this category yet.
          </div>
        )}

        <footer className="projects-footer">
          <span>
            SHOWING {String(filteredProjects.length).padStart(2, "0")}{" "}
            PROJECTS
          </span>

          <a href="#contact" className="projects-contact-link">
            Have a project in mind?
            <span>
              Let's talk <ArrowRight size={14} />
            </span>
          </a>
        </footer>
      </div>
    </section>
  );
}