import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdSlot from "@/components/ads/AdSlot";

export const metadata = {
  title: "What Can I Claim on Tax in Australia? | Aussie Tax Back",
  description:
    "Simple list of common Australian tax deductions and work expenses to check before lodging.",
};

export default function WhatCanIClaimOnTaxAustraliaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 py-12">
          <Link href="/#calculator" className="mb-5 inline-block text-sm font-medium text-emerald-700">
            Back to calculator
          </Link>
          <p className="text-sm font-semibold text-emerald-700">
            Work expenses
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            What can I claim on tax in Australia?
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            The simple test is: you paid for it, it was for work, and you were
            not paid back.
          </p>
          <AdSlot placement="article" className="mt-8" />

          <div className="mt-8 space-y-8 text-slate-700">
            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                Common claims to check
              </h2>
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>Protective clothing and safety gear</li>
                <li>Tools and equipment</li>
                <li>Phone and internet used for work</li>
                <li>Training linked to your current job</li>
                <li>Union fees and work memberships</li>
                <li>Tax agent fees from last year</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                Usually not claimable
              </h2>
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>Normal clothes</li>
                <li>Normal meals</li>
                <li>Travel from home to your regular workplace</li>
                <li>Anything your employer paid back</li>
              </ul>
            </section>
            <Link
              href="/#calculator"
              className="inline-flex rounded-md bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Add expenses to the calculator
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
