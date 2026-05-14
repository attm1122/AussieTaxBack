import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdSlot from "@/components/ads/AdSlot";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Farm Work Tax Refund Australia",
  description:
    "Simple guide for farm workers and working holiday makers checking Australian tax refund estimates.",
  path: "/farm-work-tax-refund/",
});

export default function FarmWorkTaxRefundPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 py-12">
          <Link href="/#calculator" className="mb-5 inline-block text-sm font-medium text-emerald-700">
            Back to calculator
          </Link>
          <p className="text-sm font-semibold text-emerald-700">Farm work</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            Farm work tax refund Australia
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Farm workers often have simple wages but confusing work expenses.
            Use your myGov income statement first, then check the costs you paid
            yourself.
          </p>
          <AdSlot placement="article" className="mt-8" />

          <div className="mt-8 space-y-8 text-slate-700">
            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                Costs worth checking
              </h2>
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>Steel-cap boots and safety gear</li>
                <li>Sun protection if it is protective work gear</li>
                <li>Tools you needed for the job</li>
                <li>Work phone use</li>
                <li>Travel between different work sites</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                Be careful with accommodation and food
              </h2>
              <p className="mt-2">
                Normal rent, normal meals, and normal travel from where you live
                to work usually do not count. Only add costs you can clearly
                connect to work rules.
              </p>
            </section>
            <Link
              href="/#calculator"
              className="inline-flex rounded-md bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Estimate farm work tax
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
