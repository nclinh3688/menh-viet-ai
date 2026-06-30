import type { MetadataRoute } from "next";
import { loadKnowledgeItems } from "@/lib/knowledge-db/knowledge-loader";
import { knowledgeTopics } from "./knowledge/knowledge-topics";

const publicRoutes = [
  "",
  "/onboarding",
  "/love-compatibility",
  "/five-elements",
  "/numerology",
  "/good-day",
  "/knowledge",
  "/knowledge/five-elements",
  "/knowledge/heavenly-stems",
  "/knowledge/earthly-branches",
  "/knowledge/cung-phi",
  "/pricing",
  "/login",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://menhviet.ai";
  const now = new Date();
  const knowledgeRoutes = [
    ...knowledgeTopics.map((topic) => `/knowledge/${topic.slug}`),
    ...loadKnowledgeItems({ shouldValidate: false }).items.map(
      (item) => `/knowledge/${item.slug}`,
    ),
  ];
  const routes = [...new Set([...publicRoutes, ...knowledgeRoutes])];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
