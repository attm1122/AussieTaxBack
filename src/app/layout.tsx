import type { Metadata } from "next";
import ThirdPartyScripts from "@/components/ThirdPartyScripts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aussietaxback.com"),
  title: "Aussie Tax Back | Australian Tax Refund Calculator",
  description:
    "Estimate your Australian tax refund or tax payable in plain English. Simple tax calculator for working holiday makers, casual workers, FIFO workers and people with more than one job.",
  keywords: [
    "tax refund calculator",
    "Australian tax",
    "tax return estimate",
    "tax calculator Australia",
    "ATO refund",
    "work expenses",
  ],
  openGraph: {
    title: "Aussie Tax Back",
    description: "Estimate your Australian tax refund in plain English",
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
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Aussie Tax Back",
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
  };

  return (
    <html lang="en-AU">
      <head>
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
