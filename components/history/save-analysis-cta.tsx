"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { BookmarkCheck, BookmarkPlus, History, LogIn } from "lucide-react";
import { useSession } from "next-auth/react";
import {
  saveAnalysisAction,
  type SaveAnalysisActionInput,
} from "@/app/actions/save-analysis";
import { Button } from "@/components/ui/button";

interface SaveAnalysisCtaProps {
  analysis: SaveAnalysisActionInput;
}

export function SaveAnalysisCta({ analysis }: SaveAnalysisCtaProps) {
  const { status } = useSession();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);
  const isAuthenticated = status === "authenticated";
  const isSaved = savedId != null;

  function handleSave() {
    setMessage(null);

    startTransition(async () => {
      const result = await saveAnalysisAction(analysis);

      if (result.success) {
        setSavedId(result.id);
        setMessage("Đã lưu vào lịch sử");
        return;
      }

      setMessage(result.error);
    });
  }

  return (
    <section className="rounded-lg border border-primary/20 bg-primary/8 p-5 backdrop-blur-xl md:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary">Lưu lịch sử</p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">
            Bạn muốn lưu kết quả này?
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Đăng nhập miễn phí để lưu lại và xem lại bất cứ lúc nào.
          </p>
          {message == null ? null : (
            <p className="mt-3 text-sm font-semibold text-primary">{message}</p>
          )}
        </div>
        {!isAuthenticated ? (
          <Button asChild size="lg">
            <Link href="/login">
              <LogIn className="size-4" />
              Đăng nhập để lưu
            </Link>
          </Button>
        ) : (
          <Button disabled={isPending || isSaved} onClick={handleSave} size="lg">
            {isSaved ? (
              <BookmarkCheck className="size-4" />
            ) : (
              <BookmarkPlus className="size-4" />
            )}
            {isPending ? "Đang lưu..." : isSaved ? "Đã lưu" : "Lưu kết quả"}
          </Button>
        )}
      </div>
      <div className="mt-5 flex items-start gap-3 rounded-md border border-white/10 bg-background/48 px-4 py-3 text-sm leading-6 text-muted-foreground">
        <History className="mt-1 size-4 shrink-0 text-primary" />
        Người dùng anonymous vẫn xem miễn phí. Khi đăng nhập, kết quả được lưu
        vào lịch sử để xem lại sau.
      </div>
    </section>
  );
}
