const scores = [
  ["Tổng quan", 84],
  ["Tình cảm", 78],
  ["Công việc", 88],
  ["Tài chính", 72],
] as const;

export function DashboardPreview() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8">
      <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold text-primary">Demo dashboard</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground md:text-4xl">
            Hồ sơ vận mệnh được trình bày rõ ràng, dễ quay lại mỗi ngày
          </h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground">
            Dashboard gom lá số cơ bản, chỉ số hôm nay, màu hợp, hướng tốt và
            gợi ý cá nhân vào một nơi để người dùng không phải đọc các đoạn luận
            giải dài, khó theo dõi.
          </p>
        </div>

        <div className="rounded-lg border bg-card/70 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-6">
          <div className="flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-primary">Xin chào, Nguyễn An</p>
              <h3 className="mt-2 text-2xl font-semibold text-foreground">
                Ất Hợi · Sơn Đầu Hỏa
              </h3>
            </div>
            <span className="w-fit rounded-full border px-3 py-1 text-xs font-semibold text-muted-foreground">
              Free Plan
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {["Thiên Can: Ất", "Con giáp: Heo", "Cung Phi: Khôn"].map((item) => (
              <div className="rounded-md border bg-background/58 p-3 text-sm text-foreground" key={item}>
                {item}
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4">
            {scores.map(([label, score]) => (
              <div key={label}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-semibold text-primary">{score}/100</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
