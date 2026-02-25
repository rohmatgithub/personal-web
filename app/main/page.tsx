"use client";

import { useEffect, useRef, useState } from "react";

type Theme = "light" | "dark";

type NavItem = { label: string; href: string };
type Service = { icon: string; title: string; desc: string; tags: string[] };
type Project = { title: string; category: string; desc: string; tech: string[]; year: string; overlayClass: string };
type StatItem = { value: string; label: string };

const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

const SERVICES: Service[] = [
  {
    icon: "◈",
    title: "Web Application",
    desc: "Scalable, high-performance web apps built with modern frameworks. From complex SaaS dashboards to customer-facing portals — designed to convert and engineered to scale.",
    tags: ["Next.js", "React", "TypeScript", "Node.js"],
  },
  {
    icon: "◉",
    title: "Desktop Application",
    desc: "Cross-platform desktop solutions that feel native on Windows, macOS, and Linux. Powerful offline capabilities with a polished, intuitive interface.",
    tags: ["Electron", "Tauri", "WPF", ".NET"],
  },
  {
    icon: "◎",
    title: "Mobile Application",
    desc: "Native-quality mobile experiences for iOS and Android. Smooth animations, responsive design, and deep platform integration your users will love.",
    tags: ["React Native", "Flutter", "Expo"],
  },
  {
    icon: "⬡",
    title: "UI/UX Design",
    desc: "Thoughtful design systems and pixel-perfect interfaces that balance beauty with usability. Every interaction is intentional, every detail considered.",
    tags: ["Figma", "Prototyping", "Design System"],
  },
];

const PROJECTS: Project[] = [
  {
    title: "Nexora Dashboard",
    category: "Web Application",
    desc: "Enterprise analytics dashboard with real-time data visualization, role-based access, and multi-tenant architecture for a SaaS fintech startup.",
    tech: ["Next.js", "TypeScript", "Prisma", "Recharts"],
    year: "2024",
    overlayClass: "project-overlay-1",
  },
  {
    title: "FieldOps Mobile",
    category: "Mobile Application",
    desc: "Offline-first field management app for logistics teams. GPS tracking, task assignment, and photo reporting with seamless sync when back online.",
    tech: ["React Native", "SQLite", "Zustand"],
    year: "2024",
    overlayClass: "project-overlay-2",
  },
  {
    title: "Vaultr Desktop",
    category: "Desktop Application",
    desc: "Secure local password and secrets manager with end-to-end encryption, auto-fill integration, and a minimal, distraction-free interface.",
    tech: ["Tauri", "Rust", "React", "SQLCipher"],
    year: "2023",
    overlayClass: "project-overlay-3",
  },
  {
    title: "Artisane Storefront",
    category: "Web Application",
    desc: "Premium e-commerce platform for a luxury goods brand. Custom CMS, multi-currency checkout, and editorial-style product presentation.",
    tech: ["Next.js", "Stripe", "Sanity CMS"],
    year: "2023",
    overlayClass: "project-overlay-4",
  },
];

const STATS: StatItem[] = [
  { value: "5+", label: "Years Experience" },
  { value: "40+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "3", label: "Platforms Mastered" },
];

const SKILLS = [
  "TypeScript", "Next.js", "React", "Node.js",
  "React Native", "Flutter", "Electron", "Tauri",
  "PostgreSQL", "Prisma", "Tailwind CSS", "Figma",
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function GoldDivider() {
  return <div className="divider-gold h-px w-full" />;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="label-track mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase text-primary">
      <span className="h-px w-6 bg-primary" />
      {children}
    </span>
  );
}

function Navbar({ theme, onToggleTheme }: { theme: Theme; onToggleTheme: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-border-subtle bg-surface/90 backdrop-blur-md" : "bg-transparent"}`}>
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <a href="#" className="font-display text-base font-semibold tracking-wide text-primary">
          Rohmat<span className="text-foreground">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="link-luxury text-sm tracking-wide text-secondary transition-colors duration-200 hover:text-foreground">
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={onToggleTheme}
              className="btn-track rounded-full border border-border px-4 py-2 text-xs text-secondary transition-colors duration-200 hover:bg-subtle"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
          </li>
          <li>
            <a
              href="#contact"
              className="btn-track rounded-full border border-primary bg-transparent px-5 py-2 text-sm text-primary transition-colors duration-200 hover:bg-primary hover:text-primary-contrast"
            >
              Hire Me
            </a>
          </li>
        </ul>

        <button onClick={() => setMenuOpen((v) => !v)} className="flex flex-col gap-1.5 p-2 md:hidden" aria-label="Toggle menu">
          <span className="h-px w-5 bg-secondary" />
          <span className="h-px w-5 bg-secondary" />
        </button>
      </nav>

      {menuOpen && (
        <div className="border-b border-border-subtle bg-surface-raised px-6 pb-6 pt-2 md:hidden">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block border-b border-border-subtle py-3 text-sm text-secondary"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={onToggleTheme}
            className="mt-4 block w-full rounded-full border border-border bg-surface py-2.5 text-center text-sm text-secondary"
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
          <a href="#contact" className="mt-4 block rounded-full border border-primary py-2.5 text-center text-sm text-primary">
            Hire Me
          </a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-surface">
      <div className="pointer-events-none absolute inset-0">
        <div className="hero-glow-primary hero-glow-lg absolute -left-32 -top-32 rounded-full opacity-20" />
        <div className="hero-glow-secondary hero-glow-md absolute bottom-0 right-0 rounded-full opacity-10" />
        <div className="hero-grid absolute inset-0 opacity-20" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <div className="animate-fade-in-up" style={{ animationDelay: "0ms" }}>
              <SectionLabel>Available for Projects</SectionLabel>
            </div>

            <h1 className="hero-title animate-fade-in-up delay-100 mt-2 mb-5 font-display font-bold text-foreground">
              Crafting Digital
              <br />
              <span className="text-gold-gradient">Experiences</span>
              <br />
              That Matter
            </h1>

            <p className="copy-relaxed animate-fade-in-up delay-200 mb-8 max-w-md text-base text-secondary">
              I&apos;m <strong className="font-medium text-foreground">Rohmatullah</strong> — a full-stack developer specialising in web, desktop, and mobile applications. I turn complex requirements into elegant, high-performance software.
            </p>

            <div className="animate-fade-in-up delay-300 flex flex-wrap gap-3">
              <a href="#portfolio" className="btn-track inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-contrast shadow-gold transition-colors duration-300 hover:bg-primary-hover">
                View My Work <span>→</span>
              </a>
              <a href="#contact" className="btn-track inline-flex items-center gap-2 rounded-full border border-primary/40 px-7 py-3 text-sm font-medium text-secondary transition-colors duration-300 hover:border-primary">
                Let&apos;s Talk
              </a>
            </div>
          </div>

          <div className="animate-fade-in-up delay-400">
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-border-subtle bg-surface-raised p-6 backdrop-soft transition-all duration-300 hover:border-primary/40">
                  <div className="text-primary-gradient mb-1 text-3xl font-display font-bold">
                    {stat.value}
                  </div>
                  <div className="text-xs tracking-wider text-secondary">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-3">
              <div className="h-px w-10 bg-primary/40" />
              <span className="text-xs tracking-widest text-muted">SCROLL TO EXPLORE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="relative bg-background py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div ref={ref} className={`grid items-center gap-16 transition-all duration-700 md:grid-cols-2 ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <div className="relative">
            <div className="ratio-portrait relative mx-auto w-full max-w-sm">
              <div className="absolute inset-0 rotate-3 rounded-3xl bg-linear-to-br from-surface to-subtle opacity-70" />
              <div className="absolute inset-0 rounded-3xl border border-primary/20 bg-surface-raised/60">
                <div className="absolute inset-4 flex flex-col items-center justify-center gap-4 rounded-2xl bg-linear-to-br from-inverse to-surface">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary/30 bg-primary-subtle text-4xl">R</div>
                  <p className="text-sm tracking-widest text-primary">ROHMATULLAH</p>
                  <p className="text-xs text-muted">Full-Stack Developer</p>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 h-16 w-16 rounded-2xl bg-linear-to-br from-gold to-gold-deep opacity-80" />
            </div>
          </div>

          <div>
            <SectionLabel>About Me</SectionLabel>
            <h2 className="section-title mb-5 font-display font-bold text-foreground">
              Precision-built software for
              <br />
              <span className="text-gold-gradient">discerning clients</span>
            </h2>
            <p className="copy-roomy mb-4 text-secondary">
              With over 5 years of hands-on experience, I specialise in building software that&apos;s not just functional — but exceptional. I work closely with clients to understand the business context behind every feature, ensuring the end result is always purposeful.
            </p>
            <p className="copy-roomy mb-8 text-secondary">
              My practice spans the full stack: from database architecture to pixel-perfect interfaces. Whether it&apos;s a complex enterprise web app, a cross-platform desktop tool, or a polished mobile experience, I bring the same level of craftsmanship to every project.
            </p>

            <div className="flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <span key={skill} className="rounded-full border border-primary/25 bg-primary-subtle px-3 py-1 text-xs tracking-wide text-primary">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const { ref, inView } = useInView();

  return (
    <section id="services" className="relative bg-surface py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div ref={ref} className={`transition-all duration-700 ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <div className="mb-14 max-w-xl">
            <SectionLabel>What I Do</SectionLabel>
            <h2 className="section-title font-display font-bold text-foreground">
              Services built around
              <br />
              your vision
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {SERVICES.map((svc, i) => (
              <div
                key={svc.title}
                className="card-luxury group cursor-default rounded-2xl border border-border-subtle bg-background p-7 transition-all duration-300 hover:border-primary/40"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="mb-4 text-2xl text-primary">{svc.icon}</div>
                <h3 className="mb-2.5 font-display text-xl font-semibold text-foreground">{svc.title}</h3>
                <p className="copy-relaxed mb-4 text-sm text-secondary">{svc.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {svc.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-border-subtle bg-subtle px-2.5 py-0.5 text-xs text-secondary">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const { ref, inView } = useInView();

  return (
    <section id="portfolio" className="relative bg-background py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div ref={ref} className={`transition-all duration-700 ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel>Selected Work</SectionLabel>
              <h2 className="section-title font-display font-bold text-foreground">
                Projects I&apos;m
                <br />proud of
              </h2>
            </div>
            <a href="#contact" className="self-start text-sm text-link underline decoration-primary/30 underline-offset-4 md:self-auto">
              Start a new project →
            </a>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {PROJECTS.map((proj, i) => (
              <div
                key={proj.title}
                className="card-luxury group relative cursor-pointer overflow-hidden rounded-2xl border border-border-subtle bg-surface-raised p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className={`absolute inset-0 ${proj.overlayClass} opacity-60`} />
                <div className="relative z-10">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="rounded-full border border-primary/35 px-3 py-1 text-xs text-primary">{proj.category}</span>
                    <span className="text-xs text-muted">{proj.year}</span>
                  </div>

                  <h3 className="mb-2 font-display text-xl font-semibold text-foreground">{proj.title}</h3>
                  <p className="copy-relaxed mb-5 text-sm text-secondary">{proj.desc}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {proj.tech.map((t) => (
                      <span key={t} className="rounded bg-subtle px-2 py-0.5 text-xs text-secondary">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { ref, inView } = useInView();
  const [form, setForm] = useState({ name: "", email: "", project: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", project: "", message: "" });
  };

  return (
    <section id="contact" className="relative bg-surface py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div ref={ref} className={`transition-all duration-700 ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <div className="mb-14 max-w-lg">
            <SectionLabel>Get In Touch</SectionLabel>
            <h2 className="section-title mb-4 font-display font-bold text-foreground">
              Ready to build something
              <br />
              <span className="text-gold-gradient">remarkable?</span>
            </h2>
            <p className="copy-relaxed text-secondary">Tell me about your project. I&apos;ll get back to you within 24 hours.</p>
          </div>

          <div className="grid items-start gap-12 md:grid-cols-5">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:col-span-3">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-focus"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-focus"
                />
              </div>

              <input
                placeholder="Project type (Web / Desktop / Mobile)"
                value={form.project}
                onChange={(e) => setForm({ ...form, project: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-focus"
              />

              <textarea
                placeholder="Tell me about your project, goals, and timeline…"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                className="w-full resize-y rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-focus"
              />

              <button
                type="submit"
                className={`btn-track mt-1 self-start rounded-full px-8 py-3 text-sm font-medium text-primary-contrast shadow-gold transition-colors duration-300 ${sent ? "bg-success" : "bg-primary hover:bg-primary-hover"}`}
              >
                {sent ? "Message Sent ✓" : "Send Message →"}
              </button>
            </form>

            <div className="flex flex-col gap-6 pt-2 md:col-span-2">
              {[
                { icon: "✉", label: "Email", value: "rohmat@example.com" },
                { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/rohmat" },
                { icon: "🐙", label: "GitHub", value: "github.com/rohmat" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-primary-subtle text-sm">
                    {item.icon}
                  </div>
                  <div>
                    <div className="mb-0.5 text-xs tracking-wider text-muted">{item.label}</div>
                    <div className="text-sm text-foreground">{item.value}</div>
                  </div>
                </div>
              ))}

              <div className="mt-4 rounded-xl border border-primary/20 bg-primary-subtle p-4">
                <div className="mb-1 text-xs font-semibold tracking-wider text-primary">● AVAILABLE</div>
                <p className="copy-compact text-xs text-secondary">Currently accepting new projects. Typical response time within 24 hours.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-surface py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <span className="font-display text-primary">Rohmat.</span>
        <p className="text-xs text-secondary">© {new Date().getFullYear()} Rohmatullah. Crafted with care.</p>
        <div className="flex gap-5">
          {["GitHub", "LinkedIn", "Twitter"].map((s) => (
            <a key={s} href="#" className="text-xs text-secondary transition-colors duration-200 hover:text-primary">
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    const saved = localStorage.getItem("portfolio-theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  return (
    <>
      <Navbar theme={theme} onToggleTheme={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))} />
      <main>
        <Hero />
        <GoldDivider />
        <About />
        <GoldDivider />
        <Services />
        <GoldDivider />
        <Portfolio />
        <GoldDivider />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
