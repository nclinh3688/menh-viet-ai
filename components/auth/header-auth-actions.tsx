"use client";

import Link from "next/link";
import { UserCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { Button } from "@/components/ui/button";

interface HeaderAuthActionsProps {
  mobile?: boolean;
}

export function HeaderAuthActions({ mobile = false }: HeaderAuthActionsProps) {
  const { data: session, status } = useSession();

  if (status !== "authenticated" || session.user == null) {
    return (
      <Button asChild size="sm" variant="secondary">
        <Link href="/login">Đăng nhập</Link>
      </Button>
    );
  }

  const displayName = session.user.name ?? session.user.email ?? "Tài khoản";

  if (mobile) {
    return (
      <div className="rounded-md border border-white/10 bg-background/60 p-3">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <UserCircle className="size-4 text-primary" />
          <span className="truncate">{displayName}</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <Button asChild size="sm" variant="secondary">
            <Link href="/history">Lịch sử</Link>
          </Button>
          <SignOutButton />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-md border border-white/10 bg-card/60 px-2 py-1">
      <div className="flex max-w-44 items-center gap-2 px-2 text-sm font-medium text-foreground">
        <UserCircle className="size-4 shrink-0 text-primary" />
        <span className="truncate">{displayName}</span>
      </div>
      <Button asChild size="sm" variant="secondary">
        <Link href="/history">Lịch sử</Link>
      </Button>
      <SignOutButton />
    </div>
  );
}
