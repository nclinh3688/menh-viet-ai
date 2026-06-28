const faqs = [
  {
    answer:
      "Không. Mệnh Việt AI là nền tảng khám phá bản thân bằng các hệ quy chiếu tham khảo như Can Chi, Ngũ hành, Cung Phi và AI Coach ở giai đoạn sau.",
    question: "Mệnh Việt AI có phải web xem bói không?",
  },
  {
    answer:
      "Bạn có thể bắt đầu miễn phí với hồ sơ cơ bản. Các báo cáo sâu, PDF và công cụ nâng cao sẽ thuộc Premium khi triển khai.",
    question: "Tôi có thể dùng miễn phí không?",
  },
  {
    answer:
      "Có. Nội dung chỉ mang tính tham khảo và khám phá bản thân, không thay thế tư vấn chuyên môn.",
    question: "Kết quả có phải sự thật tuyệt đối không?",
  },
  {
    answer:
      "Form nhanh chuyển bạn sang onboarding kèm thông tin đã nhập để hoàn thiện hồ sơ trước khi xem dashboard.",
    question: "Sau khi nhập ngày sinh thì chuyện gì xảy ra?",
  },
];

export function FaqSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold text-primary">FAQ</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-normal text-foreground md:text-4xl">
          Câu hỏi thường gặp
        </h2>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {faqs.map((faq) => (
          <article className="rounded-lg border bg-card/62 p-5 backdrop-blur-xl" key={faq.question}>
            <h3 className="text-lg font-semibold text-foreground">{faq.question}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
