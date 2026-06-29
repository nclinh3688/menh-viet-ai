import type { Metadata } from "next";

interface BuildMetadataInput {
  title: string;
  description: string;
  path?: string;
}

export function buildMetadata({
  title,
  description,
  path = "/",
}: BuildMetadataInput): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://menhviet.ai";

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: path,
    },
    icons: {
      icon: "/icon.svg",
      apple: "/icons/icon-192.svg",
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: "vi_VN",
      siteName: "Mệnh Việt AI",
      url: path,
      images: [
        {
          url: "/images/menh-viet-hero.png",
          width: 1200,
          height: 630,
          alt: "Mệnh Việt AI",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/menh-viet-hero.png"],
    },
  };
}
