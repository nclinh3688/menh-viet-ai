import Link from "next/link";
import { BookmarkPlus, History, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SaveAnalysisCtaProps {
  isAuthenticated?: boolean;
}

export function SaveAnalysisCta({
  isAuthenticated = false,
}: SaveAnalysisCtaProps) {
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
        </div>
        {isAuthenticated ? (
          <Button disabled size="lg">
            <BookmarkPlus className="size-4" />
            Lưu kết quả
          </Button>
        ) : (
          <Button asChild size="lg">
            <Link href="/login">
              <LogIn className="size-4" />
              Đăng nhập để lưu
            </Link>
          </Button>
        )}
      </div>
      <div className="mt-5 flex items-start gap-3 rounded-md border border-white/10 bg-background/48 px-4 py-3 text-sm leading-6 text-muted-foreground">
        <History className="mt-1 size-4 shrink-0 text-primary" />
        Người dùng anonymous vẫn xem miễn phí. Lịch sử dài hạn sẽ được lưu khi
        auth thật được kết nối trong sprint sau.
      </div>
    </section>
  );
}
