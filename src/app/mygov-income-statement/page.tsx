import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdSlot from "@/components/ads/AdSlot";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "How To Read Your myGov Income Statement",
  description:
    "Simple guide to the income and tax taken out numbers used in an Australian tax return estimate.",
  path: "/mygov-income-statement/",
});

export default function MyGovIncomeStatementPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 py-12">
          <Link href="/" className="mb-5 inline-block text-sm font-medium text-emerald-700">
            Back to calculator
          </Link>
          <h1 className="text-3xl font-bold text-slate-950">
            How to read your myGov income statement
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            For a quick estimate, you usually need two numbers: how much you
            earned, and how much tax was already taken out.
          </p>
          <AdSlot placement="article" className="mt-8" />

          <div className="mt-8 space-y-8 text-slate-700">
            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                Total income
              </h2>
              <p className="mt-2">
                This is your pay before tax. If you had more than one job, add
                the totals together.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                Tax already taken out
              </h2>
              <p className="mt-2">
                This is the tax your employer already sent to the ATO for you.
                It is sometimes shown as tax withheld.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                Work expenses
              </h2>
              <p className="mt-2">
                These are costs you paid yourself to do your job. Keep receipts
                or notes showing how you worked out the work part.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
