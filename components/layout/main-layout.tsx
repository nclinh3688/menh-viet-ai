import Link from "next/link";
import { Menu } from "lucide-react";
import { HeaderAuthActions } from "@/components/auth/header-auth-actions";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";

interface MainLayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  { href: "/", label: "Trang chủ" },
  { href: "/onboarding", label: "Tử vi" },
  { href: "/love-compatibility", label: "Hợp tuổi" },
  { href: "/five-elements", label: "Ngũ hành" },
  { href: "/numerology", label: "Thần số học" },
  { href: "/good-day", label: "Ngày đẹp" },
  { href: "/knowledge", label: "Tri thức" },
  { href: "/history", label: "Lịch sử" },
  { href: "/pricing", label: "Pricing" },
];

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/86 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-3 md:px-8 lg:h-16 lg:flex-row lg:items-center lg:justify-between lg:py-0">
          <div className="flex items-center justify-between gap-4">
            <Link className="text-base font-semibold text-foreground" href="/">
              {APP_NAME}
            </Link>
            <details className="group lg:hidden">
              <summary className="inline-flex h-10 cursor-pointer list-none items-center justify-center gap-2 rounded-md border px-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted">
                <Menu className="size-4" />
                Menu
              </summary>
              <nav className="absolute left-5 right-5 top-[62px] grid gap-1 rounded-md border bg-card/96 p-2 shadow-2xl shadow-black/30 backdrop-blur-xl">
                {navigationItems.map((item) => (
                  <Link
                    className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    href={item.href}
                    key={item.href}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="px-3 py-2">
                  <HeaderAuthActions mobile />
                </div>
              </nav>
            </details>
          </div>

          <nav
            aria-label="Điều hướng chính"
            className="hidden gap-1 lg:flex"
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

          <div className="hidden items-center gap-2 lg:flex">
            <HeaderAuthActions />
          </div>
        </div>
      </header>
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t bg-background/82">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_0.8fr] md:px-8">
        <div>
          <Link className="text-base font-semibold text-foreground" href="/">
            {APP_NAME}
          </Link>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            {APP_DESCRIPTION}
          </p>
          <p className="mt-4 max-w-xl rounded-md border border-primary/20 bg-primary/8 px-4 py-3 text-sm leading-6 text-muted-foreground">
            Nội dung chỉ mang tính tham khảo và khám phá bản thân, không thay thế
            tư vấn chuyên môn.
          </p>
        </div>
        <nav aria-label="Liên kết nhanh" className="grid gap-2 sm:grid-cols-2">
          {navigationItems.map((item) => (
            <Link
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
