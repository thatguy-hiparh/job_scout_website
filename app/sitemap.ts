import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://jobscoutwebsite.vercel.app";
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/jobs`, lastModified: new Date() },
    { url: `${base}/companies`, lastModified: new Date() },
    { url: `${base}/contact`, lastModified: new Date() },
  ];
}
