async function getData() {
  const data = await import("./data/sample.json");
  return data.default;
}

export default async function HomePage() {
  const data = await getData();
  const total = data.jobs.length;
  const remote = data.jobs.filter((j: any) => j.remote).length;
  const emea = data.jobs.filter((j: any) => j.region === "EMEA").length;

  return (
    <section>
      <h1 className="text-3xl font-bold">Daily Music Tech Jobs</h1>
      <p className="text-sm text-neutral-400 mt-1">
        Run: <b>{data.run_id}</b> — Generated: {new Date(data.generated_at).toLocaleString()}
      </p>

      <div className="grid md:grid-cols-3 gap-3 my-4">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
          <div className="text-neutral-400 text-sm">Total</div>
          <div className="text-xl font-extrabold">{total}</div>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
          <div className="text-neutral-400 text-sm">Remote</div>
          <div className="text-xl font-extrabold">{remote}</div>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
          <div className="text-neutral-400 text-sm">EMEA</div>
          <div className="text-xl font-extrabold">{emea}</div>
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
        <h2 className="text-xl font-semibold">Explore the listings</h2>
        <p className="text-sm text-neutral-400 mt-1">
          Filter by region, remote, and keywords. Export JSON later.
        </p>
        <a className="inline-flex mt-3 px-4 py-2 bg-emerald-300 text-black font-bold rounded-lg" href="/jobs">
          Open Jobs
        </a>
      </div>
    </section>
  );
}
