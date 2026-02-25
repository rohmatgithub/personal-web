"use client";

import { useEffect, useState } from "react";
import {
  AboutSection,
  AchievementsSection,
  BlogTeaserSection,
  BoardSection,
  ContactSection,
  DivisionsSection,
  FooterSection,
  GlobalAnimations,
  HeroSection,
  StatsSection,
  VisionMissionSection,
} from "./CompanyProfileSections";
import { MatchTeaserSection } from "./MatchTeaserSection";
import CompanyNavbar from "./CompanyNavbar";
import ThemeSwitchButton from "./ThemeSwitchButton";
import { I18nProvider, useTranslation } from "./i18n-context";
import { ThemeProvider } from "./theme-context";

function useInView(threshold = 0.15) {
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, threshold]);

  return { observeRef: setNode, isVisible: inView };
}

function CompanyProfileContent() {
  const { t, i18n } = useTranslation("companyProfile");
  const heroSection = useInView(0.1);
  const aboutSection = useInView();
  const statsSection = useInView();
  const visionSection = useInView();
  const achieveSection = useInView();
  const matchTeaserSection = useInView();
  const boardSection = useInView();
  const contactSection = useInView();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.title = t("meta.title");
    document.documentElement.lang = i18n.language;
  }, [i18n.language, t]);

  return (
    <div className="company-theme font-[Barlow,sans-serif] bg-(--bg-primary) text-(--text-primary) overflow-x-hidden min-h-screen">
      <ThemeSwitchButton />
      <CompanyNavbar
        menuOpen={menuOpen}
        scrolled={scrolled}
        onToggleMenu={() => setMenuOpen((prev) => !prev)}
        onCloseMenu={() => setMenuOpen(false)}
      />
      <HeroSection
        observeRef={heroSection.observeRef}
        isVisible={heroSection.isVisible}
      />
      <StatsSection
        observeRef={statsSection.observeRef}
        isVisible={statsSection.isVisible}
      />
      <AboutSection
        observeRef={aboutSection.observeRef}
        isVisible={aboutSection.isVisible}
      />
      <DivisionsSection />
      <VisionMissionSection
        observeRef={visionSection.observeRef}
        isVisible={visionSection.isVisible}
      />
      <AchievementsSection
        observeRef={achieveSection.observeRef}
        isVisible={achieveSection.isVisible}
      />
      <MatchTeaserSection
        observeRef={matchTeaserSection.observeRef}
        isVisible={matchTeaserSection.isVisible}
      />
      <BoardSection
        observeRef={boardSection.observeRef}
        isVisible={boardSection.isVisible}
      />
      <BlogTeaserSection />
      <ContactSection
        observeRef={contactSection.observeRef}
        isVisible={contactSection.isVisible}
      />
      <FooterSection />
      <GlobalAnimations />
    </div>
  );
}

export default function CompanyProfile() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <CompanyProfileContent />
      </I18nProvider>
    </ThemeProvider>
  );
}
