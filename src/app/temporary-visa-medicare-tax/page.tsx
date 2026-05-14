import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdSlot from "@/components/ads/AdSlot";

export const metadata = {
  title: "Temporary Visa Medicare Tax Guide | Aussie Tax Back",
  description:
    "Plain-English guide to Medicare questions for temporary visa holders lodging an Australian tax return.",
};

export default function TemporaryVisaMedicareTaxPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 py-12">
          <Link href="/#calculator" className="mb-5 inline-block text-sm font-medium text-emerald-700">
            Back to calculator
          </Link>
          <p className="text-sm font-semibold text-emerald-700">
            Temporary visa Medicare
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            Medicare and tax for temporary visa holders
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Medicare can change your tax estimate. Many temporary visa holders
            cannot use Medicare, but myTax may still ask Medicare questions.
          </p>
          <AdSlot placement="article" className="mt-8" />

          <div className="mt-8 space-y-8 text-slate-700">
            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                Check if you need a Medicare Entitlement Statement
              </h2>
              <p className="mt-2">
                If you were not eligible for Medicare, you may need a Medicare
                Entitlement Statement before lodging. The statement can show the
                days you were not covered.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                Enter days carefully
              </h2>
              <p className="mt-2">
                If the statement gives a number of days, enter that number in
                the calculator. If you are not sure, leave it as zero and check
                myTax carefully.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                Working holiday makers
              </h2>
              <p className="mt-2">
                Working holiday maker estimates in this tool normally show no
                Medicare amount. Still check the Medicare section in myTax before
                you lodge.
              </p>
            </section>
            <Link
              href="/medicare-entitlement-statement/"
              className="inline-flex rounded-md bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Read the Medicare statement guide
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
