import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdSlot from "@/components/ads/AdSlot";
import ArticleJsonLd from "@/components/content/ArticleJsonLd";
import GuideSupport from "@/components/content/GuideSupport";
import { pageMetadata } from "@/lib/seo";

const title = "Tax Return After Leaving Australia";
const description =
  "Simple guide for backpackers and temporary visa holders lodging an Australian tax return after leaving Australia.";

export const metadata = pageMetadata({
  title,
  description,
  path: "/tax-return-after-leaving-australia/",
});

export default function TaxReturnAfterLeavingAustraliaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 py-12">
          <ArticleJsonLd
            title={title}
            description={description}
            path="/tax-return-after-leaving-australia/"
          />
          <Link
            href="/#calculator"
            className="mb-5 inline-block text-sm font-medium text-emerald-700"
          >
            Back to calculator
          </Link>
          <p className="text-sm font-semibold text-emerald-700">
            Leaving Australia
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            Tax return after leaving Australia
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            You may still need to lodge an Australian tax return after you leave
            Australia. This guide helps you understand what to check.
          </p>
          <AdSlot placement="article" className="mt-8" />

          <div className="mt-8 space-y-8 text-slate-700">
            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                Can you lodge from overseas?
              </h2>
              <p className="mt-2">
                Yes, many people can lodge online from overseas through myTax if
                they still have access to myGov and ATO online services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                Keep access before you leave
              </h2>
              <p className="mt-2">
                Before leaving Australia, check that you can sign in to myGov
                from overseas. Also keep your Australian bank details if you
                want any refund paid there.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                What numbers you need
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Total income from your income statement</li>
                <li>Total tax already taken out</li>
                <li>Work costs you paid yourself</li>
                <li>Bank interest or other Australian income</li>
                <li>Medicare details, if relevant to your visa</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                Estimate before lodging
              </h2>
              <p className="mt-2">
                Use the calculator to get a rough idea before you lodge. Your
                final result can still change when myTax pre-fills extra income,
                Medicare details, or other items.
              </p>
            </section>

            <Link
              href="/#calculator"
              className="inline-flex rounded-md bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Estimate your Australian tax
            </Link>
          </div>

          <GuideSupport
            sources={[
              {
                label: "ATO: Lodge your tax return from outside Australia",
                href: "https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-from-outside-australia",
              },
              {
                label: "ATO: Tax in Australia, what you need to know",
                href: "https://www.ato.gov.au/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/tax-in-australia-what-you-need-to-know",
              },
            ]}
            related={[
              { label: "Tax return checklist", href: "/tax-return-checklist/" },
              { label: "myGov income statement guide", href: "/mygov-income-statement/" },
              { label: "Temporary visa Medicare guide", href: "/temporary-visa-medicare-tax/" },
              { label: "Use the calculator", href: "/#calculator" },
            ]}
          />
        </article>
      </main>
      <Footer />
    </div>
  );
}
