import Link from "next/link";
import { FileText, Plus, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ASTROLOGY_DISCLAIMER } from "@/lib/constants";

interface DashboardHeaderProps {
  fullName: string;
  profileId?: string;
}

export function DashboardHeader({ fullName, profileId }: DashboardHeaderProps) {
  return (
    <section className="rounded-lg border bg-card/70 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-7">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="mb-4 inline-flex rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            Free Plan
          </div>
          <h1 className="text-3xl font-semibold tracking-normal text-foreground md:text-5xl">
            Xin chào, {fullName}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
            Đây là hồ sơ vận mệnh cá nhân hóa của bạn.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
            <ShieldCheck className="mr-2 inline h-4 w-4 text-primary" aria-hidden="true" />
            {ASTROLOGY_DISCLAIMER}
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row md:flex-col lg:flex-row">
          {profileId == null ? null : (
            <Button asChild>
              <Link href={`/birth-report?profileId=${profileId}`}>
                <FileText className="h-4 w-4" aria-hidden="true" />
                Xem báo cáo đầy đủ
              </Link>
            </Button>
          )}
          <Button asChild variant="secondary">
            <Link href="/onboarding">
              <Plus className="h-4 w-4" aria-hidden="true" />
              Tạo hồ sơ mới
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
