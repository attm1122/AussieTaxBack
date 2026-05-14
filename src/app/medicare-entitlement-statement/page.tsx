import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdSlot from "@/components/ads/AdSlot";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Medicare Entitlement Statement Guide",
  description:
    "Simple guide to Medicare Entitlement Statements for temporary visa holders doing an Australian tax return.",
  path: "/medicare-entitlement-statement/",
});

export default function MedicareEntitlementStatementPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 py-12">
          <Link href="/" className="mb-5 inline-block text-sm font-medium text-emerald-700">
            Back to calculator
          </Link>
          <h1 className="text-3xl font-bold text-slate-950">
            Medicare Entitlement Statement guide
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            If you were on a temporary visa and could not use Medicare, you may
            need this statement before you send your tax return.
          </p>
          <AdSlot placement="article" className="mt-8" />

          <div className="mt-8 space-y-7 text-slate-700">
            <section>
              <h2 className="text-xl font-semibold text-slate-950">What it means</h2>
              <p className="mt-2">
                The statement shows the dates when you were not entitled to
                Medicare. myTax can use those dates to reduce or remove the
                Medicare amount.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-slate-950">What to enter</h2>
              <p className="mt-2">
                If the statement covers the whole year, choose that you did not
                have to pay Medicare. If it only covers part of the year, enter
                the number of days shown on the statement.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-slate-950">Keep it simple</h2>
              <p className="mt-2">
                If you are not sure, leave the calculator as “not sure” and
                check the Medicare section carefully in myTax.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
