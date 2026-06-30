import { ArrowRight, BookOpen, GitBranch, Scale } from "lucide-react";
import { ASTROLOGY_DISCLAIMER } from "@/lib/constants";

const EDUCATION_ITEMS = [
  {
    icon: BookOpen,
    title: "Ngũ hành là gì?",
    content:
      "Ngũ Hành là hệ quy chiếu gồm Kim, Mộc, Thủy, Hỏa, Thổ, thường được dùng để mô tả cách các nhóm năng lượng biểu tượng tương tác với nhau trong văn hóa phương Đông.",
  },
  {
    icon: GitBranch,
    title: "Tương sinh là gì?",
    content:
      "Tương sinh mô tả mối quan hệ hỗ trợ, nuôi dưỡng hoặc tạo điều kiện cho nhau phát triển, ví dụ Mộc sinh Hỏa hoặc Thổ sinh Kim trong vòng sinh.",
  },
  {
    icon: Scale,
    title: "Tương khắc là gì?",
    content:
      "Tương khắc mô tả mối quan hệ kiểm soát hoặc tiết chế. Trong ứng dụng hiện đại, nên hiểu như một gợi ý cân bằng, không phải phán quyết tốt xấu cố định.",
  },
];

export function FiveElementsEducation() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Kiến thức nền tảng
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
          Hiểu Ngũ Hành theo cách cân bằng và thực tế
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Nội dung bên dưới giúp bạn đọc kết quả theo hướng khám phá bản thân,
          tránh diễn giải cực đoan hoặc phụ thuộc vào kết quả.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {EDUCATION_ITEMS.map((item) => (
          <article
            className="rounded-md border border-white/10 bg-card/62 p-5 backdrop-blur"
            key={item.title}
          >
            <div className="mb-5 flex size-11 items-center justify-center rounded-md bg-primary/10 text-primary">
              <item.icon className="size-5" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {item.content}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-md border border-primary/20 bg-primary/8 p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            {ASTROLOGY_DISCLAIMER} Nội dung không thay thế tư vấn chuyên môn về
            tài chính, sức khỏe, pháp lý hoặc các quyết định quan trọng.
          </p>
          <a
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80"
            href="/onboarding"
          >
            Tạo hồ sơ đầy đủ
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
