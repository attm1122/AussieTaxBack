import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TaxRefundCalculator from "@/components/calculator/TaxRefundCalculator";
import ExampleCalculations from "@/components/calculator/ExampleCalculations";
import AdSlot from "@/components/ads/AdSlot";
import { SEOContent } from "./SEOContent";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="border-b border-emerald-950/10">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1fr_360px] md:items-center md:py-14">
            <div>
              <p className="mb-3 inline-flex rounded-full border border-emerald-200 bg-white px-3 py-1 text-sm font-medium text-emerald-800 shadow-sm">
                Built for working holiday makers, casual workers and first-time lodgers
              </p>
              <h1 className="max-w-3xl text-4xl font-bold tracking-normal text-slate-950 md:text-6xl">
                Work out your Australian tax refund in plain English.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Add your income, tax already taken out, and work expenses. Get a simple estimate and a guide for what to check in myTax.
              </p>
              <div className="no-print mt-7 flex flex-wrap gap-3">
                <a
                  href="#calculator"
                  className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                >
                  Start calculator
                </a>
                <Link
                  href="/working-holiday-tax/"
                  className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700"
                >
                  Working holiday guide
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-950">What you get</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />A refund or amount-to-pay estimate</li>
                <li className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />Working holiday maker tax rates</li>
                <li className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />Plain work expense categories</li>
                <li className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />A checklist for myGov and myTax</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="calculator" className="py-8 md:py-12">
          <div className="mx-auto max-w-4xl px-4">
            <AdSlot placement="top" className="mb-6" />
            <TaxRefundCalculator />
          </div>
        </section>

        <ExampleCalculations />

        <section className="bg-slate-50 px-4 pb-12">
          <AdSlot placement="content" />
        </section>

        <section className="border-t border-slate-200 bg-white py-12">
          <div className="mx-auto max-w-4xl px-4">
            <SEOContent />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
