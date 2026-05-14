import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdSlot from "@/components/ads/AdSlot";
import ArticleJsonLd from "@/components/content/ArticleJsonLd";
import GuideSupport from "@/components/content/GuideSupport";
import { pageMetadata } from "@/lib/seo";

const title = "Working Holiday Maker Tax Rates Australia";
const description =
  "Simple guide to Australian working holiday maker tax rates, TFN checks and refund estimates.";

export const metadata = pageMetadata({
  title,
  description,
  path: "/working-holiday-maker-tax-rates/",
});

export default function WorkingHolidayMakerTaxRatesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 py-12">
          <ArticleJsonLd
            title={title}
            description={description}
            path="/working-holiday-maker-tax-rates/"
          />
          <Link
            href="/#calculator"
            className="mb-5 inline-block text-sm font-medium text-emerald-700"
          >
            Back to calculator
          </Link>
          <p className="text-sm font-semibold text-emerald-700">
            Working holiday makers
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            Working holiday maker tax rates in Australia
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            If you are on a 417 or 462 visa, your tax can work differently from
            a resident worker. This page explains the basics in plain English.
          </p>
          <AdSlot placement="article" className="mt-8" />

          <div className="mt-8 space-y-8 text-slate-700">
            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                The simple version
              </h2>
              <p className="mt-2">
                Working holiday makers are usually taxed from the first dollar
                they earn. That is why a backpacker refund is often smaller than
                a resident worker earning the same amount.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                Your employer matters
              </h2>
              <p className="mt-2">
                Employers should register with the ATO as working holiday maker
                employers. If the wrong rate was used, the calculator can help
                you compare your income and tax taken out with an estimate.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                Your TFN matters too
              </h2>
              <p className="mt-2">
                If you do not give your employer a tax file number, more tax may
                be taken from your pay. You should still use the income
                statement from myGov when estimating your tax return.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                What to enter in the calculator
              </h2>
              <ol className="mt-3 list-decimal space-y-2 pl-5">
                <li>Choose “Working holiday maker visa”.</li>
                <li>Add your total income from all jobs.</li>
                <li>Add the total tax already taken out.</li>
                <li>Add only work costs you paid yourself.</li>
                <li>Check Medicare if you were on a temporary visa.</li>
              </ol>
            </section>

            <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
              <h2 className="font-semibold text-emerald-950">
                Estimate your working holiday tax
              </h2>
              <p className="mt-2 text-sm text-emerald-900">
                Use the calculator first, then compare the result with myTax
                before lodging.
              </p>
              <Link
                href="/#calculator"
                className="mt-4 inline-flex rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Open calculator
              </Link>
            </section>
          </div>

          <GuideSupport
            sources={[
              {
                label: "ATO: Working holiday makers",
                href: "https://www.ato.gov.au/individuals/ind/resident-for-tax-if-whm-/",
              },
              {
                label: "ATO: Schedule 15 tax table for working holiday makers",
                href: "https://www.ato.gov.au/tax-rates-and-codes/schedule-15-tax-table-for-working-holiday-makers",
              },
            ]}
            related={[
              { label: "Backpacker tax refund guide", href: "/backpacker-tax-refund-australia/" },
              { label: "TFN guide for backpackers", href: "/tax-file-number-backpacker/" },
              { label: "Leaving Australia tax guide", href: "/tax-return-after-leaving-australia/" },
              { label: "Use the calculator", href: "/#calculator" },
            ]}
          />
        </article>
      </main>
      <Footer />
    </div>
  );
}
