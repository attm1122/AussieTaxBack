import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdSlot from "@/components/ads/AdSlot";
import ArticleJsonLd from "@/components/content/ArticleJsonLd";
import GuideSupport from "@/components/content/GuideSupport";
import { pageMetadata } from "@/lib/seo";

const title = "Working Holiday Tax Refund Guide Australia";
const description =
  "Plain-English guide for working holiday makers estimating an Australian tax refund or tax bill.";

export const metadata = pageMetadata({
  title,
  description,
  path: "/working-holiday-tax/",
});

export default function WorkingHolidayTaxPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 py-12">
          <ArticleJsonLd
            title={title}
            description={description}
            path="/working-holiday-tax/"
          />
          <Link href="/" className="mb-5 inline-block text-sm font-medium text-emerald-700">
            Back to calculator
          </Link>
          <h1 className="text-3xl font-bold text-slate-950">
            Working holiday tax refund guide
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            If you were in Australia on a working holiday visa, your tax can be
            different from an Australian resident worker. This guide keeps the
            basics simple.
          </p>
          <AdSlot placement="article" className="mt-8" />

          <div className="mt-8 space-y-8 text-slate-700">
            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                1. Pick the working holiday option
              </h2>
              <p className="mt-2">
                In the calculator, choose “Working holiday maker visa”. Working
                holiday makers are usually taxed from the first dollar they earn.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                2. Use your myGov income numbers
              </h2>
              <p className="mt-2">
                Your income statement normally shows your total pay and the tax
                already taken out. Put those numbers into the calculator.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                3. Only add work costs you paid yourself
              </h2>
              <p className="mt-2">
                You may be able to include things like safety gear, work tools,
                phone use for work, training, or travel between job sites. Do
                not include normal travel from home to work.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                4. Check Medicare
              </h2>
              <p className="mt-2">
                Many temporary visa holders cannot use Medicare. If that was
                you, you may need a Medicare Entitlement Statement before you
                send your tax return.
              </p>
            </section>
          </div>

          <GuideSupport
            sources={[
              {
                label: "ATO: Working holiday makers",
                href: "https://www.ato.gov.au/individuals/ind/resident-for-tax-if-whm-/",
              },
              {
                label: "ATO: Australian residency if on a working holiday",
                href: "https://www.ato.gov.au/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/australian-residency-if-you-re-on-a-working-holiday-or-visit",
              },
            ]}
            related={[
              { label: "Working holiday maker tax rates", href: "/working-holiday-maker-tax-rates/" },
              { label: "Backpacker tax refund guide", href: "/backpacker-tax-refund-australia/" },
              { label: "TFN guide for backpackers", href: "/tax-file-number-backpacker/" },
              { label: "Use the calculator", href: "/#calculator" },
            ]}
          />
        </article>
      </main>
      <Footer />
    </div>
  );
}
