export const defaultMetadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: "Parts Bazar",
  description: "A Trusted Online Store for Genuine Vehicle Parts.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Parts Bazar",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Parts Bazar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Parts Bazar",
    description: "A Trusted Online Store for Genuine Vehicle Parts.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export const viewport = {
  themeColor: "oklch(0.577 0.245 27.325)",
};
