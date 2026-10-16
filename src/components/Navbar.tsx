import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

export type Language = "en" | "de" | "fr";

interface NavbarProps {
  language: Language;
  setLanguage: (language: Language) => void;
}

const navigation = {
  en: ["Home", "About", "Work", "Contact"],
  de: ["Start", "Über mich", "Projekte", "Kontakt"],
  fr: ["Accueil", "À propos", "Projets", "Contact"],
};

export default function Navbar({
  language,
  setLanguage,
}: NavbarProps) {
  const [open, setOpen] = useState(false);

  const items = navigation[language];
  const ids = ["home", "about", "work", "contact"];

  return (
    <header className="navbar">
      <a href="#home" className="navbar-logo">
        M<span>°</span>
      </a>

      <nav className={open ? "navbar-links open" : "navbar-links"}>
        {items.map((item, index) => (
          <a
            key={ids[index]}
            href={`#${ids[index]}`}
            onClick={() => setOpen(false)}
          >
            {item}
          </a>
        ))}
      </nav>

      <div className="navbar-actions">
        <label className="language-picker">
          <span className="sr-only">Choose language</span>

          <select
            value={language}
            aria-label="Choose language"
            onChange={(event) =>
              setLanguage(event.target.value as Language)
            }
          >
            <option value="en">EN</option>
            <option value="de">DE</option>
            <option value="fr">FR</option>
          </select>
        </label>

        <a href="#contact" className="navbar-contact">
          {language === "de"
            ? "Kontakt"
            : language === "fr"
              ? "Parlons"
              : "Let's talk"}

          <ArrowUpRight size={14} />
        </a>
      </div>

      <button
        type="button"
        className="navbar-menu"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        {open ? <X size={21} /> : <Menu size={21} />}
      </button>
    </header>
  );
}