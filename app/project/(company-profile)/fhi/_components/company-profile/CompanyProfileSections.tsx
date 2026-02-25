"use client";

import { useTranslation } from "./i18n-context";
import type { SectionInView } from "./types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Achievement {
  id: number;
  year: string;
  titleKey: string;
  eventKey: string;
  medal: "gold" | "silver" | "bronze";
}

interface TeamMember {
  id: number;
  name: string;
  roleKey: string;
  initial: string;
}

interface Stat {
  number: string;
  labelKey: string;
  icon: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const achievements: Achievement[] = [
  {
    id: 1,
    year: "2025",
    titleKey: "achievements.items.seaGamesGold.title",
    eventKey: "achievements.items.seaGamesGold.event",
    medal: "gold",
  },
  {
    id: 2,
    year: "2024",
    titleKey: "achievements.items.ahfBronze.title",
    eventKey: "achievements.items.ahfBronze.event",
    medal: "bronze",
  },
  {
    id: 3,
    year: "2023",
    titleKey: "achievements.items.aseanChampion.title",
    eventKey: "achievements.items.aseanChampion.event",
    medal: "gold",
  },
  {
    id: 4,
    year: "2023",
    titleKey: "achievements.items.seaGamesSilver.title",
    eventKey: "achievements.items.seaGamesSilver.event",
    medal: "silver",
  },
  {
    id: 5,
    year: "2022",
    titleKey: "achievements.items.asiaCupThird.title",
    eventKey: "achievements.items.asiaCupThird.event",
    medal: "bronze",
  },
  {
    id: 6,
    year: "2022",
    titleKey: "achievements.items.ponGold.title",
    eventKey: "achievements.items.ponGold.event",
    medal: "gold",
  },
];

const board: TeamMember[] = [
  {
    id: 1,
    name: "Dr. Budi Prasetyo, M.Si",
    roleKey: "board.items.chairperson",
    initial: "BP",
  },
  {
    id: 2,
    name: "Hendra Kartiko, S.Kor",
    roleKey: "board.items.secretaryGeneral",
    initial: "HK",
  },
  {
    id: 3,
    name: "Prof. Wahyu Nugroho",
    roleKey: "board.items.treasurer",
    initial: "WN",
  },
  {
    id: 4,
    name: "Rina Kusuma, M.Pd",
    roleKey: "board.items.headDevelopment",
    initial: "RK",
  },
  {
    id: 5,
    name: "Teguh Wibowo, S.T",
    roleKey: "board.items.headInfrastructure",
    initial: "TW",
  },
  {
    id: 6,
    name: "Dina Rahmawati, MBA",
    roleKey: "board.items.headPartnership",
    initial: "DR",
  },
];

const stats: Stat[] = [
  { number: "34", labelKey: "stats.memberProvinces", icon: "🏛️" },
  { number: "1.200+", labelKey: "stats.registeredAthletes", icon: "🏃" },
  { number: "48", labelKey: "stats.activeClubs", icon: "🏑" },
  { number: "25+", labelKey: "stats.yearsEstablished", icon: "📅" },
];

// ─── Medal helpers ────────────────────────────────────────────────────────────

const medalBgClass: Record<Achievement["medal"], string> = {
  gold: "bg-[#D4AF37]",
  silver: "bg-[#9BA3AF]",
  bronze: "bg-[#CD7F32]",
};

const medalShadowClass: Record<Achievement["medal"], string> = {
  gold: "shadow-[0_2px_8px_rgba(212,175,55,0.53)]",
  silver: "shadow-[0_2px_8px_rgba(155,163,175,0.53)]",
  bronze: "shadow-[0_2px_8px_rgba(205,127,50,0.53)]",
};

const medalEmoji: Record<Achievement["medal"], string> = {
  gold: "🥇",
  silver: "🥈",
  bronze: "🥉",
};

// ─── Transition delay helpers ─────────────────────────────────────────────────

const statsDelayClasses = [
  "[transition-delay:0s]",
  "[transition-delay:0.1s]",
  "[transition-delay:0.2s]",
  "[transition-delay:0.3s]",
] as const;
const misiDelayClasses = [
  "[transition-delay:0.2s]",
  "[transition-delay:0.28s]",
  "[transition-delay:0.36s]",
  "[transition-delay:0.44s]",
  "[transition-delay:0.52s]",
  "[transition-delay:0.6s]",
] as const;
const achieveDelayClasses = [
  "[transition-delay:0s]",
  "[transition-delay:0.1s]",
  "[transition-delay:0.2s]",
  "[transition-delay:0.3s]",
  "[transition-delay:0.4s]",
  "[transition-delay:0.5s]",
] as const;
const boardDelayClasses = [
  "[transition-delay:0s]",
  "[transition-delay:0.08s]",
  "[transition-delay:0.16s]",
  "[transition-delay:0.24s]",
  "[transition-delay:0.32s]",
  "[transition-delay:0.4s]",
] as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

const MedalIcon = ({ medal }: { medal: Achievement["medal"] }) => (
  <span
    title={medal}
    className={`flex items-center justify-center text-base shrink-0 rounded-full w-8 h-8 ${medalBgClass[medal]} ${medalShadowClass[medal]}`}
  >
    {medalEmoji[medal]}
  </span>
);

// ─── HeroSection ─────────────────────────────────────────────────────────────

export function HeroSection({ observeRef, isVisible }: SectionInView) {
  const { t } = useTranslation("companyProfile");

  return (
    <section
      className="min-h-screen relative flex items-center overflow-hidden
      [background:var(--hero-bg)]"
    >
      {/* Background atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Navy glow — top right */}
        <div
          className="absolute top-[8%] -right-[5%] w-160 h-160 rounded-full animate-[float_7s_ease-in-out_infinite]
          bg-[radial-gradient(circle,rgba(15,42,94,0.4)_0%,transparent_70%)]"
        />
        {/* Red glow — bottom left */}
        <div
          className="absolute bottom-[5%] -left-[8%] w-125 h-125 rounded-full animate-[float_9s_ease-in-out_infinite_reverse]
          bg-[radial-gradient(circle,rgba(192,16,32,0.18)_0%,transparent_70%)]"
        />
        {/* Subtle grid text-[#080e1a]*/}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          {[...Array(13)].map((_, i) => (
            <line
              key={`v${i}`}
              x1={i * 100}
              y1={0}
              x2={i * 100}
              y2={800}
              stroke="currentColor"
              strokeWidth={1}
            />
          ))}
          {[...Array(9)].map((_, i) => (
            <line
              key={`h${i}`}
              x1={0}
              y1={i * 100}
              x2={1200}
              y2={i * 100}
              stroke="currentColor"
              strokeWidth={1}
            />
          ))}
        </svg>
        {/* Red accent stripe — Indonesian flag echo */}
        <div
          className="absolute top-0 right-[15%] w-0.5 h-full -skew-x-15
          bg-[linear-gradient(to_bottom,transparent,rgba(192,16,32,0.55),transparent)]"
        />
        <div
          className="absolute top-0 right-[16.8%] w-px h-full -skew-x-15
          bg-[linear-gradient(to_bottom,transparent,rgba(192,16,32,0.2),transparent)]"
        />
        {/* Navy accent stripe */}
        <div
          className="absolute top-0 right-[17.8%] w-0.5 h-full -skew-x-15
          bg-[linear-gradient(to_bottom,transparent,rgba(30,63,128,0.4),transparent)]"
        />
      </div>

      {/* Content */}
      <div
        ref={observeRef}
        className="relative z-2 max-w-300 mx-auto px-6 pt-30 pb-20 w-full"
      >
        <div className="max-w-170">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 rounded-xl px-4.5 py-1.5 mb-8 border
            bg-[rgba(192,16,32,0.15)] border-[rgba(192,16,32,0.4)]
            transition-all duration-600 ease-in-out
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          >
            <span className="w-2 h-2 rounded-full inline-block bg-(--primary-main) animate-[pulse-glow_2s_infinite]" />
            <span className="text-white/80 text-[13px] font-semibold tracking-widest uppercase">
              {t("hero.badge")}
            </span>
          </div>

          {/* Headline — Red / Outline / Red pattern = Indonesian flag visual */}
          <h1
            className={`font-['Bebas_Neue',cursive] text-[clamp(52px,8vw,96px)] leading-[0.95] tracking-[0.03em] mb-2
            transition-all duration-700 ease-in-out delay-100
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-(--text-on-primary)">
              {t("hero.title.federation")}
            </span>
            <br />
            <span className="text-transparent [--hero-stroke-color:var(--text-on-primary)] [--hero-stroke-width:1px] md:[--hero-stroke-width:2px] [-webkit-text-stroke:var(--hero-stroke-width)_var(--hero-stroke-color)] opacity-[0.28]">
              {t("hero.title.hockey")}
            </span>
            <br />
            {/* "Indonesia" in brand red — national identity anchor */}
            <span className="text-(--primary-main) drop-shadow-[0_2px_12px_rgba(192,16,32,0.6)]">
              {t("hero.title.indonesia")}
            </span>
          </h1>

          {/* Description */}
          <p
            className={`text-[clamp(15px,2vw,18px)] text-(--text-on-primary-65) max-w-135 leading-[1.7] mt-7 mb-11 font-normal
            transition-all duration-700 ease-in-out delay-[0.25s]
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {t("hero.description")}
          </p>

          {/* CTAs */}
          <div
            className={`flex gap-4 flex-wrap transition-all duration-700 ease-in-out delay-[0.4s]
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <a
              href="#tentang"
              className="bg-(--primary-main) text-white py-3.5 px-8 rounded-lg no-underline text-sm font-bold tracking-[0.06em] uppercase
                inline-flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.75
                shadow-[0_6px_24px_rgba(192,16,32,0.5)] hover:bg-(--primary-hover)"
            >
              {t("hero.ctaLearn")} <span aria-hidden>→</span>
            </a>
            <a
              href="#blog"
              className="bg-transparent text-(--text-on-primary) py-3.5 px-8 rounded-lg no-underline text-sm font-bold tracking-[0.06em] uppercase
                border-2 border-(--text-on-primary-25) inline-flex items-center gap-2
                transition-all duration-200 hover:border-(--text-on-primary-60) hover:bg-(--bg-primary-06)"
            >
              📰 {t("hero.ctaBlog")}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-[float_2s_ease-in-out_infinite]">
        <div className="w-px h-10 bg-white/40" />
        <div className="text-white/60 text-[11px] tracking-[0.2em] uppercase">
          {t("hero.scroll")}
        </div>
      </div>
    </section>
  );
}

// ─── StatsSection ────────────────────────────────────────────────────────────

export function StatsSection({ observeRef, isVisible }: SectionInView) {
  const { t } = useTranslation("companyProfile");

  return (
    // Navy-dark bar — authority strip between hero and content
    <section className="bg-(--secondary-dark) p-0">
      <div
        ref={observeRef}
        className="max-w-300 mx-auto px-6 grid grid-cols-2 md:grid-cols-4"
      >
        {stats.map((stat, i) => (
          <div
            key={stat.labelKey}
            className={`py-9 px-6 text-center transition-all duration-500 ease-in-out
              ${statsDelayClasses[i] ?? "delay-[0s]"}
              ${i < 3 ? "border-r border-white/8 dark:border-(--bg-primary-08)" : ""}
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          >
            <div className="text-[28px] mb-2">{stat.icon}</div>
            <div className="font-['Bebas_Neue',cursive] text-[42px] text-white dark:text-(--bg-primary) tracking-[0.04em] leading-none">
              {stat.number}
            </div>
            <div className="text-[13px] text-white/55 dark:text-(--bg-primary-55) mt-1.5 font-medium tracking-[0.05em] uppercase">
              {t(stat.labelKey)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── AboutSection ────────────────────────────────────────────────────────────

export function AboutSection({ observeRef, isVisible }: SectionInView) {
  const { t } = useTranslation("companyProfile");

  return (
    <section id="tentang" className="py-25 px-6 bg-(--bg-primary)">
      <div
        ref={observeRef}
        className="max-w-300 mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center"
      >
        {/* Left — text */}
        <div
          className={`transition-all duration-700 ease-in-out ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
        >
          <div className="font-['Barlow_Condensed',sans-serif] text-[13px] font-bold text-(--secondary-main) tracking-[0.2em] uppercase mb-4">
            {t("about.kicker")}
          </div>
          <h2 className="font-['Bebas_Neue',cursive] text-[clamp(36px,5vw,60px)] leading-none text-(--text-primary) mb-7 tracking-[0.03em]">
            {t("about.titleLine1")}
            <br />
            {/* Brand red for the key differentiator */}
            <span className="text-(--primary-main)">
              {t("about.titleLine2")}
            </span>
            <br />
            {t("about.titleLine3")}
          </h2>
          {/* Red-navy gradient rule — brand identity bar */}
          <div className="w-15 h-1 rounded-sm mb-7 bg-[linear-gradient(to_right,var(--primary-main),var(--secondary-main))]" />
          <p className="text-(--text-secondary) leading-[1.8] text-base mb-5">
            {t("about.paragraph1")}
          </p>
          <p className="text-(--text-secondary) leading-[1.8] text-base mb-8">
            {t("about.paragraph2")}
          </p>
          <div className="flex gap-8">
            {[
              ["🏅", t("about.memberships.fih")],
              ["🌏", t("about.memberships.ahf")],
              ["🇮🇩", t("about.memberships.koni")],
            ].map(([icon, label]) => (
              <div
                key={label as string}
                className="flex flex-col items-center gap-1.5"
              >
                <div className="w-14 h-14 rounded-lg bg-(--bg-secondary) flex items-center justify-center text-[24px] border border-(--border-main)">
                  {icon}
                </div>
                <span className="text-[12px] font-bold text-(--text-secondary) text-center tracking-[0.04em]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — graphic */}
        <div
          className={`transition-all duration-700 ease-in-out delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
        >
          <div className="relative">
            {/* Hockey field illustration — red/navy gradient */}
            <div
              className="rounded-2xl overflow-hidden aspect-4/3 flex items-center justify-center relative
              bg-[linear-gradient(135deg,var(--secondary-dark)_0%,var(--secondary-main)_100%)]
              dark:bg-[linear-gradient(135deg,var(--primary-main)_0%,var(--primary-main)_100%)]"
            >
              <svg viewBox="0 0 400 300" className="w-4/5 opacity-90">
                <rect
                  x="20"
                  y="20"
                  width="360"
                  height="260"
                  rx="8"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="2"
                />
                <rect
                  x="20"
                  y="20"
                  width="80"
                  height="260"
                  fill="var(--svg-field)"
                />
                <rect
                  x="300"
                  y="20"
                  width="80"
                  height="260"
                  fill="var(--svg-field)"
                />
                <circle
                  cx="200"
                  cy="150"
                  r="40"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="2"
                />
                <circle cx="200" cy="150" r="4" fill="rgba(255,255,255,0.5)" />
                <line
                  x1="200"
                  y1="20"
                  x2="200"
                  y2="280"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1.5"
                />
                <rect
                  x="20"
                  y="95"
                  width="40"
                  height="110"
                  fill="none"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="2"
                />
                <rect
                  x="340"
                  y="95"
                  width="40"
                  height="110"
                  fill="none"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="2"
                />
                <text
                  x="200"
                  y="155"
                  textAnchor="middle"
                  fill="white"
                  fontSize="32"
                  fontFamily="Bebas Neue, sans-serif"
                  letterSpacing="2"
                >
                  FHI
                </text>
                <text
                  x="200"
                  y="200"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.5)"
                  fontSize="11"
                  fontFamily="Barlow, sans-serif"
                >
                  FEDERASI HOCKEY INDONESIA
                </text>
              </svg>
              {/* EST badge — red for brand */}
              <div className="absolute top-5 right-5 bg-(--primary-dark) rounded-lg px-3.5 py-2 text-xs font-extrabold text-white dark:text-(--bg-primary) tracking-[0.05em]">
                EST. 1999
              </div>
            </div>
            {/* Floating stat card */}
            <div
              className="absolute -bottom-5 -left-5 bg-(--bg-secondary) rounded-2xl px-5.5 py-4.5 border border-(--border-main)
              flex items-center gap-3.5 shadow-(--shadow-lg)"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-[22px]
                bg-[linear-gradient(135deg,var(--primary-main),var(--primary-dark))]"
              >
                🏆
              </div>
              <div>
                <div className="font-['Bebas_Neue',cursive] text-[26px] text-(--primary-main) leading-none">
                  60+
                </div>
                <div className="text-xs text-(--text-secondary) font-semibold">
                  {t("about.internationalMedals")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── DivisionsSection ────────────────────────────────────────────────────────

export function DivisionsSection() {
  const { t } = useTranslation("companyProfile");

  return (
    <section className="py-20 px-6 bg-(--bg-secondary)">
      <div className="max-w-300 mx-auto">
        <div className="text-center mb-15">
          <div className="font-['Barlow_Condensed',sans-serif] text-[13px] font-bold text-(--secondary-main) tracking-[0.2em] uppercase mb-3">
            {t("divisions.kicker")}
          </div>
          <h2 className="font-['Bebas_Neue',cursive] text-[clamp(32px,5vw,54px)] text-(--text-primary) tracking-[0.03em]">
            {t("divisions.title")}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Hockey Indoor — Navy gradient */}
          <div
            className="rounded-2xl overflow-hidden relative p-12 text-white cursor-pointer transition-all duration-300 hover:-translate-y-1.5
            bg-[linear-gradient(135deg,#071840_0%,#1e3f80_100%)]
            hover:shadow-[0_20px_50px_rgba(15,42,94,0.45)]"
          >
            <div
              className="absolute top-0 right-0 bottom-0 w-2/5 pointer-events-none
              bg-[radial-gradient(circle_at_right,rgba(255,255,255,0.08)_0%,transparent_70%)]"
            />
            <div className="text-[56px] mb-5">🏑</div>
            <h3 className="font-['Bebas_Neue',cursive] text-[38px] tracking-[0.04em] mb-3">
              {t("divisions.indoor.title")}
            </h3>
            <p className="text-white/70 leading-[1.7] text-[15px] mb-7">
              {t("divisions.indoor.description")}
            </p>
            <div className="flex gap-6">
              {[
                ["6", t("divisions.common.playersPerTeam")],
                ["60", t("divisions.common.minutesPerMatch")],
                ["12", t("divisions.common.activeClubs")],
              ].map(([number, label]) => (
                <div key={label}>
                  <div className="font-['Bebas_Neue',cursive] text-[32px] leading-none">
                    {number}
                  </div>
                  <div className="text-xs text-white/55 font-semibold">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hockey Field — turf green (only place green is appropriate) */}
          <div
            className="rounded-2xl overflow-hidden relative p-12 text-white cursor-pointer transition-all duration-300 hover:-translate-y-1.5
            bg-[linear-gradient(135deg,#0a3d0a_0%,#16a34a_100%)]
            hover:shadow-[0_20px_50px_rgba(22,163,74,0.4)]"
          >
            <div
              className="absolute top-0 right-0 bottom-0 w-2/5 pointer-events-none
              bg-[radial-gradient(circle_at_right,rgba(255,255,255,0.08)_0%,transparent_70%)]"
            />
            <div className="text-[56px] mb-5">🏑</div>
            <h3 className="font-['Bebas_Neue',cursive] text-[38px] tracking-[0.04em] mb-3">
              {t("divisions.field.title")}
            </h3>
            <p className="text-white/70 leading-[1.7] text-[15px] mb-7">
              {t("divisions.field.description")}
            </p>
            <div className="flex gap-6">
              {[
                ["11", t("divisions.common.playersPerTeam")],
                ["70", t("divisions.common.minutesPerMatch")],
                ["36", t("divisions.common.activeClubs")],
              ].map(([number, label]) => (
                <div key={label}>
                  <div className="font-['Bebas_Neue',cursive] text-[32px] leading-none">
                    {number}
                  </div>
                  <div className="text-xs text-white/55 font-semibold">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── VisionMissionSection ────────────────────────────────────────────────────

export function VisionMissionSection({ observeRef, isVisible }: SectionInView) {
  const { t } = useTranslation("companyProfile");

  const missions = [
    {
      icon: "🏆",
      title: t("visionMission.missions.performance.title"),
      text: t("visionMission.missions.performance.text"),
    },
    {
      icon: "🌱",
      title: t("visionMission.missions.development.title"),
      text: t("visionMission.missions.development.text"),
    },
    {
      icon: "🏟️",
      title: t("visionMission.missions.infrastructure.title"),
      text: t("visionMission.missions.infrastructure.text"),
    },
    {
      icon: "📚",
      title: t("visionMission.missions.education.title"),
      text: t("visionMission.missions.education.text"),
    },
    {
      icon: "🤝",
      title: t("visionMission.missions.partnership.title"),
      text: t("visionMission.missions.partnership.text"),
    },
    {
      icon: "💡",
      title: t("visionMission.missions.innovation.title"),
      text: t("visionMission.missions.innovation.text"),
    },
  ];

  return (
    <section
      id="visi-misi"
      className="py-25 px-6 bg-(--bg-primary) relative overflow-hidden"
    >
      {/* Subtle red radial atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none
        bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(192,16,32,0.04)_0%,transparent_70%)]"
      />

      <div ref={observeRef} className="max-w-300 mx-auto relative z-1">
        {/* Header */}
        <div
          className={`text-center mb-17.5 transition-all duration-600 ease-in-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="font-['Barlow_Condensed',sans-serif] text-[13px] font-bold text-(--secondary-main) tracking-[0.2em] uppercase mb-3">
            {t("visionMission.kicker")}
          </div>
          <h2 className="font-['Bebas_Neue',cursive] text-[clamp(32px,5vw,54px)] text-(--text-primary) tracking-[0.03em]">
            {t("visionMission.title")}
          </h2>
        </div>

        {/* Vision card — red/navy gradient */}
        <div
          className={`rounded-3xl p-[56px_60px] mb-8 relative overflow-hidden
          bg-[linear-gradient(135deg,var(--primary-dark)_0%,var(--primary-main)_60%,var(--secondary-main)_100%)]
          transition-all duration-600 ease-in-out delay-100
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="absolute -top-7.5 -right-7.5 w-50 h-50 rounded-full bg-white/4" />
          <div className="absolute -bottom-15 right-15 w-75 h-75 rounded-full bg-white/2" />
          <div className="relative z-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12.5 h-12.5 rounded-xl bg-white/15 flex items-center justify-center text-[24px]">
                🎯
              </div>
              <div className="font-['Bebas_Neue',cursive] text-[28px] text-white/90 tracking-widest">
                {t("visionMission.visionLabel")}
              </div>
            </div>
            <p className="text-white text-[clamp(18px,3vw,26px)] font-['Barlow_Condensed',sans-serif] font-semibold leading-[1.4] italic">
              {t("visionMission.visionText")}
            </p>
          </div>
        </div>

        {/* Mission grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {missions.map((mission, i) => (
            <div
              key={mission.title}
              className={`bg-(--bg-secondary) rounded-2xl p-7 border border-(--border-light)
                transition-all duration-500 ease-in-out cursor-default
                hover:border-(--border-dark) hover:shadow-(--shadow-md)
                ${misiDelayClasses[i] ?? "delay-[0s]"}
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
            >
              <div className="text-[32px] mb-3.5">{mission.icon}</div>
              <h4 className="font-['Barlow_Condensed',sans-serif] text-[18px] font-bold text-(--primary-main) mb-2.5 tracking-[0.05em]">
                {mission.title}
              </h4>
              <p className="text-(--text-secondary) text-sm leading-[1.7]">
                {mission.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── AchievementsSection ─────────────────────────────────────────────────────

export function AchievementsSection({ observeRef, isVisible }: SectionInView) {
  const { t } = useTranslation("companyProfile");

  return (
    <section id="prestasi" className="py-25 px-6 bg-(--bg-secondary)">
      <div ref={observeRef} className="max-w-300 mx-auto">
        <div
          className={`text-center mb-15 transition-all duration-600 ease-in-out ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="font-['Barlow_Condensed',sans-serif] text-[13px] font-bold text-(--secondary-main) tracking-[0.2em] uppercase mb-3">
            {t("achievements.kicker")}
          </div>
          <h2 className="font-['Bebas_Neue',cursive] text-[clamp(32px,5vw,54px)] text-(--text-primary) tracking-[0.03em]">
            {t("achievements.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((achievement, i) => (
            <div
              key={achievement.id}
              className={`bg-(--bg-primary) rounded-2xl p-7 border border-(--border-light) relative overflow-hidden
                transition-all duration-500 ease-in-out hover:shadow-(--shadow-md) hover:-translate-y-0.5
                ${achieveDelayClasses[i] ?? "delay-[0s]"}
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              {/* Medal color accent bar */}
              <div
                className={`absolute top-0 left-0 w-1 h-full ${medalBgClass[achievement.medal]}`}
              />
              <div className="flex items-start gap-4">
                <MedalIcon medal={achievement.medal} />
                <div className="flex-1">
                  <div className="font-['Barlow_Condensed',sans-serif] text-[12px] font-bold text-(--text-disabled) tracking-[0.15em] uppercase mb-1.5">
                    {achievement.year}
                  </div>
                  <div className="font-bold text-base text-(--text-primary) mb-1.5 leading-snug">
                    {t(achievement.titleKey)}
                  </div>
                  <div className="text-[13px] text-(--text-secondary)">
                    {t(achievement.eventKey)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── BoardSection ─────────────────────────────────────────────────────────────

export function BoardSection({ observeRef, isVisible }: SectionInView) {
  const { t } = useTranslation("companyProfile");

  return (
    <section id="pengurus" className="py-25 px-6 bg-(--bg-primary)">
      <div ref={observeRef} className="max-w-300 mx-auto">
        <div
          className={`text-center mb-15 transition-all duration-600 ease-in-out ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="font-['Barlow_Condensed',sans-serif] text-[13px] font-bold text-(--secondary-main) tracking-[0.2em] uppercase mb-3">
            {t("board.kicker")}
          </div>
          <h2 className="font-['Bebas_Neue',cursive] text-[clamp(32px,5vw,54px)] text-(--text-primary) tracking-[0.03em]">
            {t("board.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {board.map((member, i) => (
            <div
              key={member.id}
              className={`rounded-2xl py-9 px-7 text-center bg-(--bg-secondary) border border-(--border-light)
                transition-all duration-500 ease-in-out hover:border-(--border-dark) hover:shadow-(--shadow-md)
                ${boardDelayClasses[i] ?? "delay-[0s]"}
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              {/* Avatar — red/navy gradient consistent with brand */}
              <div
                className="w-18 h-18 rounded-full mx-auto mb-4 flex items-center justify-center
                font-['Bebas_Neue',cursive] text-[26px] text-white tracking-[0.04em]
                bg-[linear-gradient(135deg,var(--primary-main),var(--secondary-main))]
                shadow-[0_6px_20px_rgba(192,16,32,0.3)]"
              >
                {member.initial}
              </div>
              <div className="font-bold text-base text-(--text-primary) mb-1.5">
                {member.name}
              </div>
              {/* Role badge — uses primary-light bg with primary-main text */}
              <div className="inline-block bg-(--primary-light) text-(--primary-main) rounded-2xl px-3.5 py-1 text-xs font-bold tracking-[0.05em]">
                {t(member.roleKey)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── BlogTeaserSection ───────────────────────────────────────────────────────

export function BlogTeaserSection() {
  const { t } = useTranslation("companyProfile");

  return (
    // Deep navy section — authority & gravitas before contact
    <section
      className="py-20 px-6 text-center
      bg-[linear-gradient(135deg,var(--secondary-dark)_0%,var(--secondary-main)_60%,var(--primary-dark)_100%)]"
    >
      <div className="max-w-300 mx-auto">
        <div className="font-['Barlow_Condensed',sans-serif] text-[13px] font-bold text-(--primary-light-50) tracking-[0.2em] uppercase mb-3">
          {t("blog.kicker")}
        </div>
        <h2 className="font-['Bebas_Neue',cursive] text-[clamp(36px,5vw,62px)] text-(--primary-light) tracking-[0.03em] mb-5">
          {t("blog.title")}
        </h2>
        <p className="text-(--primary-light-60) text-[17px] max-w-125 mx-auto mb-10 leading-[1.7]">
          {t("blog.description")}
        </p>
        <a
          href="#blog"
          className="inline-flex items-center gap-3 bg-(--primary-main) text-white py-4 px-10 rounded-lg no-underline
            text-[15px] font-extrabold tracking-[0.08em] uppercase
            transition-all duration-200 hover:-translate-y-0.75 hover:bg-(--primary-hover)
            shadow-[0_8px_30px_rgba(192,16,32,0.45)]"
        >
          {t("blog.cta")}{" "}
          <span className="text-[18px]" aria-hidden>
            →
          </span>
        </a>
      </div>
    </section>
  );
}

// ─── ContactSection ──────────────────────────────────────────────────────────

export function ContactSection({ observeRef, isVisible }: SectionInView) {
  const { t } = useTranslation("companyProfile");

  return (
    <section id="kontak" className="py-25 px-6 bg-(--bg-primary)">
      <div ref={observeRef} className="max-w-300 mx-auto">
        {/* Header */}
        <div
          className={`text-center mb-15 transition-all duration-600 ease-in-out ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="font-['Barlow_Condensed',sans-serif] text-[13px] font-bold text-(--secondary-main) tracking-[0.2em] uppercase mb-3">
            {t("contact.kicker")}
          </div>
          <h2 className="font-['Bebas_Neue',cursive] text-[clamp(32px,5vw,54px)] text-(--text-primary) tracking-[0.03em]">
            {t("contact.title")}
          </h2>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-15 items-start
          transition-all duration-600 ease-in-out delay-200
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Contact info list */}
          <div className="flex flex-col gap-6">
            {[
              {
                icon: "📍",
                label: t("contact.info.address.label"),
                value: t("contact.info.address.value"),
              },
              {
                icon: "📞",
                label: t("contact.info.phone.label"),
                value: t("contact.info.phone.value"),
              },
              {
                icon: "✉️",
                label: t("contact.info.email.label"),
                value: t("contact.info.email.value"),
              },
              {
                icon: "🌐",
                label: t("contact.info.website.label"),
                value: t("contact.info.website.value"),
              },
            ].map((contact) => (
              <div key={contact.label} className="flex gap-4.5 items-start">
                <div className="w-12 h-12 rounded-xl bg-(--bg-secondary) flex items-center justify-center text-[22px] shrink-0 border border-(--border-light)">
                  {contact.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-(--text-disabled) tracking-widest uppercase mb-1">
                    {contact.label}
                  </div>
                  <div className="text-(--text-primary) text-[15px] font-medium">
                    {contact.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <div className="bg-(--bg-secondary) rounded-2xl p-10 border border-(--border-light)">
            <h3 className="font-['Barlow_Condensed',sans-serif] text-[22px] font-bold text-(--text-primary) mb-7">
              {t("contact.form.title")}
            </h3>
            <div className="flex flex-col gap-5">
              {[
                {
                  label: t("contact.form.fields.fullName.label"),
                  type: "text",
                  placeholder: t("contact.form.fields.fullName.placeholder"),
                },
                {
                  label: t("contact.form.fields.email.label"),
                  type: "email",
                  placeholder: t("contact.form.fields.email.placeholder"),
                },
              ].map((field) => (
                <div key={field.label}>
                  <label className="text-[13px] font-bold text-(--text-secondary) block mb-2 tracking-[0.04em]">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full py-3 px-4 rounded-2.5 border border-(--border-main) bg-(--bg-primary)
                      text-(--text-primary) text-[15px] outline-none
                      transition-colors duration-200 focus:border-(--primary-main)"
                  />
                </div>
              ))}
              <div>
                <label className="text-[13px] font-bold text-(--text-secondary) block mb-2 tracking-[0.04em]">
                  {t("contact.form.fields.message.label")}
                </label>
                <textarea
                  placeholder={t("contact.form.fields.message.placeholder")}
                  rows={4}
                  className="w-full py-3 px-4 rounded-2.5 border border-(--border-main) bg-(--bg-primary)
                    text-(--text-secondary) text-[15px] outline-none resize-y font-[Barlow,sans-serif]
                    transition-colors duration-200 focus:border-(--primary-main)"
                />
              </div>
              <button
                className="bg-(--primary-main) text-white p-3.5 rounded-2.5 border-none
                  text-sm font-extrabold tracking-[0.08em] uppercase cursor-pointer
                  transition-all duration-200 hover:bg-(--primary-hover) hover:-translate-y-0.5
                  shadow-[0_4px_14px_rgba(192,16,32,0.35)]"
                onClick={(e) => {
                  e.preventDefault();
                  alert(t("contact.form.success"));
                }}
              >
                {t("contact.form.submit")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FooterSection ───────────────────────────────────────────────────────────

export function FooterSection() {
  const { t } = useTranslation("companyProfile");

  return (
    // Darkest navy — definitive close of the page
    <footer className="bg-[#040a16] text-white/65 py-15 px-6 pb-7.5">
      <div className="max-w-300 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-14">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-2.5 flex items-center justify-center text-[18px]
                bg-[linear-gradient(135deg,var(--primary-main),var(--secondary-main))]"
              >
                🏑
              </div>
              <div>
                <div className="font-['Bebas_Neue',cursive] text-[20px] tracking-[0.08em] text-white">
                  FHI
                </div>
                <div className="text-[10px] text-white/35 tracking-[0.15em]">
                  {t("footer.brand.subtitle")}
                </div>
              </div>
            </div>
            <p className="text-sm leading-[1.8] text-white/45 max-w-70">
              {t("footer.brand.description")}
            </p>
            <div className="flex gap-3 mt-6">
              {["📘", "📷", "🐦", "▶️"].map((icon, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-lg bg-white/[0.07] flex items-center justify-center
                  text-base cursor-pointer transition-colors duration-200 hover:bg-white/16"
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {[
            {
              title: t("footer.columns.navigation.title"),
              links: [
                t("footer.columns.navigation.links.about"),
                t("footer.columns.navigation.links.visionMission"),
                t("footer.columns.navigation.links.achievements"),
                t("footer.columns.navigation.links.board"),
                t("footer.columns.navigation.links.blog"),
              ],
            },
            {
              title: t("footer.columns.competitions.title"),
              links: [
                t("footer.columns.competitions.links.nationalLeague"),
                t("footer.columns.competitions.links.regionalChampionship"),
                t("footer.columns.competitions.links.juniorTournament"),
                t("footer.columns.competitions.links.seaGames"),
                t("footer.columns.competitions.links.asianGames"),
              ],
            },
            {
              title: t("footer.columns.information.title"),
              links: [
                t("footer.columns.information.links.regulations"),
                t("footer.columns.information.links.athletes"),
                t("footer.columns.information.links.schedule"),
                t("footer.columns.information.links.gallery"),
                t("footer.columns.information.links.contact"),
              ],
            },
          ].map((column) => (
            <div key={column.title}>
              <div className="font-['Barlow_Condensed',sans-serif] text-[13px] font-bold text-white/80 tracking-[0.15em] uppercase mb-5">
                {column.title}
              </div>
              <div className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-white/40 text-sm no-underline transition-colors duration-200 hover:text-white/80"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/6 pt-7 flex justify-between items-center flex-wrap gap-3">
          <div className="text-[13px] text-white/25">
            {t("footer.copyright")}
          </div>
          <div className="text-[13px] text-white/25">
            {t("footer.memberships")}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── GlobalAnimations ────────────────────────────────────────────────────────
// Keyframes are now in fhi-theme.css for separation of concerns.
// This component kept for backward-compat; it's now a no-op.

export function GlobalAnimations() {
  return (
    <style>{`
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      @keyframes pulse-glow {
        0%, 100% { box-shadow: 0 0 0 0 rgba(230,48,18,0.4); }
        50% { box-shadow: 0 0 0 10px rgba(230,48,18,0); }
      }
    `}</style>
  );
}
