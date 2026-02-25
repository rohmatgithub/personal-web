import { NextResponse } from "next/server";

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

const matches: ApiTeaserMatch[] = [
  {
    id: 1,
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
    period: "Q3 · 38:12",
  },
  {
    id: 2,
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
  },
  {
    id: 3,
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
    period: "10:00 WIB",
  },
  {
    id: 4,
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
    period: "16:30 WIB",
  },
];

export async function GET(request: Request) {
  const url = new URL(request.url);
  const limitParam = Number(url.searchParams.get("limit") ?? "3");
  const limit = Number.isFinite(limitParam) && limitParam > 0 ? limitParam : 3;

  return NextResponse.json({
    status: { code: "OK" },
    data: matches.slice(0, limit),
  });
}
