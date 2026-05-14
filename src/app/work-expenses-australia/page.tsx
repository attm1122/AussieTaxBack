import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdSlot from "@/components/ads/AdSlot";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "What Work Expenses Can I Claim?",
  description:
    "Plain-English guide to common Australian work expenses for tax time.",
  path: "/work-expenses-australia/",
});

export default function WorkExpensesAustraliaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 py-12">
          <Link href="/" className="mb-5 inline-block text-sm font-medium text-emerald-700">
            Back to calculator
          </Link>
          <h1 className="text-3xl font-bold text-slate-950">
            What work expenses can I claim?
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            A simple rule: only include costs you paid yourself, used for work,
            and were not paid back for.
          </p>
          <AdSlot placement="article" className="mt-8" />

          <div className="mt-8 space-y-7 text-slate-700">
            <section>
              <h2 className="text-xl font-semibold text-slate-950">Usually worth checking</h2>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>Safety gear and protective clothing</li>
                <li>Tools and equipment used for work</li>
                <li>Phone and internet used for work</li>
                <li>Training connected to your current job</li>
                <li>Travel between job sites</li>
                <li>Union fees and work memberships</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-slate-950">Be careful with these</h2>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>Normal travel from home to work usually does not count.</li>
                <li>Everyday clothes usually do not count.</li>
                <li>Expensive tools may need to be claimed over time.</li>
                <li>Phone and internet should only include the work part.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-slate-950">Keep proof</h2>
              <p className="mt-2">
                Keep receipts, diary notes, screenshots, or a simple calculation
                showing how you worked out the work-use part.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
