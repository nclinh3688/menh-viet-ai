import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import { Button } from "@/components/ui/button";

interface MainLayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  { href: "/", label: "Trang chủ" },
  { href: "/onboarding", label: "Xem tử vi" },
  { href: "/love-compatibility", label: "Hợp tuổi" },
  { href: "/five-elements", label: "Ngũ hành" },
  { href: "/numerology", label: "Thần số học" },
  { href: "/good-day", label: "Ngày đẹp" },
  { href: "/pricing", label: "Pricing" },
];

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b bg-background/86 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-3 md:px-8 lg:h-16 lg:flex-row lg:items-center lg:justify-between lg:py-0">
          <div className="flex items-center justify-between gap-4">
            <Link className="text-base font-semibold text-foreground" href="/">
              {APP_NAME}
            </Link>
            <Button asChild className="lg:hidden" size="sm">
              <Link href="/onboarding">Tạo hồ sơ</Link>
            </Button>
          </div>

          <nav
            aria-label="Điều hướng chính"
            className="-mx-5 flex gap-1 overflow-x-auto px-5 pb-1 lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {navigationItems.map((item) => (
              <Link
                className="whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Button asChild className="hidden lg:inline-flex" size="sm">
            <Link href="/onboarding">Tạo hồ sơ</Link>
          </Button>
        </div>
      </header>
      {children}
    </div>
  );
}
