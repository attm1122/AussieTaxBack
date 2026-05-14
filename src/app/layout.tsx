import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Australian Tax Refund Calculator | Estimate Your Tax Return",
  description:
    "Estimate your Australian tax refund or tax payable in plain English. Simple tax calculator for employees, casual workers, FIFO workers and people with more than one job.",
  keywords: [
    "tax refund calculator",
    "Australian tax",
    "tax return estimate",
    "tax calculator Australia",
    "ATO refund",
    "work expenses",
  ],
  openGraph: {
    title: "Australian Tax Refund Calculator",
    description: "Estimate your tax refund in plain English",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Australian Tax Refund Calculator",
    description: "Estimate your tax refund in plain English",
  },
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
    name: "Australian Tax Refund Calculator",
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
      <body className="bg-gray-50 text-gray-900 antialiased">{children}</body>
    </html>
  );
}
