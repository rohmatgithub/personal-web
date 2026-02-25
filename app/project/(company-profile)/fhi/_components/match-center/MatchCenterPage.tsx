"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CompanyNavbar from "../company-profile/CompanyNavbar";
import ThemeSwitchButton from "../company-profile/ThemeSwitchButton";
import { useTranslation } from "../company-profile/i18n-context";

type MatchStatus = "live" | "final" | "upcoming";
type Tab = "live" | "results" | "schedule" | "standings";
type Competition = "all" | string;
type Category = "all" | string;

type Match = {
  id: number;
  tournamentId?: number;
  status: MatchStatus;
  homeTeam: string;
  awayTeam: string;
  homeImageUrl?: string;
  awayImageUrl?: string;
  homeScore: number | null;
  awayScore: number | null;
  stageType?: string;
  stageName?: string;
  competition: string;
  competitionKey: Competition;
  date: string;
  time: string;
  venue: string;
  period?: string;
  category: string;
  categoryName?: string;
};

type StandingRow = {
  rank: number;
  team: string;
  teamImageUrl?: string;
  mp: number;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
  gd: number;
  pts: number;
  form: Array<"W" | "D" | "L">;
  isHighlighted?: boolean;
};

type StandingGroupView = {
  groupId: number;
  categoryName: string;
  groupCode: string;
  rows: StandingRow[];
};

type ApiMatchCenterItem = {
  id: number;
  tournament_id: number;
  status: MatchStatus;
  stage_type: string;
  stage_name: string;
  home_team: string;
  away_team: string;
  home_team_image_url: string;
  away_team_image_url: string;
  home_score: number | null;
  away_score: number | null;
  competition: string;
  competition_key: string;
  date: string;
  time: string;
  venue: string;
  period?: string;
  category: string;
  category_name: string;
};

type ApiStandingsGroup = {
  group_id: number;
  group_name: string;
  tournament_category_name: string;
  teams: Array<{
    team_name: string;
    team_image_url: string;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goals_for: number;
    goals_against: number;
    goal_difference: number;
    points: number;
    form: string[];
    rank: number;
  }>;
};

const formColor: Record<"W" | "D" | "L", string> = {
  W: "bg-(--success) text-white",
  D: "bg-(--warning) text-white",
  L: "bg-(--error) text-white",
};

const fallbackMatches: Match[] = [
  {
    id: 1,
    tournamentId: 110,
    status: "live",
    homeTeam: "DKI Jakarta",
    awayTeam: "Jawa Barat",
    homeScore: 2,
    awayScore: 1,
    stageType: "group_stage",
    stageName: "Group A",
    competition: "Kejurnas Hockey Putra 2026",
    competitionKey: "kejurnas-putra-2026",
    date: "25 Feb 2026",
    time: "15:00 WIB",
    venue: "GBK Hockey Field, Jakarta",
    period: "Q3 · 38:12",
    category: "men",
    categoryName: "Putra",
  },
];

function LiveBadge() {
  const { t } = useTranslation("companyProfile");

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-(--error) px-2.5 py-0.5 text-[10px] font-extrabold tracking-[0.15em] text-white uppercase">
      <span className="relative size-1.5 rounded-full bg-white">
        <span className="absolute inset-0 animate-ping rounded-full bg-white" />
      </span>
      {t("matchCenter.live")}
    </span>
  );
}

function ScoreBadge({
  home,
  away,
  status,
}: {
  home: number | null;
  away: number | null;
  status: MatchStatus;
}) {
  const { t } = useTranslation("companyProfile");

  if (status === "upcoming") {
    return (
      <div className="font-['Bebas_Neue',cursive] text-[clamp(26px,4vw,36px)] tracking-[0.05em] text-(--text-disabled)">
        {t("matchCenter.vs")}
      </div>
    );
  }

  const homeWin = (home ?? 0) > (away ?? 0);
  const awayWin = (away ?? 0) > (home ?? 0);

  return (
    <div className="flex items-center gap-2 font-['Bebas_Neue',cursive] text-[clamp(28px,4vw,42px)] leading-none tracking-[0.03em]">
      <span
        className={
          homeWin
            ? "text-(--success)"
            : awayWin
              ? "text-(--text-disabled)"
              : "text-(--text-primary)"
        }
      >
        {home}
      </span>
      <span className="text-[22px] font-normal text-(--text-disabled)">-</span>
      <span
        className={
          awayWin
            ? "text-(--success)"
            : homeWin
              ? "text-(--text-disabled)"
              : "text-(--text-primary)"
        }
      >
        {away}
      </span>
    </div>
  );
}

function TeamBadge({ name, imageUrl }: { name: string; imageUrl?: string }) {
  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        alt={name}
        width={36}
        height={36}
        className="inline-block size-9 rounded-full border border-(--border-light) object-cover"
        unoptimized
      />
    );
  }

  return <span className="text-2xl">🏑</span>;
}

function MatchCard({ match }: { match: Match }) {
  const { t } = useTranslation("companyProfile");
  const isFeaturedHome = match.homeTeam.toLowerCase().includes("dki jakarta");

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border bg-(--bg-secondary) transition-all duration-300 hover:-translate-y-0.5 hover:shadow-(--shadow-md) ${
        match.status === "live"
          ? "border-(--error-50)"
          : "border-(--border-light)"
      }`}
    >
      <div
        className={`h-0.5 w-full ${
          match.status === "live"
            ? "bg-(--error)"
            : match.status === "final"
              ? "bg-[linear-gradient(to_right,var(--primary-main),var(--secondary-main))]"
              : "bg-(--border-main)"
        }`}
      />

      <div className="px-6 py-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="max-w-[60%]">
            <span className="block truncate text-[11px] font-bold tracking-widest text-(--text-disabled) uppercase">
              {match.competition}
            </span>
            {(match.stageName || match.stageType) && (
              <span className="mt-0.5 block truncate text-[10px] font-semibold tracking-[0.08em] text-(--text-disabled) uppercase opacity-80">
                {(match.stageName || match.stageType || "").replace(/_/g, " ")}
              </span>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {match.status === "live" && <LiveBadge />}
            {match.status === "final" && (
              <span className="rounded-full border border-(--border-light) bg-(--bg-primary) px-2.5 py-0.5 text-[11px] font-bold tracking-widest text-(--text-disabled) uppercase">
                {t("matchCenter.ft")}
              </span>
            )}
            {match.status === "upcoming" && (
              <span className="rounded-full bg-(--info)/10 px-2.5 py-0.5 text-[11px] font-bold tracking-widest text-(--info) uppercase">
                {match.date}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="text-right">
            <div className="mb-1.5">
              <TeamBadge name={match.homeTeam} imageUrl={match.homeImageUrl} />
            </div>
            <div
              className={`font-['Barlow_Condensed',sans-serif] text-[15px] font-bold tracking-[0.04em] ${isFeaturedHome ? "text-(--primary-main)" : "text-(--text-primary)"}`}
            >
              {match.homeTeam}
            </div>
          </div>

          <div className="flex flex-col items-center gap-1">
            <ScoreBadge
              home={match.homeScore}
              away={match.awayScore}
              status={match.status}
            />
            {match.status === "live" && match.period && (
              <span className="animate-pulse text-[11px] font-bold tracking-[0.08em] text-(--error)">
                {match.period}
              </span>
            )}
            {match.status === "upcoming" && (
              <span className="mt-0.5 text-[12px] font-semibold text-(--text-secondary)">
                {match.time}
              </span>
            )}
            {match.status === "final" && (
              <span className="text-[11px] text-(--text-disabled)">
                {match.date}
              </span>
            )}
          </div>

          <div className="text-left">
            <div className="mb-1.5">
              <TeamBadge name={match.awayTeam} imageUrl={match.awayImageUrl} />
            </div>
            <div className="font-['Barlow_Condensed',sans-serif] text-[15px] font-bold tracking-[0.04em] text-(--text-primary)">
              {match.awayTeam}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-1.5 border-t border-(--border-light) pt-4">
          <span className="text-[12px]">📍</span>
          <span className="truncate text-[12px] text-(--text-disabled)">
            {match.venue}
          </span>
        </div>
      </div>
    </div>
  );
}

function StandingsTable({ rows }: { rows: StandingRow[] }) {
  const { t } = useTranslation("companyProfile");

  return (
    <div className="overflow-hidden rounded-2xl border border-(--border-light) bg-(--bg-secondary)">
      <div className="overflow-x-auto">
        <table className="min-w-160 w-full text-sm">
          <thead>
            <tr className="border-b border-(--border-light) bg-(--bg-tertiary)">
              <th className="w-8 px-4 py-3 text-left text-[11px] font-bold tracking-[0.12em] text-(--text-disabled) uppercase">
                #
              </th>
              <th className="px-4 py-3 text-left text-[11px] font-bold tracking-[0.12em] text-(--text-disabled) uppercase">
                {t("matchCenter.table.team")}
              </th>
              {"MP W D L GF GA GD Pts".split(" ").map((head) => (
                <th
                  key={head}
                  className="px-4 py-3 text-center text-[11px] font-bold tracking-[0.12em] text-(--text-disabled) uppercase"
                >
                  {head}
                </th>
              ))}
              <th className="hidden px-4 py-3 text-center text-[11px] font-bold tracking-[0.12em] text-(--text-disabled) uppercase md:table-cell">
                Form
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={`${row.team}-${row.rank}`}
                className={`border-b border-(--border-light) transition-colors last:border-b-0 ${row.isHighlighted ? "bg-(--primary-light-60)" : index % 2 === 0 ? "bg-(--bg-secondary)" : "bg-(--bg-primary-06)"}`}
              >
                <td className="px-4 py-3.5">
                  <span
                    className={`inline-flex size-6 items-center justify-center rounded-full text-[12px] font-extrabold ${row.rank === 1 ? "bg-(--info) text-white" : row.rank === 2 ? "bg-[#9BA3AF] text-white" : row.rank === 3 ? "bg-[#CD7F32] text-white" : "font-normal text-(--text-disabled)"}`}
                  >
                    {row.rank}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    {row.teamImageUrl ? (
                      <Image
                        src={row.teamImageUrl}
                        alt={row.team}
                        width={24}
                        height={24}
                        className="size-6 rounded-full border border-(--border-light) object-cover"
                        unoptimized
                      />
                    ) : (
                      <span className="text-lg">🏑</span>
                    )}
                    <span
                      className={`font-['Barlow_Condensed',sans-serif] text-[15px] font-bold tracking-[0.03em] ${row.isHighlighted ? "text-(--primary-main)" : "text-(--text-primary)"}`}
                    >
                      {row.team}
                    </span>
                  </div>
                </td>
                {[row.mp, row.w, row.d, row.l, row.gf, row.ga].map(
                  (value, i) => (
                    <td
                      key={i}
                      className="px-4 py-3.5 text-center text-[13px] text-(--text-secondary)"
                    >
                      {value}
                    </td>
                  ),
                )}
                <td
                  className={`px-4 py-3.5 text-center text-[13px] font-semibold ${row.gd > 0 ? "text-(--success)" : row.gd < 0 ? "text-(--error)" : "text-(--text-secondary)"}`}
                >
                  {row.gd > 0 ? `+${row.gd}` : row.gd}
                </td>
                <td
                  className={`px-4 py-3.5 text-center font-['Bebas_Neue',cursive] text-[18px] tracking-[0.04em] ${row.isHighlighted ? "text-(--primary-main)" : "text-(--text-primary)"}`}
                >
                  {row.pts}
                </td>
                <td className="hidden px-4 py-3.5 md:table-cell">
                  <div className="flex items-center justify-center gap-1">
                    {row.form.map((r, i) => (
                      <span
                        key={i}
                        className={`flex size-5 items-center justify-center rounded-sm text-[10px] font-extrabold ${formColor[r]}`}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function MatchCenterPage() {
  const { t } = useTranslation("companyProfile");

  const [activeTab, setActiveTab] = useState<Tab>("live");
  const [compFilter, setCompFilter] = useState<Competition>("all");
  const [catFilter, setCatFilter] = useState<Category>("all");
  const [matchItems, setMatchItems] = useState<Match[]>(fallbackMatches);
  const [selectedTournamentId, setSelectedTournamentId] = useState(0);
  const [standingsGroups, setStandingsGroups] = useState<StandingGroupView[]>(
    [],
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.title = t("matchCenter.metaTitle");
  }, [t]);

  useEffect(() => {
    let mounted = true;

    async function loadMatchCenter() {
      try {
        const response = await fetch("/api/fhi/match-center?limit=200", {
          cache: "no-store",
        });
        const json = (await response.json()) as {
          status?: { code?: string };
          data?: ApiMatchCenterItem[];
        };

        if (
          !mounted ||
          !response.ok ||
          json.status?.code !== "OK" ||
          !Array.isArray(json.data)
        ) {
          return;
        }

        setMatchItems(
          json.data.map((item) => ({
            id: item.id,
            tournamentId: item.tournament_id,
            status: item.status,
            stageType: item.stage_type,
            stageName: item.stage_name,
            homeTeam: item.home_team,
            awayTeam: item.away_team,
            homeImageUrl: item.home_team_image_url,
            awayImageUrl: item.away_team_image_url,
            homeScore: item.home_score,
            awayScore: item.away_score,
            competition: item.competition,
            competitionKey: item.competition_key,
            date: item.date,
            time: item.time,
            venue: item.venue,
            period: item.period,
            category: item.category,
            categoryName: item.category_name,
          })),
        );

        const firstTournament =
          json.data.find((item) => item.tournament_id > 0)?.tournament_id ?? 0;
        if (firstTournament > 0) {
          setSelectedTournamentId(firstTournament);
        }
      } catch {
        // keep fallback matches
      }
    }

    void loadMatchCenter();

    return () => {
      mounted = false;
    };
  }, []);

  const tournamentIdForStandings = useMemo(() => {
    const baseItems =
      compFilter === "all"
        ? matchItems
        : matchItems.filter((item) => item.competitionKey === compFilter);
    const byFilter =
      baseItems.find((item) => (item.tournamentId || 0) > 0)?.tournamentId ?? 0;
    if (byFilter > 0) return byFilter;
    if (selectedTournamentId > 0) return selectedTournamentId;
    return (
      matchItems.find((item) => (item.tournamentId || 0) > 0)?.tournamentId ?? 0
    );
  }, [compFilter, matchItems, selectedTournamentId]);

  useEffect(() => {
    let mounted = true;
    if (tournamentIdForStandings <= 0) return;

    async function loadStandings() {
      try {
        const response = await fetch(
          `/api/fhi/standings?tournament_id=${tournamentIdForStandings}`,
          {
            cache: "no-store",
          },
        );
        const json = (await response.json()) as {
          status?: { code?: string };
          data?: ApiStandingsGroup[];
        };

        if (
          !mounted ||
          !response.ok ||
          json.status?.code !== "OK" ||
          !Array.isArray(json.data)
        ) {
          return;
        }

        setStandingsGroups(
          json.data.map((group) => ({
            groupId: group.group_id,
            categoryName: group.tournament_category_name || "",
            groupCode: group.group_name || "",
            rows: group.teams.map((team) => ({
              rank: team.rank,
              team: team.team_name,
              teamImageUrl: team.team_image_url,
              mp: team.played,
              w: team.won,
              d: team.drawn,
              l: team.lost,
              gf: team.goals_for,
              ga: team.goals_against,
              gd: team.goal_difference,
              pts: team.points,
              form: team.form
                .filter(
                  (value): value is "W" | "D" | "L" =>
                    value === "W" || value === "D" || value === "L",
                )
                .slice(-5),
              isHighlighted: team.team_name.toLowerCase().includes("dki jakarta"),
            })),
          })),
        );
      } catch {
        setStandingsGroups([]);
      }
    }

    void loadStandings();

    return () => {
      mounted = false;
    };
  }, [tournamentIdForStandings]);

  const liveCount = useMemo(
    () => matchItems.filter((m) => m.status === "live").length,
    [matchItems],
  );

  const filteredMatches = useMemo(() => {
    return matchItems.filter((match) => {
      const tabMatch =
        activeTab === "live"
          ? match.status === "live"
          : activeTab === "results"
            ? match.status === "final"
            : activeTab === "schedule"
              ? match.status === "upcoming"
              : true;
      const compMatch =
        compFilter === "all" || match.competitionKey === compFilter;
      const catMatch = catFilter === "all" || match.category === catFilter;
      return tabMatch && compMatch && catMatch;
    });
  }, [activeTab, catFilter, compFilter, matchItems]);

  const competitions = useMemo(() => {
    const unique = new Map<string, string>();
    matchItems.forEach((item) => {
      if (!item.competitionKey || item.competitionKey === "all") return;
      unique.set(item.competitionKey, item.competition);
    });

    return [
      { key: "all" as Competition, label: t("matchCenter.all") },
      ...Array.from(unique.entries())
        .map(([key, label]) => ({ key, label }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    ];
  }, [matchItems, t]);

  const categories = useMemo(() => {
    const unique = new Map<string, string>();
    matchItems.forEach((item) => {
      if (!item.category || item.category === "all") return;
      unique.set(item.category, item.categoryName || item.category);
    });

    return [
      { key: "all" as Category, label: t("matchCenter.all") },
      ...Array.from(unique.entries())
        .map(([key, label]) => ({ key, label }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    ];
  }, [matchItems, t]);

  const tabs: Array<{ key: Tab; label: string; count?: number }> = [
    { key: "live", label: t("matchCenter.live"), count: liveCount },
    { key: "results", label: t("matchCenter.results") },
    { key: "schedule", label: t("matchCenter.schedule") },
    { key: "standings", label: t("matchCenter.standings") },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-(--bg-primary) font-['Barlow',sans-serif] text-(--text-primary)">
      <ThemeSwitchButton />
      <CompanyNavbar
        menuOpen={menuOpen}
        scrolled={scrolled}
        onToggleMenu={() => setMenuOpen((prev) => !prev)}
        onCloseMenu={() => setMenuOpen(false)}
        sectionHrefPrefix="/project/fhi"
        activeLinkLabel={t("navbar.links.matches")}
      />

      <section className="relative overflow-hidden [background:var(--hero-bg)] px-6 pt-25 pb-14">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 right-0 size-125 rounded-full bg-[radial-gradient(circle,rgba(232,17,45,0.12)_0%,transparent_70%)]" />
          <div className="absolute bottom-0 left-[10%] h-75 w-100 rounded-full bg-[radial-gradient(circle,rgba(15,42,94,0.5)_0%,transparent_70%)]" />
          <div className="absolute top-0 right-[20%] h-full w-px -skew-x-20 bg-[linear-gradient(to_bottom,transparent,rgba(232,17,45,0.4),transparent)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-300">
          <div className="mb-6 flex items-center gap-2 text-[12px] tracking-[0.08em] text-(--text-on-primary-60) uppercase">
            <Link
              href="/project/fhi"
              className="no-underline transition-colors hover:text-(--text-on-primary)"
            >
              FHI
            </Link>
            <span>/</span>
            <span className="text-(--text-on-primary)">
              {t("matchCenter.title")}
            </span>
          </div>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              {liveCount > 0 && (
                <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-(--error) px-3 py-1 text-[11px] font-extrabold tracking-[0.15em] text-white uppercase">
                  <span className="relative size-1.5 rounded-full bg-white">
                    <span className="absolute inset-0 animate-ping rounded-full bg-white" />
                  </span>
                  {liveCount} LIVE
                </div>
              )}

              <h1 className="font-['Bebas_Neue',cursive] text-[clamp(40px,7vw,80px)] leading-none tracking-[0.04em] text-(--text-on-primary)">
                MATCH{" "}
                <span className="text-(--primary-main) drop-shadow-[0_2px_16px_rgba(232,17,45,0.5)]">
                  CENTER
                </span>
              </h1>
              <p className="mt-2 max-w-110 text-[15px] leading-relaxed text-(--text-on-primary-70)">
                {t("matchCenter.heroDescription")}
              </p>
            </div>

            <div className="shrink-0 text-[12px] text-(--text-on-primary-55)">
              🕐 {t("matchCenter.lastUpdated")} 25 Feb 2026, 15:12 WIB
            </div>
          </div>

          <div className="mt-10 flex w-full max-w-md gap-1 rounded-[14px] bg-[#ffffffcd] p-1 shadow-[0_4px_14px_rgba(0,0,0,0.1)]">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-[10px] border-none px-3 py-2.5 text-[13px] font-bold tracking-[0.04em] outline-none transition-all ${
                  activeTab === tab.key
                    ? "bg-(--primary-main) text-white shadow-[0_4px_14px_rgba(232,17,45,0.4)]"
                    : "bg-transparent text-(--text-on-primary-70) hover:text-(--text-on-primary)"
                }`}
              >
                {tab.label}
                {tab.count !== undefined && tab.count > 0 && (
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-extrabold ${activeTab === tab.key ? "bg-white/25 text-white" : "bg-(--error) text-white"}`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto max-w-300">
          {activeTab !== "standings" && (
            <div className="mb-8 flex flex-wrap gap-3">
              <div className="flex flex-wrap gap-1.5">
                {competitions.map((competition) => (
                  <button
                    key={competition.key}
                    onClick={() => setCompFilter(competition.key)}
                    className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-[12px] font-bold tracking-[0.04em] transition-all ${
                      compFilter === competition.key
                        ? "border-(--secondary-main) bg-(--secondary-main) text-white"
                        : "border-(--border-main) bg-(--bg-secondary) text-(--text-secondary) hover:border-(--secondary-main)/50"
                    }`}
                  >
                    {competition.label}
                  </button>
                ))}
              </div>

              <div className="hidden h-7 w-px self-center bg-(--border-main) sm:block" />

              <div className="flex flex-wrap gap-1.5">
                {categories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setCatFilter(category.key)}
                    className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-[12px] font-bold tracking-[0.04em] transition-all ${
                      catFilter === category.key
                        ? "border-(--primary-main) bg-(--primary-main) text-white"
                        : "border-(--border-main) bg-(--bg-secondary) text-(--text-secondary) hover:border-(--primary-main)/50"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab !== "standings" && (
            <>
              {filteredMatches.length === 0 ? (
                <div className="py-20 text-center">
                  <div className="mb-4 text-5xl">🏑</div>
                  <p className="text-[16px] font-medium text-(--text-disabled)">
                    {activeTab === "live"
                      ? t("matchCenter.emptyLive")
                      : activeTab === "results"
                        ? t("matchCenter.emptyResults")
                        : t("matchCenter.emptySchedule")}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredMatches.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === "standings" && (
            <div>
              <div className="mb-4 flex items-center gap-2 text-[12px] text-(--text-disabled)">
                <span className="flex items-center gap-1">
                  <span className="inline-block size-3 rounded-sm bg-(--success)" />
                  W
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-block size-3 rounded-sm bg-(--warning)" />
                  D
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-block size-3 rounded-sm bg-(--error)" />
                  L
                </span>
              </div>

              <div className="space-y-8">
                {standingsGroups.map((group) => (
                  <div key={`${group.groupId}-${group.categoryName}`}>
                    <div className="mb-6">
                      <div className="mb-1 font-['Barlow_Condensed',sans-serif] text-[12px] font-bold tracking-[0.15em] text-(--secondary-main) uppercase">
                        {group.categoryName || t("matchCenter.standings")}
                      </div>
                      <h3 className="font-['Bebas_Neue',cursive] text-[28px] tracking-[0.04em] text-(--text-primary)">
                        {t("matchCenter.standingsLabel")}{" "}
                        {group.groupCode || t("matchCenter.group")}
                      </h3>
                    </div>
                    <StandingsTable rows={group.rows} />
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2">
                <span className="inline-block size-3 rounded-sm border border-(--primary-main)/30 bg-(--primary-light)" />
                <span className="text-[12px] text-(--text-disabled)">
                  {t("matchCenter.indonesiaTeam")}
                </span>
                <span className="ml-4 text-[12px] text-(--text-disabled)">
                  • {t("matchCenter.legendTop4")}
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-(--border-light) bg-(--bg-secondary) px-6 py-16">
        <div className="mx-auto flex max-w-300 flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <div className="mb-1.5 font-['Barlow_Condensed',sans-serif] text-[12px] font-bold tracking-[0.2em] text-(--secondary-main) uppercase">
              {t("matchCenter.footerKicker")}
            </div>
            <h3 className="font-['Bebas_Neue',cursive] text-[28px] tracking-[0.04em] text-(--text-primary)">
              {t("matchCenter.footerTitle")}
            </h3>
            <p className="mt-1 text-[14px] text-(--text-secondary)">
              {t("matchCenter.footerDescription")}
            </p>
          </div>
          <Link
            href="/project/fhi"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-(--primary-main) px-8 py-3.5 text-[13px] font-extrabold tracking-[0.08em] text-white no-underline uppercase shadow-[0_6px_24px_rgba(192,16,32,0.35)] transition-all duration-200 hover:-translate-y-0.75 hover:bg-(--primary-hover)"
          >
            🏑 {t("matchCenter.backToProfile")}{" "}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
