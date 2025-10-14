import data from "@/app/data/sample.json";

export default function JobDetail({ params }: { params: { id: string } }) {
  const job = (data as any).jobs.find((j: any) => j.id === params.id);
  if (!job) return <section><h1 className="text-3xl font-bold">Not found</h1></section>;

  return (
    <section>
      <h1 className="text-3xl font-bold">{job.title}</h1>
      <p className="text-sm text-neutral-400">{job.company} — {job.location}</p>
      <p className="text-sm text-neutral-400">
        Remote: {job.remote ? "Yes" : "No"} — Region: {job.region} — Posted: {job.posted}
      </p>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 mt-3">
        <p>{job.description_brief}</p>
        <p className="text-sm text-neutral-500 mt-2">Tags: {job.tags.join(", ")}</p>
        <div className="mt-3">
          <a className="inline-flex px-4 py-2 bg-emerald-300 text-black font-bold rounded-lg"
             href={job.url} target="_blank" rel="noreferrer">
            Apply on source
          </a>
        </div>
      </div>
    </section>
  );
}
