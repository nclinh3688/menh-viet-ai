import type { Metadata } from "next";
import { AuthSessionProvider } from "@/components/auth/auth-session-provider";
import { MainLayout } from "@/components/layout/main-layout";
import { PremiumBackground } from "@/components/visual/premium-background";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo/metadata";
import "./globals.css";

export const metadata: Metadata = buildMetadata({
  title: APP_NAME,
  description: APP_DESCRIPTION,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark">
      <body>
        <PremiumBackground />
        <AuthSessionProvider>
          <MainLayout>{children}</MainLayout>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
