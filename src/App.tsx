import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Play,
  Globe,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

import HeroScene from "./components/HeroScene";
import "./index.css";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

type SectionId = "home" | "about" | "projects" | "contact";
type Language = "EN" | "DE" | "FR";

const sections: SectionId[] = [
  "home",
  "about",
  "projects",
  "contact",
];

const translations = {
  EN: {
    home: "Home",
    about: "About",
    projects: "Projects",
    contact: "Contact",
    talk: "Let's Talk",
    eyebrow: "WEB DEVELOPER",
    title: ["Crafting Digital", "Products That", "Make an Impact."],
    description:
      "I design and develop modern, high-performance web applications with a focus on clean design, great user experience, and real business value.",
    work: "View My Work",
    intro: "Watch Intro",
    duration: "30 seconds",
    years: "Years of Experience",
    completed: "Projects Completed",
    clients: "Happy Clients",
    trusted: "TRUSTED BY",
    scroll: "Scroll Down",
    aboutEyebrow: "A LITTLE ABOUT ME",
    aboutTitle: ["Building", "Digital Experiences."],
    aboutDescription:
      "I'm Milad, a web developer focused on thoughtful design, clean code, and digital experiences that make a difference.",
    projectsEyebrow: "SELECTED WORK",
    projectsTitle: ["Ideas Into", "Real Products."],
    projectsDescription:
      "I build modern websites and web applications that combine performance, usability, and memorable visual design.",
    contactEyebrow: "HAVE A PROJECT IN MIND?",
    contactTitle: ["Let's Build", "Something Great."],
    contactDescription:
      "Have an idea or a project in mind? Let's talk about how we can bring it to life.",
    email: "Start a Conversation",
  },

  DE: {
    home: "Start",
    about: "Über mich",
    projects: "Projekte",
    contact: "Kontakt",
    talk: "Kontakt",
    eyebrow: "WEBENTWICKLER",
    title: ["Digitale Ideen", "Mit Design", "Zum Leben."],
    description:
      "Ich entwickle moderne Webanwendungen mit klarem Design, hoher Leistung und einem starken Nutzererlebnis.",
    work: "Projekte ansehen",
    intro: "Intro ansehen",
    duration: "30 Sekunden",
    years: "Jahre Erfahrung",
    completed: "Abgeschlossene Projekte",
    clients: "Zufriedene Kunden",
    trusted: "TECHNOLOGIEN",
    scroll: "Weiter",
    aboutEyebrow: "ÜBER MICH",
    aboutTitle: ["Digitale", "Erlebnisse schaffen."],
    aboutDescription:
      "Ich bin Milad und entwickle digitale Erlebnisse mit Fokus auf Design, sauberen Code und Benutzerfreundlichkeit.",
    projectsEyebrow: "AUSGEWÄHLTE ARBEITEN",
    projectsTitle: ["Ideen werden", "Produkte."],
    projectsDescription:
      "Ich entwickle moderne Websites und Webanwendungen mit Fokus auf Performance und Design.",
    contactEyebrow: "EIN PROJEKT GEPLANT?",
    contactTitle: ["Lass uns etwas", "Großartiges bauen."],
    contactDescription:
      "Du hast eine Idee? Lass uns gemeinsam darüber sprechen.",
    email: "Kontakt aufnehmen",
  },

  FR: {
    home: "Accueil",
    about: "À propos",
    projects: "Projets",
    contact: "Contact",
    talk: "Me contacter",
    eyebrow: "DÉVELOPPEUR WEB",
    title: ["Créer des", "Produits Web", "Qui Inspirent."],
    description:
      "Je crée des applications web modernes, performantes et élégantes avec une attention particulière à l'expérience utilisateur.",
    work: "Voir mes projets",
    intro: "Voir l'intro",
    duration: "30 secondes",
    years: "Années d'expérience",
    completed: "Projets réalisés",
    clients: "Clients satisfaits",
    trusted: "TECHNOLOGIES",
    scroll: "Défiler",
    aboutEyebrow: "À PROPOS DE MOI",
    aboutTitle: ["Créer des", "Expériences Digitales."],
    aboutDescription:
      "Je suis Milad, développeur web passionné par le design, le code propre et les expériences numériques utiles.",
    projectsEyebrow: "PROJETS SÉLECTIONNÉS",
    projectsTitle: ["Des idées aux", "Produits concrets."],
    projectsDescription:
      "Je conçois des sites web modernes qui allient performance, simplicité et design.",
    contactEyebrow: "UN PROJET EN TÊTE ?",
    contactTitle: ["Créons quelque", "Chose d'exceptionnel."],
    contactDescription:
      "Parlons de votre idée et voyons comment lui donner vie.",
    email: "Démarrer une conversation",
  },
};

export default function App() {
 const [active, setActive] = useState<SectionId>("home");
const [language, setLanguage] = useState<Language>("EN");
const [languageOpen, setLanguageOpen] = useState(false);
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = translations[language];

  useEffect(() => {
    const elements = sections
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio,
          )[0];

        if (visible) {
          setActive(visible.target.id as SectionId);
        }
      },
      {
        threshold: [0.25, 0.5, 0.7],
        rootMargin: "-10% 0px -10% 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  function goTo(id: SectionId) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  setActive(id);
  setMobileMenuOpen(false);
  setLanguageOpen(false);
  window.history.replaceState(null, "", `#${id}`);
}

  return (
    <main className="portfolio">
      <div className="background-photo" aria-hidden="true" />
      <div className="background-shade" aria-hidden="true" />

      <header className="navbar">
        <a
          href="#home"
          className="logo"
          onClick={(event) => {
            event.preventDefault();
            goTo("home");
          }}
        >
          M<span>.</span>
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          {sections.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "nav-link active" : "nav-link"}
              onClick={(event) => {
                event.preventDefault();
                goTo(id);
              }}
            >
              {t[id]}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className={`mobile-menu-toggle ${mobileMenuOpen ? "is-open" : ""}`}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileMenuOpen((open) => !open)}
          >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className="nav-actions">
          <div className="language-wrap">
            <button
              className="control language-control"
              onClick={() => setLanguageOpen((value) => !value)}
              aria-expanded={languageOpen}
            >
              <Globe size={14} />
              {language}
              <ChevronDown size={13} />
            </button>

            {languageOpen && (
              <div className="language-menu">
                {(["EN", "DE", "FR"] as Language[]).map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setLanguage(item);
                      setLanguageOpen(false);
                    }}
                  >
                    {item}
                    <span>
                      {item === "EN"
                        ? "English"
                        : item === "DE"
                          ? "Deutsch"
                          : "Français"}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          

          <a className="talk-button" href="mailto:hello@example.com">
            {t.talk}
            <ArrowRight size={14} />
          </a>
        </div>
      </header>

      {mobileMenuOpen && (
  <nav
    id="mobile-navigation"
    className="mobile-navigation"
    aria-label="Mobile navigation"
  >
    {sections.map((id, index) => (
      <button
        key={id}
        type="button"
        className={active === id ? "mobile-nav-link active" : "mobile-nav-link"}
        onClick={() => goTo(id)}
      >
        <span className="mobile-nav-number">
          {String(index + 1).padStart(2, "0")}
        </span>

        <span>{t[id]}</span>

        <ArrowRight size={16} />
      </button>
    ))}

    <a
      className="mobile-contact-button"
      href="mailto:hello@example.com"
      onClick={() => setMobileMenuOpen(false)}
    >
      {t.talk}
      <ArrowRight size={16} />
    </a>
  </nav>
)}

      <aside className="section-rail" aria-label="Section navigation">
        <div className="rail-numbers">
          {sections.map((id, index) => (
            <button
              key={id}
              className={active === id ? "rail-number active" : "rail-number"}
              onClick={() => goTo(id)}
              aria-label={`Go to ${id}`}
              aria-current={active === id ? "step" : undefined}
            >
              {String(index + 1).padStart(2, "0")}
            </button>
          ))}
        </div>

        <button
          className="rail-scroll"
          onClick={() => {
            const index = sections.indexOf(active);
            goTo(sections[(index + 1) % sections.length]);
          }}
          aria-label="Go to next section"
        >
          <span>
            <ArrowDown size={14} />
          </span>

          <small>{t.scroll}</small>
        </button>
      </aside>

      <div className="sections">
        <section className="page-section home-section" id="home">
          <div className="section-inner">
            <div className="hero-light left-light" />
            <div className="hero-light right-light" />
            <div className="hero-glow" />

            {/* Three-dimensional spheres only; no ring */}
            <HeroScene />

            <div className="hero-copy">
              <div className="eyebrow">
                <span />
                {t.eyebrow}
              </div>

              <h1>
                <span>{t.title[0]}</span>
                <span>{t.title[1]}</span>
                <span className="gradient-text">{t.title[2]}</span>
              </h1>

              <p className="description">{t.description}</p>

              <div className="hero-buttons">
                <button
                  className="primary-button"
                  onClick={() => goTo("projects")}
                >
                  {t.work}
                  <ArrowRight size={17} />
                </button>

                <button
                  className="intro-button"
                  onClick={() => {
                    window.dispatchEvent(new Event("portfolio:intro"));
                  }}
                >
                  <span className="play-circle">
                    <Play size={16} />
                  </span>

                  <span className="intro-copy">
                    <strong>{t.intro}</strong>
                    <small>{t.duration}</small>
                  </span>
                </button>
              </div>

              <div className="stats">
                <div className="stat">
                  <strong>3+</strong>
                  <span>{t.years}</span>
                </div>

                <div className="stat">
                  <strong>20+</strong>
                  <span>{t.completed}</span>
                </div>

                <div className="stat">
                  <strong>10+</strong>
                  <span>{t.clients}</span>
                </div>
              </div>

              <div className="trusted">
                <span className="trusted-label">{t.trusted}</span>

                <div className="tech-list">
                  <span className="tech-item"><b>⚛</b> React</span>
                  <span className="tech-item"><b className="next-mark">N</b> Next.js</span>
                  <span className="tech-item"><b>≋</b> Tailwind CSS</span>
                  <span className="tech-item"><b>◉</b> Figma</span>
                  <span className="tech-item"><b>◉</b> GitHub</span>
                </div>
              </div>
            </div>

            <div className="portrait-label">
              <span>MILAD</span>
              <p>
                Frontend Developer
                <br />
                UI/UX Enthusiast
              </p>
            </div>
          </div>
        </section>

        <About />

        <Projects />

        <Contact />
      </div>
    </main>
  );
}