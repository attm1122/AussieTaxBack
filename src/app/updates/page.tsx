import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Tax Calculator Updates",
  description:
    "Update history for Aussie Tax Back tax rates, calculator rules and source checks.",
  path: "/updates/",
});

export default function UpdatesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <Link
            href="/"
            className="mb-5 inline-block text-sm font-medium text-emerald-700"
          >
            Back to calculator
          </Link>
          <h1 className="text-3xl font-bold text-slate-950">
            Tax calculator updates
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            This page shows when the calculator and guide pages were last
            checked. It helps keep the site transparent.
          </p>

          <div className="mt-8 space-y-6 text-slate-700">
            <section className="rounded-lg border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold text-emerald-700">
                15 May 2026
              </p>
              <h2 className="mt-2 text-xl font-semibold text-slate-950">
                Added more backpacker tax guides
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Added working holiday maker tax rates guide.</li>
                <li>Added tax file number guide for backpackers.</li>
                <li>Added tax return after leaving Australia guide.</li>
                <li>Checked key ATO source pages for these guides.</li>
              </ul>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-5">
              <p className="text-sm font-semibold text-emerald-700">
                14 May 2026
              </p>
              <h2 className="mt-2 text-xl font-semibold text-slate-950">
                Calculator accuracy update
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>Added 2024-25 and 2025-26 tax year support.</li>
                <li>Added working holiday maker tax treatment.</li>
                <li>Improved Medicare levy and study loan estimates.</li>
                <li>Added clearer estimate disclaimers and ATO source links.</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
