import Link from "next/link";
import { ArrowRight, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface DiscoveryItem {
  href: string;
  label: string;
}

interface NextDiscoveryProps {
  className?: string;
  items?: DiscoveryItem[];
  title?: string;
}

const defaultItems: DiscoveryItem[] = [
  { href: "/love-compatibility", label: "Độ hợp với người yêu" },
  { href: "/numerology", label: "Thần số học" },
  { href: "/five-elements", label: "Màu hợp" },
  { href: "/good-day", label: "Ngày đẹp" },
];

export function NextDiscovery({
  className,
  items = defaultItems,
  title = "Khám phá tiếp",
}: NextDiscoveryProps) {
  return (
    <section
      className={cn(
        "rounded-lg border bg-card/64 p-5 backdrop-blur-xl",
        className,
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary">{title}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Tiếp tục khám phá theo nhu cầu của bạn.
          </p>
        </div>
        <Button asChild variant="secondary">
          <Link href="/">
            Về trang chủ
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <Link
            className="flex items-center gap-3 rounded-md border border-white/10 bg-background/48 px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            href={item.href}
            key={item.href}
          >
            <Circle className="size-3 text-primary" />
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
