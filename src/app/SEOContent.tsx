"use client";

import { useState } from "react";

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
      "Your final tax depends on many factors including your full income, records, private health cover, student loan, offsets and your ATO assessment.",
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
    label: "Medicare levy",
    href: "https://www.ato.gov.au/individuals/medicare-levy",
  },
  {
    label: "Study and training loan repayments",
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
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          How this tax refund calculator works
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>
            Enter your income details - what you earned and how much tax was
            already taken from your pay.
          </li>
          <li>
            Add your work expenses - either a total you already know, or use our
            guided categories to find them.
          </li>
          <li>Get your instant estimate - see if you may get a refund or need to pay.</li>
        </ol>
      </section>

      {/* What expenses */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          What work expenses can you include?
        </h2>
        <ul className="grid sm:grid-cols-2 gap-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">&#10003;</span>
            <span>Work clothes and safety gear</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">&#10003;</span>
            <span>Tools and equipment</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">&#10003;</span>
            <span>Phone and internet</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">&#10003;</span>
            <span>Training and licences</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">&#10003;</span>
            <span>Work travel</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">&#10003;</span>
            <span>Subscriptions and memberships</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">&#10003;</span>
            <span>Donations to charity</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-0.5">&#10003;</span>
            <span>Tax agent fees</span>
          </li>
        </ul>
      </section>

      {/* Helpful links */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Helpful official links
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Want to check the official rules? These ATO pages may help.
        </p>
        <ul className="space-y-1.5">
          {helpfulLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-700 hover:underline text-sm"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Frequently asked questions
        </h2>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition-colors"
                aria-expanded={openFaq === i}
              >
                <span className="text-sm font-medium text-gray-800">
                  {faq.question}
                </span>
                <span className="text-gray-400 ml-2 text-lg">
                  {openFaq === i ? "\u2212" : "+"}
                </span>
              </button>
              {openFaq === i && (
                <div className="px-4 pb-3 text-sm text-gray-600 border-t border-gray-100 pt-2">
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
