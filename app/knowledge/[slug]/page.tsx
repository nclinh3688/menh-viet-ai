import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowLeft, BookOpen, CalendarClock, Layers3 } from "lucide-react";
import { KnowledgeEmpty } from "@/components/knowledge/knowledge-empty";
import { KnowledgeProgress } from "@/components/knowledge/knowledge-progress";
import { KnowledgeRelated } from "@/components/knowledge/knowledge-related";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import { FIVE_ELEMENTS_KNOWLEDGE_SEED } from "@/lib/knowledge-db/astrology/seeds/five-elements.seed";
import { getRelatedKnowledge } from "@/lib/knowledge-db/graph/knowledge-graph";
import { getKnowledgeGraph } from "@/lib/knowledge-db/graph/knowledge-graph";
import type { KnowledgeItem } from "@/lib/knowledge-db/knowledge-item";
import { loadKnowledgeItems } from "@/lib/knowledge-db/knowledge-loader";
import { getKnowledgeBySlug } from "@/lib/knowledge-db/knowledge-search";
import { formatSourceLabel } from "@/lib/sources/source-resolver";
import {
  findKnowledgeTopic,
  getItemsForTopic,
  getTopicCompleteness,
  knowledgeTopics,
  type KnowledgeTopic,
} from "../knowledge-topics";

interface KnowledgeSlugPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: KnowledgeSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = findKnowledgeTopic(slug);
  const item = getKnowledgeBySlug(slug);
  const title = topic?.title ?? item?.title ?? "Knowledge";
  const description = topic?.description ?? item?.summary ?? "Trung tâm tri thức Mệnh Việt.";
  const path = `/knowledge/${slug}`;
  const siteUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://menhviet.ai";
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? APP_NAME;

  return {
    metadataBase: new URL(siteUrl),
    title: `${title} | ${APP_NAME}`,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} | ${APP_NAME}`,
      description,
      locale: "vi_VN",
      siteName,
      type: item == null ? "website" : "article",
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      description,
      title: `${title} | ${APP_NAME}`,
    },
  };
}

export default async function KnowledgeSlugPage({ params }: KnowledgeSlugPageProps) {
  const { slug } = await params;
  const topic = findKnowledgeTopic(slug);

  if (topic != null) {
    return <KnowledgeCategoryPage slug={slug} />;
  }

  const item = getKnowledgeBySlug(slug);

  if (item == null) {
    notFound();
  }

  return <KnowledgeItemPage item={item} />;
}

function KnowledgeCategoryPage({ slug }: { slug: string }) {
  const topic = findKnowledgeTopic(slug);

  if (topic == null) {
    notFound();
  }

  const { items } = loadKnowledgeItems();
  const topicItems = getItemsForTopic(topic, items);
  const completeness = getTopicCompleteness(topicItems);

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10 md:px-8 md:py-14">
      <KnowledgeJsonLd topic={topic} />
      <BackLink />
      <KnowledgeBreadcrumb topic={topic} />
      <section className="premium-surface mt-5 rounded-lg border bg-card/68 p-6 backdrop-blur-xl">
        <p className="text-sm font-semibold text-primary">Knowledge Category</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-normal text-foreground md:text-5xl">
          {topic.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
          {topic.description}
        </p>
        <div className="mt-6 max-w-sm">
          <p className="mb-2 text-sm text-muted-foreground">
            Knowledge Items:{" "}
            <span className="font-semibold text-foreground">{topicItems.length}</span>
          </p>
          <KnowledgeProgress value={completeness} />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-foreground">Overview</h2>
        {topicItems.length === 0 ? (
          <div className="mt-5">
            <KnowledgeEmpty
              description="Danh mục này đã có cấu trúc trong Encyclopedia, nhưng chưa có Knowledge Item đủ chuẩn để hiển thị."
              title="Danh mục đang được chuẩn hóa"
            />
          </div>
        ) : (
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {topicItems.map((item) => (
              <KnowledgeItemCard item={item} key={item.id} />
            ))}
          </div>
        )}
      </section>

      {topicItems[0] == null ? null : (
        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-foreground">Quan hệ tri thức</h2>
          <div className="mt-5">
            <KnowledgeRelated items={getRelatedKnowledge(topicItems[0].id)} />
          </div>
        </section>
      )}
    </main>
  );
}

function KnowledgeItemPage({ item }: { item: KnowledgeItem }) {
  const graph = getKnowledgeGraph(item.id);
  const related = getRelatedKnowledge(item.id);
  const sameCategoryItems = loadKnowledgeItems()
    .items.filter(
      (candidate) => candidate.category === item.category && candidate.id !== item.id,
    )
    .slice(0, 4);
  const topic = findTopicForItem(item);
  const qualityWarnings = getKnowledgeItemQualityWarnings(item);
  const fiveElementDetail = FIVE_ELEMENTS_KNOWLEDGE_SEED.find(
    (seed) => seed.id === item.id,
  );

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-10 md:px-8 md:py-14">
      <KnowledgeJsonLd item={item} topic={topic} />
      <BackLink />
      <KnowledgeBreadcrumb item={item} topic={topic} />
      <article className="premium-surface mt-5 rounded-lg border bg-card/70 p-6 backdrop-blur-xl">
        <div className="mb-5 flex size-12 items-center justify-center rounded-md bg-primary/12 text-primary">
          <BookOpen className="size-6" />
        </div>
        <p className="text-sm font-semibold text-primary">{item.category}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-normal text-foreground md:text-5xl">
          {item.title}
        </h1>
        <p className="mt-4 text-base leading-8 text-muted-foreground">
          {item.summary}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              className="rounded-full border border-white/10 bg-background/45 px-3 py-1 text-xs text-muted-foreground"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
      </article>

      <section className="mt-6 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="premium-surface rounded-lg border bg-card/64 p-5 backdrop-blur-xl">
          <h2 className="text-2xl font-semibold text-foreground">Dữ liệu chính</h2>
          <div className="mt-4 grid gap-3">
            <DataRow label="Category" value={item.category} />
            <DataRow label="Confidence" value={`${item.confidence}%`} />
            <DataRow label="Version" value={item.version} />
            <DataRow label="Slug" value={item.slug} />
          </div>
        </div>
        <div className="premium-surface rounded-lg border bg-card/64 p-5 backdrop-blur-xl">
          <h2 className="text-2xl font-semibold text-foreground">Ý nghĩa</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.content}</p>
        </div>
      </section>

      {fiveElementDetail == null ? null : (
        <FiveElementDetailSection detail={fiveElementDetail} />
      )}

      <section className="mt-6 premium-surface rounded-lg border bg-card/64 p-5 backdrop-blur-xl">
        <div className="mb-4 flex items-center gap-2">
          <Layers3 className="size-5 text-primary" />
          <h2 className="text-2xl font-semibold text-foreground">Knowledge Graph</h2>
        </div>
        <div className="grid gap-3">
          {graph.links.map((link) => (
            <div className="rounded-md border border-white/10 bg-background/45 p-3" key={link.id}>
              <p className="text-sm font-semibold text-primary">{link.linkType}</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {link.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 premium-surface rounded-lg border bg-card/64 p-5 backdrop-blur-xl">
        <h2 className="text-2xl font-semibold text-foreground">Nguồn</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {item.sources.map((source) => (
            <div className="rounded-md border border-white/10 bg-background/45 p-3" key={source}>
              <p className="font-semibold text-foreground">{formatSourceLabel(source)}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Confidence {item.confidence}%
              </p>
            </div>
          ))}
        </div>
        <div className="mt-5 grid gap-3">
          {item.references.map((reference) => (
            <div className="rounded-md border border-white/10 bg-background/45 p-3" key={reference.label}>
              <p className="font-semibold text-foreground">{reference.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {reference.path ?? reference.url ?? "Internal reference"}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 premium-surface rounded-lg border bg-card/64 p-5 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <CalendarClock className="size-5 text-primary" />
          <h2 className="text-2xl font-semibold text-foreground">Cập nhật lần cuối</h2>
        </div>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Version {item.version} · {item.lastUpdated}
        </p>
      </section>

      <div className="mt-6">
        <KnowledgeRelated items={related} />
      </div>
      <div className="mt-6">
        <KnowledgeRelated items={sameCategoryItems} title="Cùng danh mục" />
      </div>
      <div className="mt-6">
        <KnowledgeRelated items={[...related, ...sameCategoryItems].slice(0, 4)} title="Khám phá tiếp" />
      </div>
      {process.env.NODE_ENV === "development" ? (
        <KnowledgeQualityWarning warnings={qualityWarnings} />
      ) : null}
    </main>
  );
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-background/45 p-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}

function KnowledgeItemCard({ item }: { item: KnowledgeItem }) {
  return (
    <article className="premium-surface rounded-lg border bg-card/64 p-5 backdrop-blur-xl">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
        {item.category}
      </p>
      <h3 className="mt-2 text-xl font-semibold text-foreground">{item.title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.summary}</p>
      <Button asChild className="mt-5" variant="secondary">
        <Link href={`/knowledge/${item.slug}`}>Xem chi tiết</Link>
      </Button>
    </article>
  );
}

function FiveElementDetailSection({
  detail,
}: {
  detail: (typeof FIVE_ELEMENTS_KNOWLEDGE_SEED)[number];
}) {
  return (
    <section className="mt-6 grid gap-5 lg:grid-cols-2">
      <InfoBlock items={detail.applications} title="Ứng dụng" />
      <InfoBlock items={detail.commonMisunderstandings} title="Hiểu lầm thường gặp" />
      <InfoBlock items={detail.strengths} title="Điểm mạnh" />
      <InfoBlock items={detail.weaknesses} title="Điểm cần lưu ý" />
      <div className="premium-surface rounded-lg border bg-card/64 p-5 backdrop-blur-xl lg:col-span-2">
        <h2 className="text-2xl font-semibold text-foreground">FAQ</h2>
        <div className="mt-4 grid gap-3">
          {detail.faq.map((item) => (
            <div className="rounded-md border border-white/10 bg-background/45 p-4" key={item.question}>
              <p className="font-semibold text-foreground">{item.question}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function KnowledgeBreadcrumb({
  item,
  topic,
}: {
  item?: KnowledgeItem;
  topic?: KnowledgeTopic | null;
}) {
  const parts = [
    { href: "/", label: "Trang chủ" },
    { href: "/knowledge", label: "Tri thức" },
    ...(topic == null
      ? []
      : [{ href: `/knowledge/${topic.slug}`, label: topic.title }]),
    ...(item == null ? [] : [{ href: `/knowledge/${item.slug}`, label: item.title }]),
  ];

  return (
    <nav aria-label="Breadcrumb" className="mt-5 text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-2">
        {parts.map((part, index) => (
          <li className="flex items-center gap-2" key={part.href}>
            {index > 0 ? <span>/</span> : null}
            <Link
              className="transition-colors hover:text-foreground"
              href={part.href}
            >
              {part.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function KnowledgeJsonLd({
  item,
  topic,
}: {
  item?: KnowledgeItem;
  topic?: KnowledgeTopic | null;
}) {
  const siteUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://menhviet.ai";
  const path = item == null ? `/knowledge/${topic?.slug ?? ""}` : `/knowledge/${item.slug}`;
  const breadcrumbs = [
    { name: "Trang chủ", item: `${siteUrl}/` },
    { name: "Tri thức", item: `${siteUrl}/knowledge` },
    ...(topic == null
      ? []
      : [{ name: topic.title, item: `${siteUrl}/knowledge/${topic.slug}` }]),
    ...(item == null
      ? []
      : [{ name: item.title, item: `${siteUrl}/knowledge/${item.slug}` }]),
  ];
  const faqJsonLd = getFaqJsonLd(item, siteUrl, path);
  const graph = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((breadcrumb, index) => ({
        "@type": "ListItem",
        item: breadcrumb.item,
        name: breadcrumb.name,
        position: index + 1,
      })),
    },
    item == null
      ? {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          description: topic?.description,
          name: topic?.title,
          url: `${siteUrl}${path}`,
        }
      : {
          "@context": "https://schema.org",
          "@type": "DefinedTerm",
          description: item.summary,
          inDefinedTermSet: `${siteUrl}/knowledge`,
          name: item.title,
          termCode: item.id,
          url: `${siteUrl}${path}`,
        },
    ...(faqJsonLd == null ? [] : [faqJsonLd]),
  ];

  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      type="application/ld+json"
    />
  );
}

function getFaqJsonLd(item: KnowledgeItem | undefined, siteUrl: string, path: string) {
  if (item == null) {
    return null;
  }

  const detail = FIVE_ELEMENTS_KNOWLEDGE_SEED.find((seed) => seed.id === item.id);

  if (detail == null || detail.faq.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: detail.faq.map((faq) => ({
      "@type": "Question",
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
      name: faq.question,
    })),
    url: `${siteUrl}${path}`,
  };
}

function findTopicForItem(item: KnowledgeItem) {
  const items = loadKnowledgeItems().items;

  return (
    knowledgeTopics.find((topic) =>
      getItemsForTopic(topic, items).some((candidate) => candidate.id === item.id),
    ) ?? null
  );
}

function getKnowledgeItemQualityWarnings(item: KnowledgeItem) {
  const warnings = [
    !item.summary.trim() ? "Thiếu summary." : null,
    item.sources.length === 0 ? "Thiếu sources." : null,
    item.references.length === 0 ? "Thiếu references." : null,
    !item.version.trim() ? "Thiếu version." : null,
    !item.lastUpdated.trim() ? "Thiếu lastUpdated." : null,
    item.relatedKnowledge.length === 0 ? "Thiếu relatedKnowledge." : null,
  ].filter((warning): warning is string => warning != null);

  return warnings;
}

function KnowledgeQualityWarning({ warnings }: { warnings: string[] }) {
  if (warnings.length === 0) {
    return null;
  }

  return (
    <aside className="mt-6 rounded-lg border border-dashed border-primary/35 bg-background/72 p-5">
      <div className="flex items-center gap-2 text-primary">
        <AlertTriangle className="size-5" />
        <p className="font-semibold">Knowledge quality warning</p>
      </div>
      <ul className="mt-3 grid gap-1 text-sm text-muted-foreground">
        {warnings.map((warning) => (
          <li key={warning}>{warning}</li>
        ))}
      </ul>
    </aside>
  );
}

function InfoBlock({ items, title }: { items: string[]; title: string }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="premium-surface rounded-lg border bg-card/64 p-5 backdrop-blur-xl">
      <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
      <ul className="mt-4 grid gap-2">
        {items.map((item) => (
          <li className="text-sm leading-6 text-muted-foreground" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function BackLink() {
  return (
    <Button asChild variant="secondary">
      <Link href="/knowledge">
        <ArrowLeft className="size-4" />
        Trung tâm tri thức
      </Link>
    </Button>
  );
}
