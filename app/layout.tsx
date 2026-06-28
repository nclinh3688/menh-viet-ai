import type { Metadata } from "next";
import { MainLayout } from "@/components/layout/main-layout";
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
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
