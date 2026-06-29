"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/" })}
      size="sm"
      type="button"
      variant="ghost"
    >
      <LogOut className="size-4" />
      Đăng xuất
    </Button>
  );
}
