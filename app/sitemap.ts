import type { MetadataRoute } from "next";

const publicRoutes = [
  "",
  "/onboarding",
  "/love-compatibility",
  "/five-elements",
  "/numerology",
  "/good-day",
  "/pricing",
  "/login",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://menhviet.ai";
  const now = new Date();

  return publicRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
