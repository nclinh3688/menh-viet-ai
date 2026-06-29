"use client";

import { Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import { MVButton } from "@/components/form/mv-button";

interface GoogleSignInButtonProps {
  disabled?: boolean;
}

export function GoogleSignInButton({ disabled = false }: GoogleSignInButtonProps) {
  return (
    <MVButton
      className="w-full justify-center"
      disabled={disabled}
      onClick={() => signIn("google", { callbackUrl: "/history" })}
      size="lg"
      type="button"
      variant={disabled ? "secondary" : "default"}
    >
      <Mail className="size-4" />
      {disabled ? "Google cần cấu hình OAuth" : "Tiếp tục với Google"}
    </MVButton>
  );
}
