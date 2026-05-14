import Link from "next/link";
import AdSlot from "@/components/ads/AdSlot";

const guideLinks = [
  { href: "/working-holiday-tax/", label: "Working holiday tax" },
  { href: "/working-holiday-maker-tax-rates/", label: "WHM tax rates" },
  { href: "/backpacker-tax-refund-australia/", label: "Backpacker tax refund" },
  { href: "/tax-file-number-backpacker/", label: "Backpacker TFN" },
  { href: "/tax-return-after-leaving-australia/", label: "Tax after leaving" },
  { href: "/casual-worker-tax-refund-calculator/", label: "Casual worker tax" },
  { href: "/farm-work-tax-refund/", label: "Farm work tax" },
  { href: "/mygov-income-statement/", label: "myGov income statement" },
  { href: "/medicare-entitlement-statement/", label: "Medicare statement" },
  { href: "/temporary-visa-medicare-tax/", label: "Temporary visa Medicare" },
  { href: "/work-expenses-australia/", label: "Work expenses" },
  { href: "/what-can-i-claim-on-tax-australia/", label: "What can I claim?" },
  { href: "/tax-return-checklist/", label: "Tax return checklist" },
] as const;

const siteLinks = [
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
  { href: "/privacy/", label: "Privacy" },
  { href: "/disclaimer/", label: "Disclaimer" },
  { href: "/updates/", label: "Updates" },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <AdSlot placement="footer" className="mb-6" />
        <div className="mb-6 grid gap-6 text-sm sm:grid-cols-[2fr_1fr]">
          <nav aria-label="Tax guides">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Tax guides
            </h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {guideLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-slate-700 hover:text-emerald-700"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          <nav aria-label="Site links">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Site
            </h2>
            <div className="grid gap-2">
              {siteLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-slate-700 hover:text-emerald-700"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
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
