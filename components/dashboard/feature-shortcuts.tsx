import Link from "next/link";
import { ArrowUpRight, HeartHandshake, Leaf, Sparkles, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionTitle } from "./fate-overview";

const shortcuts = [
  { href: "/love-compatibility", icon: HeartHandshake, label: "Hợp tuổi" },
  { href: "/five-elements", icon: Leaf, label: "Ngũ hành" },
  { href: "/numerology", icon: Star, label: "Thần số học" },
  { href: "/pricing", icon: Sparkles, label: "Premium" },
];

export function FeatureShortcuts() {
  return (
    <section className="rounded-lg border bg-card/64 p-5 backdrop-blur-xl md:p-6">
      <SectionTitle title="Các tính năng tiếp theo" />
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {shortcuts.map((shortcut) => (
          <ShortcutLink key={shortcut.href} {...shortcut} />
        ))}
      </div>
    </section>
  );
}

function ShortcutLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
}) {
  return (
    <Link
      className="group flex min-h-28 flex-col justify-between rounded-md border bg-background/58 p-4 transition-colors hover:border-primary/60"
      href={href}
    >
      <div className="flex items-center justify-between gap-3">
        <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
        <ArrowUpRight
          className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary"
          aria-hidden="true"
        />
      </div>
      <span className="text-sm font-semibold text-foreground">{label}</span>
    </Link>
  );
}
