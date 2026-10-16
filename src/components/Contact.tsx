import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Send,
  LockKeyhole,
  MessageSquare,
  ChevronDown,
  CheckCircle2,
  Globe,
  UserRound,
} from "lucide-react";

import "./Contact.css";

const contactDetails = [
  {
    title: "Email",
    value: "milad@example.com",
    icon: Mail,
    href: "mailto:milad@example.com",
  },
  {
    title: "Phone",
    value: "+98 912 345 6789",
    icon: Phone,
    href: "tel:+989123456789",
  },
  {
    title: "Location",
    value: "Tehran, Iran",
    icon: MapPin,
    href: "https://maps.google.com/?q=Tehran,Iran",
  },
  {
    title: "Available For",
    value: "Freelance & Full-time",
    icon: CalendarDays,
    available: true,
  },
];

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/",
    label: "GH",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/",
    label: "in",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/",
    label: "X",
  },
  {
    name: "Dribbble",
    href: "https://dribbble.com/",
    label: "◎",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    label: "IG",
  },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Project Inquiry");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const recipient = "milad@example.com";

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      message,
    ].join("\n");

    const mailto = new URL(`mailto:${recipient}`);

    mailto.searchParams.set("subject", subject);
    mailto.searchParams.set("body", body);

    setStatus("Opening your email application...");

    window.location.href = mailto.toString();
  }

  return (
    <section className="contact-section" id="contact">
      <div className="contact-bg-glow contact-bg-glow-left" />
      <div className="contact-bg-glow contact-bg-glow-right" />

      <div className="contact-container">
        <div className="contact-layout">
          <div className="contact-info">
            <div className="contact-eyebrow">
              <span />
              GET IN TOUCH
            </div>

            <h2 className="contact-heading">
              Let’s Build
              <br />
              Something{" "}
              <span className="contact-gradient">
                Amazing.
              </span>
            </h2>

            <p className="contact-description">
              Have a project in mind or just want to say hello?
              <br className="desktop-break" />
              I’d love to hear from you. Let’s turn your ideas into
              reality.
            </p>

            <div className="contact-details">
              {contactDetails.map((item) => {
                const Icon = item.icon;

                const content = (
                  <>
                    <span className="contact-detail-icon">
                      <Icon size={21} />
                    </span>

                    <span className="contact-detail-copy">
                      <strong>{item.title}</strong>
                      <span>{item.value}</span>
                    </span>

                    {item.available ? (
                      <span
                        className="availability-indicator"
                        aria-label="Available"
                      >
                        <span />
                      </span>
                    ) : (
                      <ExternalLink
                        className="contact-detail-external"
                        size={16}
                      />
                    )}
                  </>
                );

                if (item.href) {
                  return (
                    <a
                      key={item.title}
                      className="contact-detail-card"
                      href={item.href}
                      target={
                        item.href.startsWith("https://")
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        item.href.startsWith("https://")
                          ? "noreferrer"
                          : undefined
                      }
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <div
                    key={item.title}
                    className="contact-detail-card"
                  >
                    {content}
                  </div>
                );
              })}
            </div>

            <div className="contact-socials">
  {socialLinks.map((social) => (
    <a
      key={social.name}
      className="contact-social-link"
      href={social.href}
      target="_blank"
      rel="noreferrer"
      aria-label={social.name}
      title={social.name}
    >
      <span className="contact-social-label">
        {social.label}
      </span>
    </a>
  ))}
</div>
          </div>

          <div className="contact-form-card">
            <div className="contact-form-heading">
              <h3>Send Me a Message</h3>

              <p>
                Fill out the form below and I’ll get back to you
                as soon as possible.
              </p>
            </div>

            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >
              <div className="contact-fields-row">
                <label className="contact-field">
                  <span>Your Name</span>

                  <div className="contact-input-wrap">
                    <UserRound size={19} />

                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      autoComplete="name"
                      value={name}
                      onChange={(event) =>
                        setName(event.target.value)
                      }
                      required
                    />
                  </div>
                </label>

                <label className="contact-field">
                  <span>Your Email</span>

                  <div className="contact-input-wrap">
                    <Mail size={19} />

                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      autoComplete="email"
                      value={email}
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                      required
                    />
                  </div>
                </label>
              </div>

              <label className="contact-field">
                <span>Subject</span>

                <div className="contact-input-wrap contact-select-wrap">
                  <MessageSquare size={19} />

                  <select
                    name="subject"
                    value={subject}
                    onChange={(event) =>
                      setSubject(event.target.value)
                    }
                  >
                    <option value="Project Inquiry">
                      Project Inquiry
                    </option>

                    <option value="Freelance Opportunity">
                      Freelance Opportunity
                    </option>

                    <option value="Full-time Opportunity">
                      Full-time Opportunity
                    </option>

                    <option value="General Question">
                      General Question
                    </option>
                  </select>

                  <ChevronDown
                    className="contact-select-chevron"
                    size={17}
                  />
                </div>
              </label>

              <label className="contact-field">
                <span>Your Message</span>

                <div className="contact-input-wrap contact-message-wrap">
                  <MessageSquare size={19} />

                  <textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    value={message}
                    onChange={(event) =>
                      setMessage(event.target.value)
                    }
                    required
                    rows={4}
                  />
                </div>
              </label>

              <button
                className="contact-submit-button"
                type="submit"
              >
                <Send size={17} />
                <span>Send Message</span>
                <ArrowRight size={17} />
              </button>

              {status && (
                <p className="contact-status" role="status">
                  <CheckCircle2 size={16} />
                  {status}
                </p>
              )}

              <div className="contact-privacy">
                <LockKeyhole size={13} />

                <span>
                  Your information is safe with me. I’ll never
                  share it with anyone.
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}