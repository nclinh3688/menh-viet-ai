import type { Metadata } from "next";

interface BuildMetadataInput {
  title: string;
  description: string;
}

export function buildMetadata({
  title,
  description,
}: BuildMetadataInput): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "vi_VN",
    },
  };
}
