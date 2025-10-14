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

  return NextResponse.json({
    run_id: (data as any).run_id,
    generated_at: (data as any).generated_at,
    jobs
  });
}
