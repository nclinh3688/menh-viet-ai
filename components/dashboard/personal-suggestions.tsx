import { SectionTitle } from "./fate-overview";

interface PersonalSuggestionsProps {
  advice: string;
  badDirections: string[];
  goodDirections: string[];
  luckyColors: string[];
  luckyNumbers: number[];
  summary: string;
  unluckyColors: string[];
}

export function PersonalSuggestions({
  advice,
  badDirections,
  goodDirections,
  luckyColors,
  luckyNumbers,
  summary,
  unluckyColors,
}: PersonalSuggestionsProps) {
  return (
    <section className="rounded-lg border bg-card/64 p-5 backdrop-blur-xl md:p-6">
      <SectionTitle title="Gợi ý cá nhân" />
      <p className="mt-4 text-sm leading-7 text-muted-foreground">{summary}</p>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <SuggestionBlock title="Màu hợp" values={luckyColors} />
        <SuggestionBlock title="Màu nên tiết chế" values={unluckyColors} />
        <SuggestionBlock title="Số may mắn" values={luckyNumbers.map(String)} />
        <SuggestionBlock title="Hướng tốt" values={goodDirections} />
        <SuggestionBlock title="Hướng nên cân nhắc" values={badDirections} />
        <article className="rounded-md border bg-background/58 p-4">
          <p className="text-sm font-semibold text-foreground">Lời khuyên ngắn</p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{advice}</p>
        </article>
      </div>
    </section>
  );
}

function SuggestionBlock({ title, values }: { title: string; values: string[] }) {
  return (
    <article className="rounded-md border bg-background/58 p-4">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {values.length > 0 ? (
          values.map((value) => (
            <span
              className="rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground"
              key={value}
            >
              {value}
            </span>
          ))
        ) : (
          <span className="text-sm text-muted-foreground">Chưa có dữ liệu</span>
        )}
      </div>
    </article>
  );
}
