import {
  BriefcaseBusiness,
  CircleAlert,
  Heart,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { ReportSection } from "./report-section";
import type { ReportListSection, ReportRenderModel } from "@/lib/report-engine/report-schema";

function BulletList({ section }: { section: ReportListSection }) {
  return (
    <ul className="grid gap-3">
      {section.items.map((item) => (
        <li className="rounded-md border border-white/10 bg-background/48 px-4 py-3 text-sm leading-6 text-muted-foreground" key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ReportStrengths({ report }: { report: ReportRenderModel }) {
  return (
    <ReportSection
      description={report.strengths.description}
      icon={ShieldCheck}
      id="strengths"
      title={report.strengths.title}
    >
      <BulletList section={report.strengths} />
    </ReportSection>
  );
}

export function ReportCautions({ report }: { report: ReportRenderModel }) {
  return (
    <ReportSection
      description={report.cautions.description}
      icon={CircleAlert}
      id="cautions"
      title={report.cautions.title}
    >
      <BulletList section={report.cautions} />
    </ReportSection>
  );
}

export function ReportCareer({ report }: { report: ReportRenderModel }) {
  return (
    <ReportSection
      description={report.career.description}
      icon={BriefcaseBusiness}
      id="career"
      title={report.career.title}
    >
      <BulletList section={report.career} />
    </ReportSection>
  );
}

export function ReportFinance({ report }: { report: ReportRenderModel }) {
  return (
    <ReportSection
      description={report.finance.description}
      icon={Wallet}
      id="finance"
      title={report.finance.title}
    >
      <BulletList section={report.finance} />
    </ReportSection>
  );
}

export function ReportRelationship({ report }: { report: ReportRenderModel }) {
  return (
    <ReportSection
      description={report.relationship.description}
      icon={Heart}
      id="relationship"
      title={report.relationship.title}
    >
      <BulletList section={report.relationship} />
    </ReportSection>
  );
}

export function ReportHealth({ report }: { report: ReportRenderModel }) {
  return (
    <ReportSection
      description={report.health.description}
      icon={TrendingUp}
      id="health"
      title={report.health.title}
    >
      <BulletList section={report.health} />
    </ReportSection>
  );
}
