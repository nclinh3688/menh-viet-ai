import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen">
      <header className="border-b bg-background/78 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 md:px-8">
          <Link className="text-base font-semibold text-foreground" href="/">
            {APP_NAME}
          </Link>
          <span className="rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
            Sprint 1
          </span>
        </div>
      </header>
      {children}
    </div>
  );
}
