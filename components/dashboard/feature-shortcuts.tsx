import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionTitle } from "./fate-overview";

const shortcuts = [
  { href: "/love-compatibility", label: "Hợp tuổi hôn nhân" },
  { href: "/five-elements", label: "Ngũ hành cá nhân" },
  { href: "/numerology", label: "Thần số học" },
  { href: "/good-day", label: "Chọn ngày tốt" },
  { href: "/pricing", label: "Nâng cấp gói" },
];

export function FeatureShortcuts() {
  return (
    <section className="rounded-lg border bg-card/64 p-5 backdrop-blur-xl md:p-6">
      <SectionTitle title="Các tính năng tiếp theo" />
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {shortcuts.map((shortcut) => (
          <Link
            className="group flex min-h-28 flex-col justify-between rounded-md border bg-background/58 p-4 transition-colors hover:border-primary/60"
            href={shortcut.href}
            key={shortcut.href}
          >
            <span className="text-sm font-semibold text-foreground">
              {shortcut.label}
            </span>
            <ArrowUpRight
              className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
