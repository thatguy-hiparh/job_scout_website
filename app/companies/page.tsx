export default function CompaniesPage() {
  return (
    <section>
      <h1 className="text-3xl font-bold">Companies</h1>
      <p className="text-sm text-neutral-400 mt-1">
        Coming soon — aggregated stats, job velocity, and hiring trends by company.
      </p>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
          <h2 className="font-semibold text-lg">Spotify</h2>
          <p className="text-neutral-400 text-sm">Data, Product, and Music Ops roles</p>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
          <h2 className="font-semibold text-lg">Musixmatch</h2>
          <p className="text-neutral-400 text-sm">Metadata and B2B integration positions</p>
        </div>
      </div>
    </section>
  );
}
