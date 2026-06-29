import type { ContentQualityResult } from "@/lib/quality/content-quality-checker";
import type { ReportValidationResult } from "@/lib/report-engine/report-validator";

interface ReportQualityDebugPanelProps {
  contentQuality: ContentQualityResult;
  validation: ReportValidationResult;
}

function DebugList({ items, title }: { items: string[]; title: string }) {
  return (
    <div>
      <p className="font-semibold text-foreground">{title}</p>
      {items.length === 0 ? (
        <p className="mt-1 text-sm text-muted-foreground">Không có warning.</p>
      ) : (
        <ul className="mt-2 grid gap-1 text-sm leading-6 text-muted-foreground">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ReportQualityDebugPanel({
  contentQuality,
  validation,
}: ReportQualityDebugPanelProps) {
  const forbiddenWords = contentQuality.forbiddenWordsFound.map(
    (item) => `${item.field}: "${item.term}"`,
  );
  const isPass = contentQuality.isPass && validation.isPass;

  return (
    <aside className="rounded-lg border border-dashed border-primary/35 bg-background/72 p-5 backdrop-blur-xl">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary">
            Development Quality Debug
          </p>
          <h2 className="mt-1 text-xl font-semibold text-foreground">
            Report quality status: {isPass ? "PASS" : "WARNING"}
          </h2>
        </div>
        <span className="w-fit rounded-full border border-primary/25 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary">
          dev only
        </span>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <DebugList items={validation.missingSections} title="Missing sections" />
        <DebugList items={forbiddenWords} title="Forbidden words found" />
        <DebugList items={validation.missingSources} title="Missing sources" />
        <DebugList
          items={validation.confidenceWarnings}
          title="Confidence warnings"
        />
      </div>

      {validation.warnings.length === 0 ? null : (
        <div className="mt-5">
          <DebugList items={validation.warnings} title="Other warnings" />
        </div>
      )}
    </aside>
  );
}
