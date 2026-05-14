export default function AssumptionsSourcesPanel() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm md:p-5">
      <h3 className="text-base font-semibold text-slate-950">
        Assumptions and sources
      </h3>
      <div className="mt-3 grid gap-4 md:grid-cols-2">
        <div>
          <h4 className="font-medium text-slate-950">This estimate includes</h4>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>Resident, foreign resident and working holiday maker rates</li>
            <li>Low income tax offset for Australian residents</li>
            <li>Medicare levy and surcharge thresholds</li>
            <li>Study loan repayment thresholds</li>
            <li>88 cents per km car method, capped at 5,000 km</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-slate-950">This estimate may miss</h4>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            <li>Special Medicare cases not shown in the form</li>
            <li>Private health insurance rebate</li>
            <li>Business income, capital gains and trust income</li>
            <li>Offsets other than the low income tax offset</li>
          </ul>
        </div>
      </div>
      <div className="mt-4 rounded-md bg-slate-50 p-3 text-xs text-slate-600">
        <p className="font-medium text-slate-800">Sources last checked: 14 May 2026</p>
        <p className="mt-1">
          Based on public ATO pages for individual tax rates, working holiday
          maker rates, Medicare levy and surcharge, study loan repayments, and
          work-related car expenses.
        </p>
      </div>
    </section>
  );
}
