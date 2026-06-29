import Link from "next/link";
import { ArrowLeft, CheckCircle2, Facebook, LockKeyhole } from "lucide-react";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { MVButton } from "@/components/form/mv-button";
import { Button } from "@/components/ui/button";
import type { AuthProviderStatus, CurrentUser } from "@/lib/auth";

interface LoginCardProps {
  currentUser?: CurrentUser | null;
  providerStatus: AuthProviderStatus;
}

export function LoginCard({ currentUser = null, providerStatus }: LoginCardProps) {
  const googleReady = providerStatus.googleConfigured && providerStatus.hasAuthSecret;

  return (
    <section className="mx-auto flex min-h-[calc(100vh-160px)] w-full max-w-5xl items-center px-5 py-12 md:px-8">
      <div className="grid w-full gap-6 rounded-md border bg-card/72 p-5 shadow-2xl shadow-primary/10 backdrop-blur-xl md:grid-cols-[0.95fr_1.05fr] md:p-8">
        <div className="space-y-5">
          <div className="flex size-12 items-center justify-center rounded-md bg-primary/12 text-primary">
            <LockKeyhole className="size-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-primary">Freemium Account</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-normal text-foreground md:text-4xl">
              Lưu hồ sơ vận mệnh của bạn
            </h1>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Đăng nhập để lưu kết quả, xem lại lịch sử và đồng bộ hồ sơ trên
              nhiều thiết bị.
            </p>
          </div>
          <p className="rounded-md border border-primary/20 bg-primary/8 px-4 py-3 text-sm leading-6 text-muted-foreground">
            Nội dung chỉ mang tính tham khảo và khám phá bản thân.
          </p>
        </div>

        <div className="rounded-md border bg-background/52 p-5">
          {currentUser != null ? (
            <div className="rounded-md border border-primary/25 bg-primary/10 p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="size-5 text-primary" />
                <div>
                  <h2 className="font-semibold text-foreground">
                    Bạn đã đăng nhập
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {currentUser.name ?? currentUser.email ?? "Tài khoản của bạn"}
                  </p>
                </div>
              </div>
              <Button asChild className="mt-4 w-full" variant="secondary">
                <Link href="/history">Xem lịch sử phân tích</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-3">
              <GoogleSignInButton disabled={!googleReady} />
              <MVButton
                className="w-full justify-center"
                disabled
                size="lg"
                type="button"
                variant="secondary"
              >
                <Facebook className="size-4" />
                Tiếp tục với Facebook - Sắp ra mắt
              </MVButton>
            </div>
          )}

          {currentUser == null ? null : (
            <p className="mt-4 rounded-md border border-white/10 bg-card/48 px-4 py-3 text-sm leading-6 text-muted-foreground">
              Bạn có thể quay lại dashboard hoặc lịch sử. Các trang public vẫn
              dùng được bình thường.
            </p>
          )}

          {currentUser == null ? (
            <>
              <div className="mt-5 rounded-md border border-white/10 bg-card/48 p-4">
                <h2 className="text-base font-semibold text-foreground">
                  Bạn vẫn có thể dùng miễn phí
                </h2>
                <ul className="mt-3 grid gap-2 text-sm leading-6 text-muted-foreground">
                  <li>Không bắt buộc đăng nhập để xem kết quả cơ bản.</li>
                  <li>Đăng nhập chỉ dùng để lưu hồ sơ và lịch sử sau này.</li>
                  <li>
                    Premium/Pro sẽ được mở ở sprint riêng, chưa có thanh toán thật.
                  </li>
                </ul>
              </div>

              <Button asChild className="mt-5" variant="ghost">
                <Link href="/">
                  <ArrowLeft className="size-4" />
                  Tiếp tục xem không cần đăng nhập
                </Link>
              </Button>
            </>
          ) : (
            <Button asChild className="mt-5" variant="ghost">
              <Link href="/">
                <ArrowLeft className="size-4" />
                Về trang chủ
              </Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
