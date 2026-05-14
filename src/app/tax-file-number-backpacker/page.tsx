import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdSlot from "@/components/ads/AdSlot";
import ArticleJsonLd from "@/components/content/ArticleJsonLd";
import GuideSupport from "@/components/content/GuideSupport";
import { pageMetadata } from "@/lib/seo";

const title = "Tax File Number Guide for Backpackers";
const description =
  "Simple TFN guide for backpackers and working holiday makers starting work in Australia.";

export const metadata = pageMetadata({
  title,
  description,
  path: "/tax-file-number-backpacker/",
});

export default function TaxFileNumberBackpackerPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 py-12">
          <ArticleJsonLd
            title={title}
            description={description}
            path="/tax-file-number-backpacker/"
          />
          <Link
            href="/#calculator"
            className="mb-5 inline-block text-sm font-medium text-emerald-700"
          >
            Back to calculator
          </Link>
          <p className="text-sm font-semibold text-emerald-700">
            Starting work
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            Tax file number guide for backpackers
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            A tax file number is one of the first things to sort out before you
            start work in Australia. It helps your employer take out the right
            amount of tax.
          </p>
          <AdSlot placement="article" className="mt-8" />

          <div className="mt-8 space-y-8 text-slate-700">
            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                What is a TFN?
              </h2>
              <p className="mt-2">
                A tax file number, often called a TFN, is your personal tax
                number in Australia. It is used for tax and superannuation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                Why backpackers need one
              </h2>
              <p className="mt-2">
                You can work without a TFN, but your employer may need to take
                more tax from your pay. If you plan to work in Australia, apply
                for a TFN as soon as you can.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                What to tell your employer
              </h2>
              <p className="mt-2">
                When you start a job, complete the TFN declaration and tell your
                employer if you are on a 417 or 462 working holiday visa. This
                helps them use the right withholding rules.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-950">
                If too much tax was taken out
              </h2>
              <p className="mt-2">
                If your employer took out more tax than needed, it may increase
                your refund when you lodge your tax return. Use the income and
                tax withheld numbers from myGov, not just one payslip.
              </p>
            </section>

            <Link
              href="/#calculator"
              className="inline-flex rounded-md bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Estimate your refund
            </Link>
          </div>

          <GuideSupport
            sources={[
              {
                label: "ATO: What is a tax file number?",
                href: "https://www.ato.gov.au/individuals-and-families/tax-file-number/what-is-a-tax-file-number",
              },
              {
                label: "ATO: Working holiday makers",
                href: "https://www.ato.gov.au/individuals/ind/resident-for-tax-if-whm-/",
              },
            ]}
            related={[
              { label: "Working holiday maker tax rates", href: "/working-holiday-maker-tax-rates/" },
              { label: "Backpacker tax refund guide", href: "/backpacker-tax-refund-australia/" },
              { label: "myGov income statement guide", href: "/mygov-income-statement/" },
              { label: "Use the calculator", href: "/#calculator" },
            ]}
          />
        </article>
      </main>
      <Footer />
    </div>
  );
}
