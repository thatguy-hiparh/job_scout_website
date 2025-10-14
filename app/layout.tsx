import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Job Scout — Music Tech Jobs",
  description: "Daily jobs in music tech. Filters, KPIs, and clean UX."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-neutral-100">
        <header className="sticky top-0 bg-neutral-950/90 backdrop-blur border-b border-neutral-800">
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="font-extrabold text-lg">Job Scout</div>
            <nav className="text-sm">
              <Link className="mr-4 hover:opacity-80" href="/">Today</Link>
              <Link className="mr-4 hover:opacity-80" href="/jobs">Jobs</Link>
              <Link className="mr-4 hover:opacity-80" href="/companies">Companies</Link>
              <Link className="hover:opacity-80" href="/contact">Contact</Link>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-6 py-6">{children}</main>
        <footer className="border-t border-neutral-800">
          <div className="max-w-6xl mx-auto px-6 py-6 text-neutral-400 text-sm">
            Job Scout (demo)
          </div>
        </footer>
      </body>
    </html>
  );
}
