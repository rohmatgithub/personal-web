import { NextResponse } from "next/server";

type ApiMatchCenterItem = {
  id: number;
  tournament_id: number;
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
  competition_key: string;
  date: string;
  time: string;
  venue: string;
  period?: string;
  category: "men" | "women" | "junior";
  category_name: string;
};

const matches: ApiMatchCenterItem[] = [
  {
    id: 1101,
    tournament_id: 110,
    status: "live",
    stage_type: "group_stage",
    stage_name: "Group A",
    home_team: "DKI Jakarta",
    away_team: "Jawa Barat",
    home_team_image_url: "",
    away_team_image_url: "",
    home_score: 2,
    away_score: 1,
    competition: "Kejurnas Hockey Putra 2026",
    competition_key: "kejurnas-putra-2026",
    date: "25 Feb 2026",
    time: "15:00 WIB",
    venue: "Lapangan Hockey GBK, Jakarta",
    period: "Q3 · 38:12",
    category: "men",
    category_name: "Putra",
  },
  {
    id: 1102,
    tournament_id: 110,
    status: "final",
    stage_type: "group_stage",
    stage_name: "Group A",
    home_team: "Jawa Tengah",
    away_team: "Jawa Timur",
    home_team_image_url: "",
    away_team_image_url: "",
    home_score: 1,
    away_score: 1,
    competition: "Kejurnas Hockey Putra 2026",
    competition_key: "kejurnas-putra-2026",
    date: "24 Feb 2026",
    time: "13:30 WIB",
    venue: "Lapangan Hockey GBK, Jakarta",
    category: "men",
    category_name: "Putra",
  },
  {
    id: 1103,
    tournament_id: 110,
    status: "upcoming",
    stage_type: "group_stage",
    stage_name: "Group B",
    home_team: "Banten",
    away_team: "DI Yogyakarta",
    home_team_image_url: "",
    away_team_image_url: "",
    home_score: null,
    away_score: null,
    competition: "Kejurnas Hockey Putra 2026",
    competition_key: "kejurnas-putra-2026",
    date: "26 Feb 2026",
    time: "10:00 WIB",
    venue: "Lapangan Hockey GBK, Jakarta",
    category: "men",
    category_name: "Putra",
  },
  {
    id: 1104,
    tournament_id: 110,
    status: "upcoming",
    stage_type: "group_stage",
    stage_name: "Group B",
    home_team: "Sumatera Utara",
    away_team: "Sulawesi Selatan",
    home_team_image_url: "",
    away_team_image_url: "",
    home_score: null,
    away_score: null,
    competition: "Kejurnas Hockey Putra 2026",
    competition_key: "kejurnas-putra-2026",
    date: "26 Feb 2026",
    time: "16:30 WIB",
    venue: "Lapangan Hockey GBK, Jakarta",
    category: "men",
    category_name: "Putra",
  },
  {
    id: 1201,
    tournament_id: 120,
    status: "final",
    stage_type: "semifinal",
    stage_name: "Semifinal",
    home_team: "DKI Jakarta",
    away_team: "Jawa Timur",
    home_team_image_url: "",
    away_team_image_url: "",
    home_score: 3,
    away_score: 2,
    competition: "Kejurnas Hockey Putri 2026",
    competition_key: "kejurnas-putri-2026",
    date: "23 Feb 2026",
    time: "19:00 WIB",
    venue: "Hockey Arena Senayan",
    category: "women",
    category_name: "Putri",
  },
  {
    id: 1202,
    tournament_id: 120,
    status: "upcoming",
    stage_type: "final",
    stage_name: "Final",
    home_team: "Jawa Barat",
    away_team: "Sulawesi Selatan",
    home_team_image_url: "",
    away_team_image_url: "",
    home_score: null,
    away_score: null,
    competition: "Kejurnas Hockey Putri 2026",
    competition_key: "kejurnas-putri-2026",
    date: "27 Feb 2026",
    time: "17:30 WIB",
    venue: "Hockey Arena Senayan",
    period: "Kick Off 17:30",
    category: "women",
    category_name: "Putri",
  },
  {
    id: 1301,
    tournament_id: 130,
    status: "upcoming",
    stage_type: "group_stage",
    stage_name: "Group A",
    home_team: "Banten",
    away_team: "Jawa Tengah",
    home_team_image_url: "",
    away_team_image_url: "",
    home_score: null,
    away_score: null,
    competition: "Liga Hockey Junior Nusantara 2026",
    competition_key: "liga-junior-nusantara-2026",
    date: "02 Mar 2026",
    time: "14:00 WIB",
    venue: "Bandung Hockey Center",
    category: "junior",
    category_name: "Junior",
  },
  {
    id: 1302,
    tournament_id: 130,
    status: "upcoming",
    stage_type: "group_stage",
    stage_name: "Group A",
    home_team: "DI Yogyakarta",
    away_team: "Sumatera Utara",
    home_team_image_url: "",
    away_team_image_url: "",
    home_score: null,
    away_score: null,
    competition: "Liga Hockey Junior Nusantara 2026",
    competition_key: "liga-junior-nusantara-2026",
    date: "02 Mar 2026",
    time: "16:00 WIB",
    venue: "Bandung Hockey Center",
    category: "junior",
    category_name: "Junior",
  },
  {
    id: 1303,
    tournament_id: 130,
    status: "final",
    stage_type: "group_stage",
    stage_name: "Group B",
    home_team: "Jawa Barat",
    away_team: "Sulawesi Selatan",
    home_team_image_url: "",
    away_team_image_url: "",
    home_score: 2,
    away_score: 0,
    competition: "Liga Hockey Junior Nusantara 2026",
    competition_key: "liga-junior-nusantara-2026",
    date: "24 Feb 2026",
    time: "11:00 WIB",
    venue: "Bandung Hockey Center",
    category: "junior",
    category_name: "Junior",
  },
  {
    id: 1304,
    tournament_id: 130,
    status: "upcoming",
    stage_type: "group_stage",
    stage_name: "Group B",
    home_team: "DKI Jakarta",
    away_team: "Jawa Timur",
    home_team_image_url: "",
    away_team_image_url: "",
    home_score: null,
    away_score: null,
    competition: "Liga Hockey Junior Nusantara 2026",
    competition_key: "liga-junior-nusantara-2026",
    date: "03 Mar 2026",
    time: "09:00 WIB",
    venue: "Bandung Hockey Center",
    category: "junior",
    category_name: "Junior",
  },
];

export async function GET(request: Request) {
  const url = new URL(request.url);
  const limitParam = Number(url.searchParams.get("limit") ?? "200");
  const tournamentIdParam = Number(url.searchParams.get("tournament_id") ?? "0");

  const limit = Number.isFinite(limitParam) && limitParam > 0 ? limitParam : 200;
  const tournamentId = Number.isFinite(tournamentIdParam) ? tournamentIdParam : 0;

  const filtered =
    tournamentId > 0
      ? matches.filter((item) => item.tournament_id === tournamentId)
      : matches;

  return NextResponse.json({
    status: { code: "OK" },
    data: filtered.slice(0, limit),
    other: null,
  });
}
