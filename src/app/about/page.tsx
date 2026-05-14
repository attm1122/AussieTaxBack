import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Aussie Tax Back",
  description:
    "About Aussie Tax Back, a plain-English Australian tax estimate tool.",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <Link href="/" className="mb-5 inline-block text-sm font-medium text-emerald-700">
            Back to calculator
          </Link>
          <h1 className="text-3xl font-bold text-slate-950">About Aussie Tax Back</h1>
          <div className="mt-6 space-y-5 text-slate-700">
            <p>
              Aussie Tax Back is a simple tax estimate tool for people who want
              a plain-English starting point before they use myTax.
            </p>
            <p>
              It is made for everyday workers, casual staff, working holiday
              makers, FIFO workers, and people lodging in Australia for the
              first time.
            </p>
            <p>
              The calculator is independent. It is not run by the Australian
              Taxation Office and it does not replace a registered tax agent.
            </p>
            <p>
              Tax rates and rules are reviewed against public ATO guidance. The
              current calculator supports the 2024-25 and 2025-26 financial years.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
