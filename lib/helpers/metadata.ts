import type { Metadata } from "next";
import { APP_NAME, APP_DESCRIPTION, APP_URL } from "@/constants/app";

interface MetadataOptions {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  path?: string;
}

export function constructMetadata({
  title,
  description = APP_DESCRIPTION,
  image = "/og-image.png",
  noIndex = false,
  path = "",
}: MetadataOptions = {}): Metadata {
  const fullTitle = title ? `${title} — ${APP_NAME}` : `${APP_NAME} — Undangan Digital Premium`;
  const url = `${APP_URL}${path}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(APP_URL),
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: APP_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      type: "website",
      locale: "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@tamukita",
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    alternates: {
      canonical: url,
    },
  };
}
