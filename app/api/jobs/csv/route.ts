import { NextRequest, NextResponse } from "next/server";
import data from "@/app/data/sample.json";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").toLowerCase();
  const region = searchParams.get("region") || "ALL";
  const remote = searchParams.get("remote") || "any";

  let jobs = (data as any).jobs as any[];
  if (region !== "ALL") jobs = jobs.filter(j => j.region === region);
  if (remote === "true") jobs = jobs.filter(j => j.remote);
  if (remote === "false") jobs = jobs.filter(j => !j.remote);
  if (q) jobs = jobs.filter(j =>
    (j.title + " " + j.company + " " + j.location + " " + j.tags.join(" "))
      .toLowerCase().includes(q)
  );

  const header = ["id","title","company","location","remote","region","score","posted","tags","url"].join(",");
  const rows = jobs.map(j => [
    j.id,
    j.title.replace(/,/g," "),
    j.company.replace(/,/g," "),
    j.location.replace(/,/g," "),
    j.remote,
    j.region,
    j.score,
    j.posted,
    (j.tags||[]).join("|"),
    j.url
  ].join(","));
  const csv = [header, ...rows].join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=jobs.csv"
    }
  });
}
