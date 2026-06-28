interface FateOverviewProps {
  chart: {
    heavenlyStem: string;
    earthlyBranch: string;
    zodiacAnimal: string;
    element: string;
    napAm: string;
    cungPhi: string;
    cungPhiGroup: string;
  };
}

export function FateOverview({ chart }: FateOverviewProps) {
  const items = [
    ["Thiên Can", chart.heavenlyStem],
    ["Địa Chi", chart.earthlyBranch],
    ["Con giáp", chart.zodiacAnimal],
    ["Ngũ hành", chart.element],
    ["Nạp âm", chart.napAm],
    ["Cung Phi", chart.cungPhi],
    ["Nhóm mệnh", chart.cungPhiGroup],
  ];

  return (
    <section className="rounded-lg border bg-card/64 p-5 backdrop-blur-xl md:p-6">
      <SectionTitle title="Tổng quan vận mệnh" />
      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {items.map(([label, value]) => (
          <article className="rounded-md border bg-background/58 p-4" key={label}>
            <p className="text-xs font-semibold uppercase text-muted-foreground">
              {label}
            </p>
            <p className="mt-2 text-lg font-semibold text-foreground">{value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="text-xl font-semibold tracking-normal text-foreground md:text-2xl">
      {title}
    </h2>
  );
}
