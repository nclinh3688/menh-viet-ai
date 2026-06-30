import type { Metadata } from "next";
import Link from "next/link";
import { BookOpenCheck } from "lucide-react";
import { KnowledgeCategoryCard } from "@/components/knowledge/knowledge-category-card";
import { KnowledgeEmpty } from "@/components/knowledge/knowledge-empty";
import { KnowledgeSearch } from "@/components/knowledge/knowledge-search";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import { isKnowledgeCategory } from "@/lib/knowledge-db/knowledge-category";
import { loadKnowledgeItems } from "@/lib/knowledge-db/knowledge-loader";
import { searchKnowledgeWithRelated } from "@/lib/knowledge-db/knowledge-search";
import { buildKnowledgeStats } from "@/lib/knowledge-db/stats/knowledge-stat-builder";
import {
  getItemsForTopic,
  getTopicCompleteness,
  knowledgeTopics,
} from "./knowledge-topics";

export const metadata: Metadata = {
  title: `Trung tâm tri thức | ${APP_NAME}`,
  description:
    "Khám phá hệ thống tri thức về Tử vi, Ngũ Hành, Phong thủy và Thần số học được chuẩn hóa để phục vụ việc luận giải.",
  alternates: {
    canonical: "/knowledge",
  },
};

interface KnowledgePageProps {
  searchParams: Promise<{
    category?: string;
    keyword?: string;
    tag?: string;
  }>;
}

export default async function KnowledgePage({ searchParams }: KnowledgePageProps) {
  const params = await searchParams;
  const category = params.category != null && isKnowledgeCategory(params.category)
    ? params.category
    : undefined;
  const keyword = params.keyword?.trim() || undefined;
  const tag = params.tag?.trim() || undefined;
  const { items } = loadKnowledgeItems();
  const stats = buildKnowledgeStats(items);
  const isSearching = category != null || keyword != null || tag != null;
  const searchResults = isSearching
    ? searchKnowledgeWithRelated({ category, keyword, tag })
    : [];

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10 md:px-8 md:py-14">
      <section className="max-w-3xl">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
          <BookOpenCheck className="size-4" />
          Encyclopedia
        </div>
        <h1 className="text-4xl font-semibold tracking-normal text-foreground md:text-6xl">
          Trung tâm tri thức Mệnh Việt
        </h1>
        <p className="mt-5 text-base leading-8 text-muted-foreground md:text-lg">
          Khám phá hệ thống tri thức về Tử vi, Ngũ Hành, Phong thủy và Thần số
          học được chuẩn hóa để phục vụ việc luận giải.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Tổng Knowledge Items hiện có:{" "}
          <span className="font-semibold text-foreground">{stats.totalItems}</span>
        </p>
      </section>

      <div className="mt-8">
        <KnowledgeSearch category={category} keyword={keyword} tag={tag} />
      </div>

      {isSearching ? (
        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-foreground">Kết quả tra cứu</h2>
          {searchResults.length === 0 ? (
            <div className="mt-4">
              <KnowledgeEmpty />
            </div>
          ) : (
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {searchResults.map(({ item, relatedKnowledge }) => (
                <article className="premium-surface rounded-lg border bg-card/64 p-5 backdrop-blur-xl" key={item.id}>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    {item.category}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {item.summary}
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Related: {relatedKnowledge.length}
                  </p>
                  <Button asChild className="mt-5" variant="secondary">
                    <Link href={`/knowledge/${item.slug}`}>Xem chi tiết</Link>
                  </Button>
                </article>
              ))}
            </div>
          )}
        </section>
      ) : null}

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-foreground">Danh mục tri thức</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {knowledgeTopics.map((topic) => {
            const topicItems = getItemsForTopic(topic, items);
            const categoryStat = topic.category == null
              ? null
              : stats.byCategory.find((item) => item.category === topic.category);

            return (
              <KnowledgeCategoryCard
                completeness={
                  topicItems.length > 0
                    ? getTopicCompleteness(topicItems)
                    : categoryStat?.completeness ?? 0
                }
                description={topic.description}
                href={`/knowledge/${topic.slug}`}
                itemCount={topicItems.length}
                key={topic.slug}
                title={topic.title}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
