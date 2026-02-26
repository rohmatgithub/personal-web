"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

type Theme = "light" | "dark";

type NavItem = { label: string; href: string };
type Service = { icon: string; title: string; desc: string; tags: string[] };
type Project = { title: string; category: string; desc: string; tech: string[]; year: string; overlayClass: string; href: string };
type StatItem = { value: string; label: string };

const COPYRIGHT_YEAR = "2026";
const FOOTER_NAME = "Rohmatullah";

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

function Navbar({ items }: { items: NavItem[] }) {
  const t = useTranslations("MainPage");
  const locale = useLocale();
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
          {items.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="link-luxury text-sm tracking-wide text-secondary transition-colors duration-200 hover:text-foreground">
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="btn-track rounded-full border border-primary bg-transparent px-5 py-2 text-sm text-primary transition-colors duration-200 hover:bg-primary hover:text-primary-contrast"
            >
              {t("nav.hireMe")}
            </a>
          </li>
          <li className="flex items-center gap-2 rounded-full border border-border-subtle px-2 py-1">
            <Link href="/id" className={`px-2 py-0.5 text-xs ${locale === "id" ? "text-primary" : "text-secondary hover:text-foreground"}`}>
              ID
            </Link>
            <Link href="/en" className={`px-2 py-0.5 text-xs ${locale === "en" ? "text-primary" : "text-secondary hover:text-foreground"}`}>
              EN
            </Link>
          </li>
        </ul>

        <button onClick={() => setMenuOpen((v) => !v)} className="flex flex-col gap-1.5 p-2 md:hidden" aria-label={t("nav.toggleMenuAria")}>
          <span className="h-px w-5 bg-secondary" />
          <span className="h-px w-5 bg-secondary" />
        </button>
      </nav>

      {menuOpen && (
        <div className="border-b border-border-subtle bg-surface-raised px-6 pb-6 pt-2 md:hidden">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block border-b border-border-subtle py-3 text-sm text-secondary"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a href="#contact" className="mt-4 block rounded-full border border-primary py-2.5 text-center text-sm text-primary">
            {t("nav.hireMe")}
          </a>
          <div className="mt-4 flex gap-3">
            <Link href="/id" className={`rounded border px-3 py-1 text-xs ${locale === "id" ? "border-primary text-primary" : "border-border-subtle text-secondary"}`}>
              Indonesia
            </Link>
            <Link href="/en" className={`rounded border px-3 py-1 text-xs ${locale === "en" ? "border-primary text-primary" : "border-border-subtle text-secondary"}`}>
              English
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function FloatingThemeSwitch({ onToggleTheme }: { onToggleTheme: () => void }) {
  const t = useTranslations("MainPage.themeSwitch");

  return (
    <button
      type="button"
      onClick={onToggleTheme}
      aria-label={t("switchThemeAria")}
      className="fixed right-5 bottom-5 z-120 inline-flex items-center gap-2 rounded-full border border-border bg-surface-raised px-4 py-2 text-sm font-semibold text-foreground shadow-lg backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40"
    >
      <span className="text-base" aria-hidden="true">
        🌓
      </span>
      <span>{t("buttonLabel")}</span>
    </button>
  );
}

function Hero({ stats }: { stats: StatItem[] }) {
  const t = useTranslations("MainPage.hero");

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
              <SectionLabel>{t("available")}</SectionLabel>
            </div>

            <h1 className="hero-title animate-fade-in-up delay-100 mt-2 mb-5 font-display font-bold text-foreground">
              {t("titleLine1")}
              <br />
              <span className="text-gold-gradient">{t("titleLine2")}</span>
              <br />
              {t("titleLine3")}
            </h1>

            <p className="copy-relaxed animate-fade-in-up delay-200 mb-8 max-w-md text-base text-secondary">
              {t("introPrefix")} <strong className="font-medium text-foreground">Rohmatullah</strong> {t("introSuffix")}
            </p>

            <div className="animate-fade-in-up delay-300 flex flex-wrap gap-3">
              <a href="#project" className="btn-track inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-contrast shadow-gold transition-colors duration-300 hover:bg-primary-hover">
                {t("ctaWork")} <span>→</span>
              </a>
              <a href="#contact" className="btn-track inline-flex items-center gap-2 rounded-full border border-primary/40 px-7 py-3 text-sm font-medium text-secondary transition-colors duration-300 hover:border-primary">
                {t("ctaTalk")}
              </a>
            </div>
          </div>

          <div className="animate-fade-in-up delay-400">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-border-subtle bg-surface-raised p-6 backdrop-soft transition-all duration-300 hover:border-primary/40">
                  <div className="text-primary-gradient mb-1 text-3xl font-display font-bold">{stat.value}</div>
                  <div className="text-xs tracking-wider text-secondary">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-3">
              <div className="h-px w-10 bg-primary/40" />
              <span className="text-xs tracking-widest text-muted">{t("scrollHint")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About({ skills }: { skills: string[] }) {
  const t = useTranslations("MainPage.about");
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
                  <p className="text-xs text-muted">{t("role")}</p>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 h-16 w-16 rounded-2xl bg-linear-to-br from-gold to-gold-deep opacity-80" />
            </div>
          </div>

          <div>
            <SectionLabel>{t("sectionLabel")}</SectionLabel>
            <h2 className="section-title mb-5 font-display font-bold text-foreground">
              {t("titleLine1")}
              <br />
              <span className="text-gold-gradient">{t("titleLine2")}</span>
            </h2>
            <p className="copy-roomy mb-4 text-secondary">{t("paragraph1")}</p>
            <p className="copy-roomy mb-8 text-secondary">{t("paragraph2")}</p>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
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

function Services({ services }: { services: Service[] }) {
  const t = useTranslations("MainPage.services");
  const { ref, inView } = useInView();

  return (
    <section id="services" className="relative bg-surface py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div ref={ref} className={`transition-all duration-700 ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <div className="mb-14 max-w-xl">
            <SectionLabel>{t("sectionLabel")}</SectionLabel>
            <h2 className="section-title font-display font-bold text-foreground">
              {t("titleLine1")}
              <br />
              {t("titleLine2")}
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {services.map((svc, i) => (
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

function Portfolio({ projects }: { projects: Project[] }) {
  const t = useTranslations("MainPage.portfolio");
  const { ref, inView } = useInView();

  return (
    <section id="project" className="relative bg-background py-28">
      <div id="portfolio" className="sr-only" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-6">
        <div ref={ref} className={`transition-all duration-700 ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel>{t("sectionLabel")}</SectionLabel>
              <h2 className="section-title font-display font-bold text-foreground">
                {t("titleLine1")}
                <br />
                {t("titleLine2")}
              </h2>
            </div>
            <a href="#contact" className="self-start text-sm text-link underline decoration-primary/30 underline-offset-4 md:self-auto">
              {t("startProject")} →
            </a>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((proj, i) => (
              <Link
                key={proj.title}
                href={proj.href}
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
                    {proj.tech.map((tech) => (
                      <span key={tech} className="rounded bg-subtle px-2 py-0.5 text-xs text-secondary">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 text-xs font-semibold tracking-wide text-primary">
                    {t("openProject")} →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const t = useTranslations("MainPage.contact");
  const { ref, inView } = useInView();
  const [form, setForm] = useState({ name: "", email: "", project: "", message: "" });
  const [sent, setSent] = useState(false);

  const contactItems = [
    { icon: "✉", label: t("items.emailLabel"), value: "rohmat@example.com" },
    { icon: "💼", label: t("items.linkedinLabel"), value: "linkedin.com/in/rohmat" },
    { icon: "🐙", label: t("items.githubLabel"), value: "github.com/rohmat" },
  ];

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
            <SectionLabel>{t("sectionLabel")}</SectionLabel>
            <h2 className="section-title mb-4 font-display font-bold text-foreground">
              {t("titleLine1")}
              <br />
              <span className="text-gold-gradient">{t("titleLine2")}</span>
            </h2>
            <p className="copy-relaxed text-secondary">{t("subtitle")}</p>
          </div>

          <div className="grid items-start gap-12 md:grid-cols-5">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:col-span-3">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  placeholder={t("form.namePlaceholder")}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-focus"
                />
                <input
                  type="email"
                  placeholder={t("form.emailPlaceholder")}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-focus"
                />
              </div>

              <input
                placeholder={t("form.projectPlaceholder")}
                value={form.project}
                onChange={(e) => setForm({ ...form, project: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-focus"
              />

              <textarea
                placeholder={t("form.messagePlaceholder")}
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
                {sent ? t("form.sentButton") : t("form.sendButton")}
              </button>
            </form>

            <div className="flex flex-col gap-6 pt-2 md:col-span-2">
              {contactItems.map((item) => (
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
                <div className="mb-1 text-xs font-semibold tracking-wider text-primary">● {t("availabilityLabel")}</div>
                <p className="copy-compact text-xs text-secondary">{t("availabilityDesc")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const t = useTranslations("MainPage.footer");

  return (
    <footer className="border-t border-border-subtle bg-surface py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <span className="font-display text-primary">Rohmat.</span>
        <p className="text-xs text-secondary">© {COPYRIGHT_YEAR} {FOOTER_NAME}. {t("craftedWithCare")}</p>
        <div className="flex gap-5">
          {[t("social.github"), t("social.linkedin"), t("social.twitter")].map((social) => (
            <a key={social} href="#" className="text-xs text-secondary transition-colors duration-200 hover:text-primary">
              {social}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function HomePageClient() {
  const t = useTranslations("MainPage");
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

  const navItems: NavItem[] = [
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.work"), href: "#project" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  const stats: StatItem[] = [
    { value: "5+", label: t("hero.stats.experience") },
    { value: "40+", label: t("hero.stats.projects") },
    { value: "98%", label: t("hero.stats.satisfaction") },
    { value: "3", label: t("hero.stats.platforms") },
  ];

  const skills = [
    "TypeScript", "Next.js", "React", "Node.js",
    "React Native", "Flutter", "Electron", "Tauri",
    "PostgreSQL", "Prisma", "Tailwind CSS", "Figma",
  ];

  const services: Service[] = [
    {
      icon: "◈",
      title: t("services.items.web.title"),
      desc: t("services.items.web.desc"),
      tags: ["Next.js", "React", "TypeScript", "Node.js"],
    },
    {
      icon: "◉",
      title: t("services.items.desktop.title"),
      desc: t("services.items.desktop.desc"),
      tags: ["Electron", "Tauri", "WPF", ".NET"],
    },
    {
      icon: "◎",
      title: t("services.items.mobile.title"),
      desc: t("services.items.mobile.desc"),
      tags: ["React Native", "Flutter", "Expo"],
    },
    {
      icon: "⬡",
      title: t("services.items.uiux.title"),
      desc: t("services.items.uiux.desc"),
      tags: ["Figma", "Prototyping", "Design System"],
    },
  ];

  const projects: Project[] = [
    {
      title: t("portfolio.items.fhiProfile.title"),
      category: t("portfolio.items.fhiProfile.category"),
      desc: t("portfolio.items.fhiProfile.desc"),
      tech: ["Next.js", "TypeScript", "CMS", "SEO"],
      year: "2026",
      overlayClass: "project-overlay-1",
      href: "/project/fhi",
    },
    {
      title: t("portfolio.items.fhiMatchCenter.title"),
      category: t("portfolio.items.fhiMatchCenter.category"),
      desc: t("portfolio.items.fhiMatchCenter.desc"),
      tech: ["Next.js", "Realtime Score", "Standings", "API"],
      year: "2026",
      overlayClass: "project-overlay-2",
      href: "/project/fhi/match-center",
    },
    {
      title: t("portfolio.items.fhiBlog.title"),
      category: t("portfolio.items.fhiBlog.category"),
      desc: t("portfolio.items.fhiBlog.desc"),
      tech: ["Editorial CMS", "Slug Routing", "Responsive UI"],
      year: "2026",
      overlayClass: "project-overlay-3",
      href: "/project/fhi/blog",
    },
    {
      title: t("portfolio.items.fhiProposal.title"),
      category: t("portfolio.items.fhiProposal.category"),
      desc: t("portfolio.items.fhiProposal.desc"),
      tech: ["UI Concept", "Offer Deck", "Interactive Preview"],
      year: "2026",
      overlayClass: "project-overlay-4",
      href: "/proposal/fhi",
    },
  ];

  return (
    <>
      <Navbar items={navItems} />
      <main>
        <Hero stats={stats} />
        <GoldDivider />
        <About skills={skills} />
        <GoldDivider />
        <Services services={services} />
        <GoldDivider />
        <Portfolio projects={projects} />
        <GoldDivider />
        <Contact />
      </main>
      <FloatingThemeSwitch onToggleTheme={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))} />
      <Footer />
    </>
  );
}
