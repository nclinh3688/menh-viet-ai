import { Search } from "lucide-react";
import type { KnowledgeCategory } from "@/lib/knowledge-db/knowledge-category";
import { KNOWLEDGE_CATEGORIES, knowledgeCategoryLabels } from "@/lib/knowledge-db/knowledge-category";

interface KnowledgeSearchProps {
  category?: KnowledgeCategory;
  keyword?: string;
  tag?: string;
}

export function KnowledgeSearch({ category, keyword = "", tag = "" }: KnowledgeSearchProps) {
  return (
    <form className="premium-surface rounded-lg border bg-card/68 p-4 backdrop-blur-xl" action="/knowledge">
      <div className="grid gap-3 md:grid-cols-[1fr_0.7fr_0.7fr_auto]">
        <label className="grid gap-2 text-sm font-medium text-foreground">
          Keyword
          <input
            className="h-11 rounded-xl border border-white/[0.12] bg-white/[0.06] px-3 text-sm text-foreground outline-none transition-colors placeholder:text-white/40 focus:border-primary"
            defaultValue={keyword}
            name="keyword"
            placeholder="Tìm Ngũ Hành, Cung Phi..."
            type="search"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-foreground">
          Tag
          <input
            className="h-11 rounded-xl border border-white/[0.12] bg-white/[0.06] px-3 text-sm text-foreground outline-none transition-colors placeholder:text-white/40 focus:border-primary"
            defaultValue={tag}
            name="tag"
            placeholder="ngu-hanh"
            type="search"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-foreground">
          Category
          <select
            className="h-11 rounded-xl border border-white/[0.12] bg-white/[0.06] px-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
            defaultValue={category ?? ""}
            name="category"
          >
            <option value="">Tất cả</option>
            {KNOWLEDGE_CATEGORIES.map((item) => (
              <option className="bg-background text-foreground" key={item} value={item}>
                {knowledgeCategoryLabels[item]}
              </option>
            ))}
          </select>
        </label>
        <button className="mt-auto inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground" type="submit">
          <Search className="size-4" />
          Tìm
        </button>
      </div>
    </form>
  );
}
