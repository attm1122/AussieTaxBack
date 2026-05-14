import Link from "next/link";

type Source = {
  label: string;
  href: string;
};

type Related = {
  label: string;
  href: string;
};

type GuideSupportProps = {
  sources: Source[];
  related?: Related[];
};

const defaultRelated: Related[] = [
  { label: "Working holiday guide", href: "/working-holiday-tax/" },
  { label: "Backpacker tax refund guide", href: "/backpacker-tax-refund-australia/" },
  { label: "Tax return checklist", href: "/tax-return-checklist/" },
  { label: "Use the calculator", href: "/#calculator" },
];

export default function GuideSupport({
  sources,
  related = defaultRelated,
}: GuideSupportProps) {
  return (
    <div className="mt-10 space-y-6">
      <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950">
        <h2 className="font-semibold">Last checked: 15 May 2026</h2>
        <p className="mt-1">
          This page is a plain-English guide. It uses public ATO information,
          but it is not tax advice and it is not an ATO service.
        </p>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4">
        <h2 className="text-base font-semibold text-slate-950">
          Official sources
        </h2>
        <ul className="mt-3 space-y-2 text-sm">
          {sources.map((source) => (
            <li key={source.href}>
              <a
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:underline"
              >
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <h2 className="text-base font-semibold text-slate-950">
          Related simple guides
        </h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {related.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md bg-white p-3 text-sm font-medium text-slate-700 shadow-sm hover:text-emerald-700"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
