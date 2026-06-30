import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ResultModel } from "@/lib/result/result-types";

export function ResultShareCta({ result }: { result: ResultModel }) {
  return (
    <section className="rounded-md border border-primary/20 bg-primary/8 p-4">
      <p className="text-sm font-semibold text-foreground">Chia sẻ kết quả</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {result.shareText}
      </p>
      <Button className="mt-4 w-full" type="button" variant="secondary">
        <Share2 className="size-4" />
        Chia sẻ
      </Button>
    </section>
  );
}
