import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdSlot from "@/components/ads/AdSlot";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Backpacker Tax Refund Australia",
  description:
    "Simple backpacker tax refund guide for people who worked in Australia on a working holiday visa.",
  path: "/backpacker-tax-refund-australia/",
});

export default function BackpackerTaxRefundAustraliaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 py-12">
          <Link href="/#calculator" className="mb-5 inline-block text-sm font-medium text-emerald-700">
            Back to calculator
          </Link>
          <p className="text-sm font-semibold text-emerald-700">
            Backpacker tax
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            Backpacker tax refund Australia
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            If you worked in Australia as a backpacker, your refund depends on
            your visa, income, tax taken out, and work costs you paid yourself.
          </p>
          <AdSlot placement="article" className="mt-8" />

          <div className="mt-8 space-y-8 text-slate-700">
            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                Start with your income statement
              </h2>
              <p className="mt-2">
                Log in to myGov and find your income statement. Use total pay
                and tax withheld. Do not guess from memory if myGov has the
                final numbers.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                Choose working holiday maker
              </h2>
              <p className="mt-2">
                Many backpackers are taxed under working holiday maker rates.
                That normally means tax starts from the first dollar earned.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                Common costs to check
              </h2>
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>Safety boots, high-vis gear and protective equipment</li>
                <li>Tools needed for the job</li>
                <li>Work phone use</li>
                <li>Training or licences connected to your current work</li>
              </ul>
            </section>
            <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
              <h2 className="font-semibold text-emerald-950">
                Estimate it now
              </h2>
              <p className="mt-2 text-sm text-emerald-900">
                Use the calculator to get a simple estimate, then compare the
                guide with myTax before lodging.
              </p>
              <Link
                href="/#calculator"
                className="mt-4 inline-flex rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Open calculator
              </Link>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
