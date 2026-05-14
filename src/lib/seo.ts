import type { Metadata } from "next";

export const siteUrl = "https://aussietaxback.com";
export const siteName = "Aussie Tax Back";

type PageMetadataInput = {
  title: string;
  description: string;
  path: `/${string}`;
  noIndex?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const canonicalPath = path.endsWith("/") ? path : `${path}/`;
  const url = `${siteUrl}${canonicalPath}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      type: "website",
      locale: "en_AU",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
  };
}

export const guidePages = [
  {
    path: "/working-holiday-tax/",
    title: "Working Holiday Tax Refund Guide Australia",
    description:
      "Plain-English guide for working holiday makers estimating an Australian tax refund or tax bill.",
  },
  {
    path: "/backpacker-tax-refund-australia/",
    title: "Backpacker Tax Refund Australia",
    description:
      "Simple backpacker tax refund guide for people who worked in Australia on a working holiday visa.",
  },
  {
    path: "/casual-worker-tax-refund-calculator/",
    title: "Casual Worker Tax Refund Calculator Australia",
    description:
      "Simple tax refund estimate and myTax checklist for casual workers in Australia.",
  },
  {
    path: "/farm-work-tax-refund/",
    title: "Farm Work Tax Refund Australia",
    description:
      "Simple guide for farm workers and working holiday makers checking Australian tax refund estimates.",
  },
  {
    path: "/mygov-income-statement/",
    title: "How To Read Your myGov Income Statement",
    description:
      "Simple guide to the income and tax taken out numbers used in an Australian tax return estimate.",
  },
  {
    path: "/medicare-entitlement-statement/",
    title: "Medicare Entitlement Statement Guide",
    description:
      "Simple guide to Medicare Entitlement Statements for temporary visa holders doing an Australian tax return.",
  },
  {
    path: "/temporary-visa-medicare-tax/",
    title: "Temporary Visa Medicare Tax Guide",
    description:
      "Plain-English guide to Medicare questions for temporary visa holders lodging an Australian tax return.",
  },
  {
    path: "/work-expenses-australia/",
    title: "What Work Expenses Can I Claim?",
    description:
      "Plain-English guide to common Australian work expenses for tax time.",
  },
  {
    path: "/what-can-i-claim-on-tax-australia/",
    title: "What Can I Claim on Tax in Australia?",
    description:
      "Simple list of common Australian tax deductions and work expenses to check before lodging.",
  },
  {
    path: "/tax-return-checklist/",
    title: "Australian Tax Return Checklist",
    description:
      "Simple Australian tax return checklist for casual workers, backpackers and first-time lodgers.",
  },
] as const;

export const supportPages = [
  {
    path: "/about/",
    title: "About Aussie Tax Back",
    description:
      "About Aussie Tax Back, a plain-English Australian tax estimate tool.",
  },
  {
    path: "/contact/",
    title: "Contact Aussie Tax Back",
    description:
      "Contact and feedback information for Aussie Tax Back.",
  },
  {
    path: "/privacy/",
    title: "Privacy Policy",
    description:
      "Privacy policy for Aussie Tax Back, including calculator entries, cookies, analytics and ads.",
  },
  {
    path: "/disclaimer/",
    title: "Disclaimer",
    description:
      "Disclaimer for Aussie Tax Back and its Australian tax refund estimate calculator.",
  },
] as const;
