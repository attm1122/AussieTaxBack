import Link from "next/link";

const situations = [
  {
    title: "Working holiday visa",
    story:
      "You worked farm, hospo, cleaning or warehouse jobs while travelling around Australia.",
    check: "Choose working holiday maker visa and add the total income from all jobs.",
    note: "Your tax usually starts from the first dollar, so your refund may be smaller than a resident worker's.",
  },
  {
    title: "Casual job, too much tax taken",
    story:
      "You had one casual job and your payslips show a lot of tax taken out each week.",
    check: "Add your total income and the tax already taken out from your myGov income statement.",
    note: "This is a common refund situation, especially if you only worked part of the year.",
  },
  {
    title: "Two jobs at the same time",
    story:
      "You worked two jobs, or changed jobs, and are not sure if the tax-free threshold was used correctly.",
    check: "Add income and tax from every employer, not just your main job.",
    note: "You might get a refund, but you can also owe money if too little tax was taken out.",
  },
  {
    title: "No Medicare cover",
    story:
      "You were on a temporary visa and could not use Medicare for some or all of the year.",
    check:
      "Check if you need a Medicare Entitlement Statement, then add the number of days not covered.",
    note: "This can lower the Medicare part of the estimate, but only if the ATO accepts the exemption.",
  },
  {
    title: "Real work costs",
    story:
      "You bought safety boots, tools, uniforms, licences, or used your phone for work.",
    check:
      "Add only costs you paid yourself, keep receipts, and remove anything your employer paid back.",
    note: "Work costs can help, but they only reduce taxable income. They are not refunded dollar for dollar.",
  },
  {
    title: "Study loan or HECS debt",
    story:
      "You have a HELP, HECS or study loan and your income is above the repayment level.",
    check:
      "Turn on the study loan option and include any extra income items shown in myGov.",
    note: "Study loan repayments can reduce your refund or turn a refund into an amount to pay.",
  },
];

export default function ExampleCalculations() {
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-emerald-700">
            Common situations
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Which one sounds like you?
          </h2>
          <p className="mt-3 text-slate-600">
            Use these examples to choose the right options in the calculator and
            know what to check in myGov.
          </p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {situations.map((situation) => (
            <article
              key={situation.title}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
            >
              <h3 className="font-semibold text-slate-950">
                {situation.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {situation.story}
              </p>
              <div className="mt-4 space-y-3 border-t border-slate-100 pt-3 text-sm">
                <p>
                  <span className="font-medium text-slate-950">Check: </span>
                  <span className="text-slate-600">{situation.check}</span>
                </p>
                <p>
                  <span className="font-medium text-slate-950">Why it matters: </span>
                  <span className="text-slate-600">{situation.note}</span>
                </p>
              </div>
            </article>
          ))}
        </div>
        <Link
          href="/#calculator"
          className="mt-6 inline-flex rounded-md bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          Try your own numbers
        </Link>
      </div>
    </section>
  );
}
