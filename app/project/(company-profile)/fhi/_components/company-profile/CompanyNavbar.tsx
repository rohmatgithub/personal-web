"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "./i18n-context";

interface CompanyNavbarProps {
  menuOpen: boolean;
  scrolled: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  sectionHrefPrefix?: string;
  activeLinkLabel?: string;
  desktopRightAction?: ReactNode;
}

type NavItem = {
  key: string;
  href: string;
};

const baseNavItems: NavItem[] = [
  { key: "about", href: "#tentang" },
  { key: "visionMission", href: "#visi-misi" },
  { key: "achievements", href: "#prestasi" },
  { key: "board", href: "#pengurus" },
  { key: "contact", href: "#kontak" },
  { key: "blog", href: "/project/fhi/blog" },
  { key: "matches", href: "#pertandingan" },
];

export default function CompanyNavbar({
  menuOpen,
  scrolled,
  onToggleMenu,
  onCloseMenu,
  sectionHrefPrefix = "",
  activeLinkLabel,
}: CompanyNavbarProps) {
  const { t, i18n } = useTranslation("companyProfile");
  const [currentHash, setCurrentHash] = useState("");

  const navItems = useMemo(
    () =>
      baseNavItems.map((item) =>
        item.href.startsWith("#")
          ? { ...item, href: `${sectionHrefPrefix}${item.href}` }
          : item,
      ),
    [sectionHrefPrefix],
  );

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const currentLanguage = i18n.language.split("-")[0].toLowerCase();

  const handleLanguageChange = (language: "id" | "en") => {
    if (currentLanguage === language) return;
    void i18n.changeLanguage(language);
  };

  const activeHref = (() => {
    if (activeLinkLabel) {
      const matched = navItems.find(
        (item) => t(`navbar.links.${item.key}`) === activeLinkLabel,
      );
      return matched?.href;
    }

    if (!currentHash) return undefined;
    return `${sectionHrefPrefix}${currentHash}`;
  })();

  const navTextBase = scrolled ? "text-white" : "text-(--text-on-primary)";
  const navTextMutedHover = scrolled
    ? "text-white/80 hover:text-white"
    : "text-(--text-on-primary-80) hover:text-(--text-on-primary)";
  const navTextMutedHoverMobile = scrolled
    ? "text-white/85 hover:text-white"
    : "text-(--text-on-primary-85) hover:text-(--text-on-primary)";
  const navBorder = scrolled ? "border-white/[0.06]" : "border-black/[0.06]";
  const navLangWrap = scrolled
    ? "border-white/25 bg-white/[0.06]"
    : "border-black/15 bg-black/[0.03]";
  const navLangInactive = scrolled
    ? "text-white/75 hover:text-white"
    : "text-(--text-on-primary-70) hover:text-(--text-on-primary)";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-100 px-6 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(8,14,26,0.97)] backdrop-blur-md border-b border-white/6"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-300 mx-auto flex items-center justify-between h-18">
        <Link
          href="/project/fhi"
          className="flex items-center gap-3 no-underline"
        >
          <div className="w-11 h-11 rounded-lg flex items-center justify-center text-xl font-black text-white shadow-[0_4px_14px_rgba(192,16,32,0.45)] bg-[linear-gradient(135deg,var(--primary-main),var(--primary-dark))]">
            🏑
          </div>
          <div>
            <div
              className={`font-['Bebas_Neue',cursive] text-[22px] tracking-[0.08em] leading-none ${navTextBase}`}
            >
              FHI
            </div>
            <div
              className={`text-[10px] tracking-[0.15em] uppercase leading-tight ${
                scrolled ? "text-white/55" : "text-(--text-on-primary-55)"
              }`}
            >
              {t("navbar.brandSubtitle")}
            </div>
          </div>
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className={`no-underline text-sm font-semibold tracking-[0.05em] uppercase transition-colors duration-200 ${
                activeHref === item.href ? navTextBase : navTextMutedHover
              }`}
            >
              {t(`navbar.links.${item.key}`)}
            </a>
          ))}

          <div
            className={`inline-flex items-center rounded-full border p-1 ${navLangWrap}`}
          >
            <button
              type="button"
              onClick={() => handleLanguageChange("id")}
              className={`rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.08em] transition-colors ${
                currentLanguage === "id"
                  ? "bg-(--primary-main) text-white"
                  : navLangInactive
              }`}
              aria-label={t("navbar.language.switchToId")}
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange("en")}
              className={`rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.08em] transition-colors ${
                currentLanguage === "en"
                  ? "bg-(--primary-main) text-white"
                  : navLangInactive
              }`}
              aria-label={t("navbar.language.switchToEn")}
            >
              EN
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleMenu}
          className={`md:hidden bg-transparent border-none ${navTextBase} text-[26px] cursor-pointer`}
          aria-label={t("navbar.menuAria")}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div
          className={`backdrop-blur-md px-6 pt-5 pb-6 border-t md:hidden ${
            scrolled
              ? "bg-[rgba(8,14,26,0.97)] border-white/6"
              : "bg-white/90 border-black/6"
          }`}
        >
          <div
            className={`mb-4 inline-flex items-center rounded-full border p-1 ${navLangWrap}`}
          >
            <button
              type="button"
              onClick={() => handleLanguageChange("id")}
              className={`rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.08em] transition-colors ${
                currentLanguage === "id"
                  ? "bg-(--primary-main) text-white"
                  : navLangInactive
              }`}
              aria-label={t("navbar.language.switchToId")}
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange("en")}
              className={`rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.08em] transition-colors ${
                currentLanguage === "en"
                  ? "bg-(--primary-main) text-white"
                  : navLangInactive
              }`}
              aria-label={t("navbar.language.switchToEn")}
            >
              EN
            </button>
          </div>

          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={onCloseMenu}
              className={`block py-3 no-underline text-[15px] font-semibold border-b last:border-0 transition-colors ${
                navBorder
              } ${activeHref === item.href ? navTextBase : navTextMutedHoverMobile}`}
            >
              {t(`navbar.links.${item.key}`)}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
