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
    home_team: "Indonesia",
    away_team: "Malaysia",
    home_team_image_url: "",
    away_team_image_url: "",
    home_score: 2,
    away_score: 1,
    competition: "SEA Games Qualifier",
    period: "Q3 · 38:12",
  },
  {
    id: 2,
    status: "final",
    stage_type: "semifinal",
    stage_name: "Semifinal",
    home_team: "Thailand",
    away_team: "Indonesia",
    home_team_image_url: "",
    away_team_image_url: "",
    home_score: 1,
    away_score: 3,
    competition: "AHF Cup",
  },
  {
    id: 3,
    status: "upcoming",
    stage_type: "final",
    stage_name: "Final",
    home_team: "Indonesia",
    away_team: "Vietnam",
    home_team_image_url: "",
    away_team_image_url: "",
    home_score: null,
    away_score: null,
    competition: "ASEAN Hockey Championship",
    period: "20:00 WIB",
  },
  {
    id: 4,
    status: "upcoming",
    stage_type: "group_stage",
    stage_name: "Group B",
    home_team: "Singapore",
    away_team: "Indonesia",
    home_team_image_url: "",
    away_team_image_url: "",
    home_score: null,
    away_score: null,
    competition: "Asia Trophy",
    period: "18:30 WIB",
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
