import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdSlot from "@/components/ads/AdSlot";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Australian Tax Return Checklist",
  description:
    "Simple Australian tax return checklist for casual workers, backpackers and first-time lodgers.",
  path: "/tax-return-checklist/",
});

export default function TaxReturnChecklistPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-4 py-12">
          <Link href="/" className="mb-5 inline-block text-sm font-medium text-emerald-700">
            Back to calculator
          </Link>
          <h1 className="text-3xl font-bold text-slate-950">
            Simple tax return checklist
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Before you use myTax, gather these items. You do not need to upload
            them all, but you should keep them.
          </p>
          <AdSlot placement="article" className="mt-8" />

          <ul className="mt-8 space-y-3 text-slate-700">
            <li className="rounded-md bg-white p-4 shadow-sm">myGov income statement</li>
            <li className="rounded-md bg-white p-4 shadow-sm">Tax already taken out by employers</li>
            <li className="rounded-md bg-white p-4 shadow-sm">Receipts for work costs</li>
            <li className="rounded-md bg-white p-4 shadow-sm">Bank interest or other income</li>
            <li className="rounded-md bg-white p-4 shadow-sm">Study loan details, if you have one</li>
            <li className="rounded-md bg-white p-4 shadow-sm">Medicare Entitlement Statement, if needed</li>
            <li className="rounded-md bg-white p-4 shadow-sm">Private hospital cover details, if you had cover</li>
          </ul>
        </article>
      </main>
      <Footer />
    </div>
  );
}
