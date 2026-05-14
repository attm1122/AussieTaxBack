import type { Metadata } from "next";
import ThirdPartyScripts, { ADSENSE_CLIENT } from "@/components/ThirdPartyScripts";
import { siteName, siteUrl } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: "Australian Tax Refund Calculator | Aussie Tax Back",
    template: `%s | ${siteName}`,
  },
  description:
    "Estimate your Australian tax refund or tax payable in plain English. Simple tax calculator for working holiday makers, casual workers, FIFO workers and people with more than one job.",
  openGraph: {
    title: "Australian Tax Refund Calculator",
    description: "Estimate your Australian tax refund in plain English",
    url: siteUrl,
    siteName,
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aussie Tax Back",
    description: "Estimate your Australian tax refund in plain English",
  },
  icons: {
    icon: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaOrg = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
      inLanguage: "en-AU",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: siteName,
      url: siteUrl,
      description:
        "Estimate your Australian tax refund or tax payable in plain English.",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "AUD",
      },
      areaServed: {
        "@type": "Country",
        name: "Australia",
      },
      inLanguage: "en-AU",
      isAccessibleForFree: true,
    },
  ];

  return (
    <html lang="en-AU">
      <head>
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="text-slate-950 antialiased">
        {children}
        <ThirdPartyScripts />
      </body>
    </html>
  );
}
