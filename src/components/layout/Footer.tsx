import Link from "next/link";
import AdSlot from "@/components/ads/AdSlot";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <AdSlot placement="footer" className="mb-6" />
        <div className="mb-5 flex flex-wrap gap-4 text-sm">
          <Link href="/about/" className="text-slate-700 hover:text-emerald-700">
            About
          </Link>
          <Link href="/contact/" className="text-slate-700 hover:text-emerald-700">
            Contact
          </Link>
          <Link href="/tax-return-checklist/" className="text-slate-700 hover:text-emerald-700">
            Checklist
          </Link>
          <Link href="/what-can-i-claim-on-tax-australia/" className="text-slate-700 hover:text-emerald-700">
            Claims
          </Link>
          <Link href="/backpacker-tax-refund-australia/" className="text-slate-700 hover:text-emerald-700">
            Backpackers
          </Link>
          <Link href="/privacy/" className="text-slate-700 hover:text-emerald-700">
            Privacy
          </Link>
          <Link href="/disclaimer/" className="text-slate-700 hover:text-emerald-700">
            Disclaimer
          </Link>
        </div>
        <p className="text-xs text-slate-500 mb-3">
          This website is independent and is not affiliated with the Australian Taxation Office.
        </p>
        <p className="max-w-3xl text-xs leading-5 text-slate-500">
          This is only an estimate. It is not tax advice and it is not an official ATO calculator. Your real refund may be different if the ATO has extra income, Medicare, study loan, or other details for you.
        </p>
      </div>
    </footer>
  );
}
