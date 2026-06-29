import type { MetadataRoute } from "next";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? APP_NAME;

  return {
    name: siteName,
    short_name: "Mệnh Việt",
    description: APP_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#08070f",
    theme_color: "#d7b56d",
    lang: "vi",
    icons: [
      {
        src: "/icons/icon-192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
      },
      {
        src: "/icons/icon-512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
      },
    ],
  };
}
