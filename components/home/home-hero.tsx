"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";

const genderOptions = [
  { label: "Nam", value: "MALE" },
  { label: "Nữ", value: "FEMALE" },
  { label: "Khác", value: "OTHER" },
] as const;

const inputClassName =
  "h-11 rounded-md border bg-background/72 px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/72 focus:border-primary focus:ring-2 focus:ring-primary/20";

export function HomeHero() {
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const fullName = String(formData.get("fullName") ?? "").trim();
    const birthDate = String(formData.get("birthDate") ?? "");
    const birthTime = String(formData.get("birthTime") ?? "");
    const gender = String(formData.get("gender") ?? "MALE");
    const params = new URLSearchParams();
    if (fullName) params.set("fullName", fullName);
    if (birthDate) params.set("birthDate", birthDate);
    if (birthTime) params.set("birthTime", birthTime);
    params.set("gender", gender);

    router.push(`/onboarding?${params.toString()}`);
  }

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          alt="Không gian làm việc cao cấp với sổ tay, la bàn và bản đồ sao trừu tượng"
          className="h-full w-full object-cover opacity-34"
          fill
          priority
          src="/images/menh-viet-hero.png"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/88 to-background/48" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/42 to-transparent" />
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-96px)] w-full max-w-6xl gap-8 px-5 py-12 md:px-8 lg:grid-cols-[1fr_0.84fr] lg:items-center lg:py-18">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {APP_NAME}
          </div>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-normal text-foreground md:text-6xl">
            Khám phá vận mệnh của bạn bằng AI
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
            Tạo hồ sơ ngày sinh để xem Can Chi, Ngũ hành, Cung Phi, màu hợp,
            hướng hợp và dashboard cá nhân hóa theo hệ quy chiếu tham khảo.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <ProofMetric value="250.000+" label="hồ sơ đã phân tích" />
            <ProofMetric value="4.9/5" label="mức độ hài lòng" />
            <ProofMetric value="AI" label="cá nhân hóa nội dung" />
          </div>

          <p className="mt-6 flex max-w-2xl items-start gap-2 text-sm leading-6 text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            Nội dung chỉ mang tính tham khảo và khám phá bản thân, không thay
            thế tư vấn chuyên môn.
          </p>
        </div>

        <form
          className="rounded-lg border bg-card/72 p-5 shadow-2xl shadow-black/35 backdrop-blur-xl md:p-6"
          onSubmit={handleSubmit}
        >
          <div className="mb-5">
            <p className="text-sm font-semibold text-primary">Xem miễn phí</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-normal text-foreground">
              Nhập thông tin ngày sinh
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Bạn có thể hoàn thiện hồ sơ ở bước tiếp theo.
            </p>
          </div>

          <div className="grid gap-4">
            <label
              className="grid gap-2 text-sm font-medium text-foreground"
              htmlFor="hero-fullName"
            >
              Họ tên
              <input
                className={inputClassName}
                id="hero-fullName"
                name="fullName"
                placeholder="Ví dụ: Nguyễn An"
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label
                className="grid gap-2 text-sm font-medium text-foreground"
                htmlFor="hero-birthDate"
              >
                Ngày sinh
                <input
                  className={inputClassName}
                  id="hero-birthDate"
                  name="birthDate"
                  required
                  type="date"
                />
              </label>
              <label
                className="grid gap-2 text-sm font-medium text-foreground"
                htmlFor="hero-birthTime"
              >
                Giờ sinh optional
                <input
                  className={inputClassName}
                  id="hero-birthTime"
                  name="birthTime"
                  type="time"
                />
              </label>
            </div>
            <label
              className="grid gap-2 text-sm font-medium text-foreground"
              htmlFor="hero-gender"
            >
              Giới tính
              <select
                className={inputClassName}
                defaultValue="MALE"
                id="hero-gender"
                name="gender"
              >
                {genderOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <Button className="mt-2 w-full" size="lg" type="submit">
              Xem miễn phí
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

function ProofMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-card/54 p-4 backdrop-blur">
      <p className="text-2xl font-semibold text-foreground">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
