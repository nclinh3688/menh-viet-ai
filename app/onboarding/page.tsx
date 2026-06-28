import { OnboardingForm } from "@/components/onboarding/onboarding-form";
import { ASTROLOGY_DISCLAIMER } from "@/lib/constants";

export default function OnboardingPage() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-96px)] w-full max-w-5xl items-center px-5 py-10 md:px-8">
      <div className="grid w-full gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
        <div className="space-y-5">
          <span className="inline-flex rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            Hồ sơ cá nhân
          </span>
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold leading-tight tracking-normal text-foreground md:text-5xl">
              Khởi tạo hồ sơ vận mệnh
            </h1>
            <p className="max-w-xl text-base leading-8 text-muted-foreground">
              Nhập thông tin một lần để Mệnh Việt AI cá nhân hóa các phân tích
              dành cho bạn.
            </p>
          </div>
          <p className="max-w-md rounded-lg border bg-card/52 px-4 py-3 text-sm leading-6 text-muted-foreground">
            {ASTROLOGY_DISCLAIMER}
          </p>
        </div>

        <OnboardingForm />
      </div>
    </section>
  );
}
