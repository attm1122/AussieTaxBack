"use client";

import { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    question: "Is this an official ATO calculator?",
    answer:
      "No. This is an independent tool to help you estimate. Only the ATO can provide official assessments.",
  },
  {
    question: "Can casual workers use this calculator?",
    answer:
      "Yes. Casual workers can include work expenses just like full-time workers.",
  },
  {
    question: "Can FIFO workers use this calculator?",
    answer:
      "Yes. FIFO and DIDO workers may have extra work expenses to claim. Be careful with travel expenses.",
  },
  {
    question: "What if I have more than one job?",
    answer:
      "Add your total income from all jobs. Include work expenses from all jobs too.",
  },
  {
    question: "Can I include work clothes or safety gear?",
    answer:
      "Yes, if they are specific to your job like safety boots, high-vis, hard hats. Everyday clothes usually do not count.",
  },
  {
    question: "Can I include phone and internet costs?",
    answer:
      "Yes, for the work-related portion. Only include the percentage you use for work.",
  },
  {
    question: "Why is this only an estimate?",
    answer:
      "Your real tax can change if the ATO has extra income, Medicare, study loan, or other details for you.",
  },
];

const helpfulLinks = [
  {
    label: "Work clothing and laundry expenses",
    href: "https://www.ato.gov.au/individuals/income-and-deductions/deductions-you-can-claim/clothing-and-laundry",
  },
  {
    label: "Car expenses",
    href: "https://www.ato.gov.au/individuals/income-and-deductions/deductions-you-can-claim/car-expenses",
  },
  {
    label: "Travel expenses",
    href: "https://www.ato.gov.au/individuals/income-and-deductions/deductions-you-can-claim/travel-expenses",
  },
  {
    label: "Training and self-education expenses",
    href: "https://www.ato.gov.au/individuals/income-and-deductions/deductions-you-can-claim/self-education-expenses",
  },
  {
    label: "Phone and internet expenses",
    href: "https://www.ato.gov.au/individuals/income-and-deductions/deductions-you-can-claim/phone-and-internet-expenses",
  },
  {
    label: "Tools and equipment",
    href: "https://www.ato.gov.au/individuals/income-and-deductions/deductions-you-can-claim/tools-and-equipment",
  },
  {
    label: "Working from home expenses",
    href: "https://www.ato.gov.au/individuals/income-and-deductions/deductions-you-can-claim/working-from-home-expenses",
  },
  {
    label: "Individual income tax rates",
    href: "https://www.ato.gov.au/rates/individual-income-tax-rates",
  },
  {
    label: "Medicare",
    href: "https://www.ato.gov.au/individuals/medicare-levy",
  },
  {
    label: "Study loans",
    href: "https://www.ato.gov.au/individuals/study-and-training-support-loans",
  },
];

export function SEOContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* How it works */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-slate-950 mb-4">
          How this tax refund calculator works
        </h2>
        <ol className="grid gap-3 text-slate-700 sm:grid-cols-3">
          <li>
            <span className="block text-sm font-semibold text-slate-950">1. Add income</span>
            <span className="text-sm">Enter what you earned and tax already taken out.</span>
          </li>
          <li>
            <span className="block text-sm font-semibold text-slate-950">2. Add work costs</span>
            <span className="text-sm">Use a total or the guided expense questions.</span>
          </li>
          <li>
            <span className="block text-sm font-semibold text-slate-950">3. Check myTax</span>
            <span className="text-sm">Use the guide to compare against myGov.</span>
          </li>
        </ol>
      </section>

      <section className="mb-10 rounded-lg border border-slate-200 bg-slate-50 p-5">
        <h2 className="text-xl font-semibold text-slate-950 mb-3">
          Helpful guides
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link href="/working-holiday-tax/" className="rounded-md bg-white p-4 text-sm font-medium text-slate-800 shadow-sm hover:text-emerald-700">
            Working holiday tax refund guide
          </Link>
          <Link href="/working-holiday-maker-tax-rates/" className="rounded-md bg-white p-4 text-sm font-medium text-slate-800 shadow-sm hover:text-emerald-700">
            Working holiday maker tax rates
          </Link>
          <Link href="/backpacker-tax-refund-australia/" className="rounded-md bg-white p-4 text-sm font-medium text-slate-800 shadow-sm hover:text-emerald-700">
            Backpacker tax refund guide
          </Link>
          <Link href="/tax-file-number-backpacker/" className="rounded-md bg-white p-4 text-sm font-medium text-slate-800 shadow-sm hover:text-emerald-700">
            Tax file number for backpackers
          </Link>
          <Link href="/tax-return-after-leaving-australia/" className="rounded-md bg-white p-4 text-sm font-medium text-slate-800 shadow-sm hover:text-emerald-700">
            Tax return after leaving Australia
          </Link>
          <Link href="/casual-worker-tax-refund-calculator/" className="rounded-md bg-white p-4 text-sm font-medium text-slate-800 shadow-sm hover:text-emerald-700">
            Casual worker tax calculator
          </Link>
          <Link href="/farm-work-tax-refund/" className="rounded-md bg-white p-4 text-sm font-medium text-slate-800 shadow-sm hover:text-emerald-700">
            Farm work tax refund guide
          </Link>
          <Link href="/mygov-income-statement/" className="rounded-md bg-white p-4 text-sm font-medium text-slate-800 shadow-sm hover:text-emerald-700">
            How to read your myGov income statement
          </Link>
          <Link href="/medicare-entitlement-statement/" className="rounded-md bg-white p-4 text-sm font-medium text-slate-800 shadow-sm hover:text-emerald-700">
            Medicare statement guide
          </Link>
          <Link href="/temporary-visa-medicare-tax/" className="rounded-md bg-white p-4 text-sm font-medium text-slate-800 shadow-sm hover:text-emerald-700">
            Temporary visa Medicare guide
          </Link>
          <Link href="/work-expenses-australia/" className="rounded-md bg-white p-4 text-sm font-medium text-slate-800 shadow-sm hover:text-emerald-700">
            Work expenses guide
          </Link>
          <Link href="/what-can-i-claim-on-tax-australia/" className="rounded-md bg-white p-4 text-sm font-medium text-slate-800 shadow-sm hover:text-emerald-700">
            What can I claim on tax?
          </Link>
          <Link href="/tax-return-checklist/" className="rounded-md bg-white p-4 text-sm font-medium text-slate-800 shadow-sm hover:text-emerald-700">
            Tax return checklist
          </Link>
        </div>
      </section>

      {/* What expenses */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-slate-950 mb-4">
          What work expenses can you include?
        </h2>
        <ul className="grid sm:grid-cols-2 gap-2 text-slate-700">
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 mt-0.5">&#10003;</span>
            <span>Work clothes and safety gear</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 mt-0.5">&#10003;</span>
            <span>Tools and equipment</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 mt-0.5">&#10003;</span>
            <span>Phone and internet</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 mt-0.5">&#10003;</span>
            <span>Training and licences</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 mt-0.5">&#10003;</span>
            <span>Work travel</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 mt-0.5">&#10003;</span>
            <span>Subscriptions and memberships</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 mt-0.5">&#10003;</span>
            <span>Donations to charity</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 mt-0.5">&#10003;</span>
            <span>Tax agent fees</span>
          </li>
        </ul>
      </section>

      {/* Helpful links */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-slate-950 mb-2">
          Helpful official links
        </h2>
        <p className="text-sm text-slate-600 mb-4">
          Want to check the official rules? These ATO pages may help.
        </p>
        <ul className="space-y-1.5">
          {helpfulLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:underline text-sm"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950">
        <p className="font-semibold">Rates last checked: 15 May 2026</p>
        <p className="mt-1">
          Tax rates, working holiday maker rates, Medicare guidance, study loan
          rates and car kilometre rates were checked against public ATO pages.
        </p>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-slate-950 mb-4">
          Frequently asked questions
        </h2>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-slate-200 rounded-lg overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left px-4 py-3 flex justify-between items-center hover:bg-slate-50 transition-colors"
                aria-expanded={openFaq === i}
              >
                <span className="text-sm font-medium text-slate-800">
                  {faq.question}
                </span>
                <span className="text-slate-400 ml-2 text-lg">
                  {openFaq === i ? "\u2212" : "+"}
                </span>
              </button>
              {openFaq === i && (
                <div className="px-4 pb-3 text-sm text-slate-600 border-t border-slate-100 pt-2">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
