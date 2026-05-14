import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdSlot from "@/components/ads/AdSlot";
import ArticleJsonLd from "@/components/content/ArticleJsonLd";
import GuideSupport from "@/components/content/GuideSupport";
import { pageMetadata } from "@/lib/seo";

const title = "Casual Worker Tax Refund Calculator Australia";
const description =
  "Simple tax refund estimate and myTax checklist for casual workers in Australia.";

export const metadata = pageMetadata({
  title,
  description,
  path: "/casual-worker-tax-refund-calculator/",
});

export default function CasualWorkerTaxRefundCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 py-12">
          <ArticleJsonLd
            title={title}
            description={description}
            path="/casual-worker-tax-refund-calculator/"
          />
          <Link href="/#calculator" className="mb-5 inline-block text-sm font-medium text-emerald-700">
            Back to calculator
          </Link>
          <p className="text-sm font-semibold text-emerald-700">
            Casual workers
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            Casual worker tax refund calculator
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Casual workers can use the same basic tax return checks: income,
            tax taken out, Medicare, study loan, and work expenses.
          </p>
          <AdSlot placement="article" className="mt-8" />

          <div className="mt-8 space-y-8 text-slate-700">
            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                Add all casual jobs together
              </h2>
              <p className="mt-2">
                If you had more than one job, use the total income and total
                tax withheld from all income statements in myGov.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                Watch for under-withholding
              </h2>
              <p className="mt-2">
                If not enough tax was taken out during the year, you may have
                an amount to pay. The calculator helps you spot that early.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                Work costs must be work-related
              </h2>
              <p className="mt-2">
                Only include the work part of costs like phone, internet,
                equipment, training, safety gear, or union fees.
              </p>
            </section>
            <Link
              href="/#calculator"
              className="inline-flex rounded-md bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Estimate your casual worker tax
            </Link>
          </div>

          <GuideSupport
            sources={[
              {
                label: "ATO: Preparing your tax return",
                href: "https://www.ato.gov.au/individuals-and-families/your-tax-return/before-you-prepare-your-tax-return/preparing-your-tax-return",
              },
              {
                label: "ATO: Do you need to lodge a tax return?",
                href: "https://www.ato.gov.au/forms-and-instructions/individual-tax-return-2025-instructions/completing-the-individual-tax-return-2025/do-you-need-to-lodge-a-tax-return-2025",
              },
            ]}
            related={[
              { label: "What can I claim on tax?", href: "/what-can-i-claim-on-tax-australia/" },
              { label: "Work expenses guide", href: "/work-expenses-australia/" },
              { label: "Tax return checklist", href: "/tax-return-checklist/" },
              { label: "Use the calculator", href: "/#calculator" },
            ]}
          />
        </article>
      </main>
      <Footer />
    </div>
  );
}
