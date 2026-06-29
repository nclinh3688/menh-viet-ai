import type { Metadata } from "next";
import { HistoryCard } from "@/components/history/history-card";
import { HistoryEmptyState } from "@/components/history/history-empty-state";
import { APP_NAME } from "@/lib/constants";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { getUserSavedAnalyses } from "@/lib/history/save-analysis";

export const metadata: Metadata = {
  title: `Lịch sử phân tích | ${APP_NAME}`,
  description:
    "Xem lại các phân tích lá số, hợp tuổi, thần số học, ngũ hành và ngày đẹp đã lưu trên Mệnh Việt AI.",
  alternates: {
    canonical: "/history",
  },
};

export default async function HistoryPage() {
  const currentUser = await getCurrentUser();

  if (currentUser == null) {
    return (
      <HistoryEmptyState
        description="Lưu lại hồ sơ, hợp tuổi, thần số học và ngày đẹp để xem lại bất cứ lúc nào."
        href="/login"
        label="Đăng nhập miễn phí"
        title="Đăng nhập để xem lịch sử phân tích"
      />
    );
  }

  const analyses = await getUserSavedAnalyses(currentUser.id);

  if (analyses.length === 0) {
    return (
      <HistoryEmptyState
        description="Khi bạn lưu hồ sơ, hợp tuổi, thần số học hoặc ngày đẹp, các kết quả sẽ xuất hiện tại đây."
        href="/"
        icon="sparkles"
        label="Khám phá miễn phí"
        title="Bạn chưa có phân tích nào được lưu"
      />
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10 md:px-8 md:py-14">
      <section className="max-w-3xl">
        <p className="text-sm font-semibold text-primary">Lịch sử</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-normal text-foreground md:text-5xl">
          Lịch sử phân tích của bạn
        </h1>
        <p className="mt-4 text-base leading-8 text-muted-foreground">
          Xem lại những kết quả đã lưu. Nội dung chỉ mang tính tham khảo và khám
          phá bản thân.
        </p>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-2">
        {analyses.map((analysis) => (
          <HistoryCard
            createdAt={analysis.createdAt}
            id={analysis.id}
            key={analysis.id}
            summary={analysis.summary}
            title={analysis.title}
            type={analysis.type}
          />
        ))}
      </section>
    </main>
  );
}
