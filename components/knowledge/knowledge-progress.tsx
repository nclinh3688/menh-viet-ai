export function KnowledgeProgress({ value }: { value: number }) {
  const safeValue = Math.max(0, Math.min(100, value));
  const label = safeValue >= 98 ? "Đầy đủ" : `${safeValue}%`;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 text-xs text-muted-foreground">
        <span>Mức độ hoàn thiện</span>
        <span className="font-semibold text-primary">{label}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-background/70">
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}
