"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "./i18n-context";
import type { SectionInView } from "./types";

type TeaserMatch = {
  id: number;
  status: "live" | "final" | "upcoming";
  stageType: string;
  stageName: string;
  homeTeam: string;
  awayTeam: string;
  homeImageUrl: string;
  awayImageUrl: string;
  homeScore: number | null;
  awayScore: number | null;
  competition: string;
  period?: string;
};

type ApiTeaserMatch = {
  id: number;
  status: "live" | "final" | "upcoming";
  stage_type: string;
  stage_name: string;
  home_team: string;
  away_team: string;
  home_team_image_url: string;
  away_team_image_url: string;
  home_score: number | null;
  away_score: number | null;
  competition: string;
  period?: string;
};

const fallbackTeaserMatches: TeaserMatch[] = [
  {
    id: 1,
    status: "live",
    stageType: "group_stage",
    stageName: "Group A",
    homeTeam: "DKI Jakarta",
    awayTeam: "Jawa Barat",
    homeImageUrl: "",
    awayImageUrl: "",
    homeScore: 2,
    awayScore: 1,
    competition: "Kejurnas Hockey Putra 2026",
    period: "Q3 · 38:12",
  },
  {
    id: 2,
    status: "final",
    stageType: "group_stage",
    stageName: "Group A",
    homeTeam: "Jawa Tengah",
    awayTeam: "Jawa Timur",
    homeImageUrl: "",
    awayImageUrl: "",
    homeScore: 1,
    awayScore: 1,
    competition: "Kejurnas Hockey Putra 2026",
  },
  {
    id: 3,
    status: "upcoming",
    stageType: "group_stage",
    stageName: "Group B",
    homeTeam: "Banten",
    awayTeam: "DI Yogyakarta",
    homeImageUrl: "",
    awayImageUrl: "",
    homeScore: null,
    awayScore: null,
    competition: "Kejurnas Hockey Putra 2026",
    period: "10:00 WIB",
  },
];

export function MatchTeaserSection({ observeRef, isVisible }: SectionInView) {
  const { t } = useTranslation("companyProfile");
  const [teaserMatches, setTeaserMatches] = useState<TeaserMatch[]>(
    fallbackTeaserMatches,
  );

  useEffect(() => {
    let mounted = true;

    async function loadTeaser() {
      try {
        const response = await fetch("/api/fhi/match-teaser?limit=3", {
          cache: "no-store",
        });
        const json = (await response.json()) as {
          status?: { code?: string };
          data?: ApiTeaserMatch[];
        };

        if (
          !mounted ||
          !response.ok ||
          json.status?.code !== "OK" ||
          !Array.isArray(json.data)
        ) {
          return;
        }

        setTeaserMatches(
          json.data.map((item) => ({
            id: item.id,
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
            period: item.period,
          })),
        );
      } catch {
        // Keep fallback data.
      }
    }

    void loadTeaser();

    return () => {
      mounted = false;
    };
  }, []);

  const liveCount = useMemo(
    () => teaserMatches.filter((m) => m.status === "live").length,
    [teaserMatches],
  );

  return (
    <section
      id="pertandingan"
      className="py-20 px-6 relative overflow-hidden
        bg-[linear-gradient(160deg,var(--secondary-dark)_0%,#0f2a5e_55%,var(--primary-dark)_100%)]"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-20 -right-15 w-105 h-105 rounded-full
          bg-[radial-gradient(circle,rgba(232,17,45,0.1)_0%,transparent_70%)]"
        />
        <div
          className="absolute -bottom-10 left-[5%] w-75 h-75 rounded-full
          bg-[radial-gradient(circle,rgba(15,42,94,0.5)_0%,transparent_70%)]"
        />
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04]"
          viewBox="0 0 1200 500"
          preserveAspectRatio="xMidYMid slice"
        >
          {[...Array(13)].map((_, i) => (
            <line
              key={`v${i}`}
              x1={i * 100}
              y1={0}
              x2={i * 100}
              y2={500}
              stroke="white"
              strokeWidth={1}
            />
          ))}
          {[...Array(6)].map((_, i) => (
            <line
              key={`h${i}`}
              x1={0}
              y1={i * 100}
              x2={1200}
              y2={i * 100}
              stroke="white"
              strokeWidth={1}
            />
          ))}
        </svg>
      </div>

      <div ref={observeRef} className="relative z-10 max-w-300 mx-auto">
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10
            transition-all duration-600 ease-in-out
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="font-['Barlow_Condensed',sans-serif] text-[12px] font-bold text-white/40 tracking-[0.2em] uppercase">
                {t("matchTeaser.kicker")}
              </div>
              {liveCount > 0 && (
                <span className="relative inline-flex items-center gap-1.5 bg-(--error) text-white text-[10px] font-extrabold tracking-[0.15em] uppercase px-2.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping absolute left-2.5" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white relative" />
                  {liveCount} {t("matchTeaser.live")}
                </span>
              )}
            </div>
            <h2 className="font-['Bebas_Neue',cursive] text-[clamp(30px,4.5vw,52px)] leading-none text-white tracking-[0.04em]">
              {t("matchTeaser.titlePrimary")}{" "}
              <span className="text-(--primary-main) drop-shadow-[0_2px_12px_rgba(232,17,45,0.5)]">
                {t("matchTeaser.titleAccent")}
              </span>
            </h2>
          </div>
          <Link
            href="/project/fhi/match-center"
            className="shrink-0 inline-flex items-center gap-2 text-white/60 text-[12px] font-bold tracking-[0.08em] uppercase
              no-underline border border-white/20 px-5 py-2.5 rounded-lg
              hover:text-white hover:border-white/50 transition-all duration-200 self-start sm:self-auto"
          >
            {t("matchTeaser.viewAll")} <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {teaserMatches.map((match, i) => {
            const isLive = match.status === "live";
            const isFinal = match.status === "final";
            const isUpcoming = match.status === "upcoming";
            const homeWin = (match.homeScore ?? 0) > (match.awayScore ?? 0);
            const awayWin = (match.awayScore ?? 0) > (match.homeScore ?? 0);

            return (
              <div
                key={match.id}
                style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
                className={`relative bg-white/6 backdrop-blur-sm border rounded-2xl overflow-hidden
                  transition-all duration-500 ease-in-out hover:-translate-y-0.5 hover:bg-white/10
                  ${isLive ? "border-(--error-50)" : "border-white/10"}
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <div
                  className={`h-0.5 w-full ${
                    isLive
                      ? "bg-(--error)"
                      : isFinal
                        ? "bg-[linear-gradient(to_right,var(--primary-main),rgba(255,255,255,0.3))]"
                        : "bg-white/20"
                  }`}
                />

                <div className="px-5 py-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="max-w-[70%]">
                      <span className="block text-[10px] font-bold text-white/35 tracking-widest uppercase truncate">
                        {match.competition}
                      </span>
                      <span className="block text-[10px] font-bold text-white/45 tracking-[0.08em] uppercase truncate mt-0.5">
                        {match.stageName || match.stageType.replace(/_/g, " ")}
                      </span>
                    </div>
                    {isLive && (
                      <span className="relative inline-flex items-center gap-1.5 bg-(--error) text-white text-[10px] font-extrabold tracking-[0.12em] uppercase px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping absolute left-2" />
                        <span className="w-1.5 h-1.5 rounded-full bg-white relative" />
                        {t("matchTeaser.live")}
                      </span>
                    )}
                    {isFinal && (
                      <span className="text-[10px] font-bold text-white/35 tracking-widest uppercase">
                        FT
                      </span>
                    )}
                    {isUpcoming && (
                      <span className="text-[10px] font-bold text-(--info) tracking-widest">
                        {match.period}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                    <div className="text-right">
                      <div className="text-xl mb-1">
                        {match.homeImageUrl ? (
                          <Image
                            src={match.homeImageUrl}
                            alt={match.homeTeam}
                            width={32}
                            height={32}
                            className="w-8 h-8 object-cover rounded-full border border-white/15 inline-block"
                            unoptimized
                          />
                        ) : (
                          <span>🏑</span>
                        )}
                      </div>
                      <div className="font-['Barlow_Condensed',sans-serif] text-[13px] font-bold text-white tracking-[0.04em] leading-tight">
                        {match.homeTeam}
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      {isUpcoming ? (
                        <span className="font-['Bebas_Neue',cursive] text-[22px] text-white/30 tracking-[0.05em]">
                          {t("matchTeaser.vs")}
                        </span>
                      ) : (
                        <div className="flex items-center gap-1.5 font-['Bebas_Neue',cursive] text-[30px] leading-none tracking-[0.03em]">
                          <span
                            className={
                              homeWin
                                ? "text-(--success)"
                                : awayWin
                                  ? "text-white/40"
                                  : "text-white"
                            }
                          >
                            {match.homeScore}
                          </span>
                          <span className="text-white/25 text-[18px]">–</span>
                          <span
                            className={
                              awayWin
                                ? "text-(--success)"
                                : homeWin
                                  ? "text-white/40"
                                  : "text-white"
                            }
                          >
                            {match.awayScore}
                          </span>
                        </div>
                      )}
                      {isLive && match.period && (
                        <span className="text-[10px] font-bold text-(--error) mt-0.5 animate-pulse">
                          {match.period}
                        </span>
                      )}
                    </div>

                    <div className="text-left">
                      <div className="text-xl mb-1">
                        {match.awayImageUrl ? (
                          <Image
                            src={match.awayImageUrl}
                            alt={match.awayTeam}
                            width={32}
                            height={32}
                            className="w-8 h-8 object-cover rounded-full border border-white/15 inline-block"
                            unoptimized
                          />
                        ) : (
                          <span>🏑</span>
                        )}
                      </div>
                      <div className="font-['Barlow_Condensed',sans-serif] text-[13px] font-bold text-white tracking-[0.04em] leading-tight">
                        {match.awayTeam}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className={`flex justify-center transition-all duration-600 ease-in-out delay-[0.45s]
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <Link
            href="/project/fhi/match-center"
            className="inline-flex items-center gap-3 bg-(--primary-main) text-white py-3.5 px-10 rounded-xl no-underline
              text-[13px] font-extrabold tracking-[0.08em] uppercase
              transition-all duration-200 hover:-translate-y-0.75 hover:bg-(--primary-hover)
              shadow-[0_8px_30px_rgba(232,17,45,0.4)]"
          >
            🏑 {t("matchTeaser.openMatchCenter")}{" "}
            <span className="text-[16px]" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
