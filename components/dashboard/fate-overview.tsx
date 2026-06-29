import { BadgeCheck, Compass } from "lucide-react";

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
      <SectionTitle title="Birth Chart Summary" />
      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {items.map(([label, value]) => (
          <article className="rounded-md border bg-background/58 p-4" key={label}>
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-primary" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase text-muted-foreground">
                {label}
              </p>
            </div>
            <p className="mt-3 text-lg font-semibold text-foreground">{value}</p>
          </article>
        ))}
      </div>
      <p className="mt-5 flex items-start gap-2 text-sm leading-6 text-muted-foreground">
        <Compass className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
        Đây là bản tóm tắt theo hệ quy chiếu Mệnh Việt, dùng để định hướng dashboard
        cá nhân và các phân tích sâu hơn ở giai đoạn sau.
      </p>
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
