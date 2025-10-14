"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Job = {
  id: string; title: string; company: string; location: string;
  remote: boolean; region: string; source: string; url: string;
  score: number; tags: string[]; posted: string; description_brief: string;
};
type JobsResponse = { run_id: string; generated_at: string; jobs: Job[] };

export default function JobsPage() {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("EMEA");
  const [remote, setRemote] = useState("any");
  const [data, setData] = useState<JobsResponse | null>(null);

  async function load() {
    const params = new URLSearchParams();
    params.set("region", region);
    params.set("remote", remote);
    params.set("q", q);
    const res = await fetch("/api/jobs?" + params.toString(), { cache: "no-store" });
    setData(await res.json());
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [q, region, remote]);

  return (
    <section>
      <h1 className="text-3xl font-bold">Jobs</h1>
      <p className="text-sm text-neutral-400 mt-1">
        {data ? <>Run: <b>{data.run_id}</b> — Generated: {new Date(data.generated_at).toLocaleString()}</> : "Loading..."}
      </p>

      <div className="grid md:grid-cols-4 gap-3 my-4">
        <input className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2"
               placeholder="Search title, company, tags..." value={q} onChange={e => setQ(e.target.value)} />
        <select className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2"
                value={region} onChange={e => setRegion(e.target.value)}>
          <option value="ALL">All Regions</option>
          <option value="EMEA">EMEA</option>
        </select>
        <select className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2"
                value={remote} onChange={e => setRemote(e.target.value)}>
          <option value="any">Any Remote</option>
          <option value="true">Remote Only</option>
          <option value="false">On-site/Hybrid</option>
        </select>
        <a className="inline-flex items-center justify-center px-4 py-2 bg-sky-300 text-black font-bold rounded-lg"
           href="/api/jobs" target="_blank" rel="noreferrer">
          Export JSON
        </a>
      </div>

      <div className="grid gap-3">
        {data?.jobs.map(j => (
          <div
  key={j.id}
  className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 hover:border-neutral-700 hover:shadow transition"
>
            <div className="flex items-start justify-between">
              <div>
                <Link href={"/jobs/" + j.id} className="font-bold hover:underline">{j.title}</Link>
                <div className="text-sm text-neutral-400">
                  {j.company} — {j.location} —{" "}
                  <span className={`text-xs px-2 py-0.5 rounded-full ${j.remote ? "bg-green-900 text-green-200" : "bg-neutral-800"}`}>
                    {j.remote ? "Remote" : "On-site"}
                  </span>
                </div>
              </div>
              <div className="font-extrabold text-lg">{j.score}</div>
            </div>
            <div className="text-sm text-neutral-300 mt-2">{j.description_brief}</div>
            <div className="text-sm text-neutral-500 mt-1">
              Tags: {j.tags.join(", ")} | Posted: {j.posted} | Source: {j.source}
            </div>
            <div className="mt-2">
              <a
  className="inline-flex items-center justify-center px-4 py-2 bg-sky-300 text-black font-bold rounded-lg"
  href={"/api/jobs/csv?" + new URLSearchParams({ q, region, remote }).toString()}
>
  Export CSV
</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
