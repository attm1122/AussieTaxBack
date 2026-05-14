import Link from "next/link";
import { calculateResult } from "@/lib/tax/calculate-tax";
import type { CalculatorInput } from "@/lib/tax/types";
import { formatCurrency } from "@/lib/tax/format";

const baseInput: CalculatorInput = {
  financialYear: "2025-26",
  taxResidency: "resident",
  incomeBeforeTax: 0,
  taxPaid: 0,
  reportableFringeBenefits: 0,
  reportableSuperContributions: 0,
  netInvestmentLoss: 0,
  exemptForeignEmploymentIncome: 0,
  hasSpouseOrDependants: false,
  spouseIncome: 0,
  dependentChildren: 0,
  medicareExemptionDays: 0,
  workerType: "casual",
  knowsTotalExpenses: true,
  totalExpensesAmount: 0,
  expenses: {
    workClothesAmount: 0,
    workClothesEmployerPaid: 0,
    laundryDryCleaningAmount: 0,
    toolsAmount: 0,
    toolsWorkPercentage: 100,
    toolsEmployerPaid: 0,
    phoneYearlyCost: 0,
    phoneWorkPercentage: 0,
    internetYearlyCost: 0,
    internetWorkPercentage: 0,
    trainingCost: 0,
    trainingBooksMaterials: 0,
    trainingTravel: 0,
    trainingEmployerPaid: 0,
    carKilometres: 0,
    otherTravelCosts: 0,
    accommodation: 0,
    mealsWhileAway: 0,
    travelEmployerPaid: 0,
    subscriptionsAmount: 0,
    subscriptionsWorkPercentage: 100,
    donationsAmount: 0,
    donationsHaveReceipts: false,
    taxAgentCost: 0,
  },
  hasStudentLoan: false,
  hasPrivateHospitalCover: false,
  medicareExempt: null,
};

const examples = [
  {
    title: "Working holiday maker",
    note: "Earned $45,000, tax taken out $6,750, no work expenses.",
    input: {
      ...baseInput,
      taxResidency: "working-holiday-maker",
      incomeBeforeTax: 45000,
      taxPaid: 6750,
      workerType: "casual",
    },
  },
  {
    title: "Casual worker",
    note: "Earned $50,000, tax taken out $9,000, no work expenses.",
    input: {
      ...baseInput,
      incomeBeforeTax: 50000,
      taxPaid: 9000,
      workerType: "casual",
      medicareExempt: false,
    },
  },
  {
    title: "Farm worker with expenses",
    note: "Earned $38,000, tax taken out $6,500, claimed $1,200 work costs.",
    input: {
      ...baseInput,
      taxResidency: "working-holiday-maker",
      incomeBeforeTax: 38000,
      taxPaid: 6500,
      workerType: "casual",
      totalExpensesAmount: 1200,
    },
  },
  {
    title: "Employee with study loan",
    note: "Earned $80,000, tax taken out $19,000, has a HELP or HECS debt.",
    input: {
      ...baseInput,
      incomeBeforeTax: 80000,
      taxPaid: 19000,
      workerType: "full-time",
      medicareExempt: false,
      hasStudentLoan: true,
    },
  },
] satisfies Array<{ title: string; note: string; input: CalculatorInput }>;

export default function ExampleCalculations() {
  return (
    <section className="border-t border-slate-200 bg-slate-50 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-emerald-700">
            Example calculations
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            See how different tax situations can change the result
          </h2>
          <p className="mt-3 text-slate-600">
            These are simple examples only. Use your own myGov income statement
            for your real estimate.
          </p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {examples.map((example) => {
            const result = calculateResult(example.input);
            return (
              <article
                key={example.title}
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
              >
                <h3 className="font-semibold text-slate-950">
                  {example.title}
                </h3>
                <p className="mt-2 min-h-16 text-sm leading-6 text-slate-600">
                  {example.note}
                </p>
                <dl className="mt-4 space-y-2 border-t border-slate-100 pt-3 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-600">
                      {result.isRefund ? "Refund estimate" : "Amount to pay"}
                    </dt>
                    <dd className="font-semibold text-emerald-700">
                      {formatCurrency(Math.abs(result.estimatedRefundOrPayable))}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-600">Total tax estimate</dt>
                    <dd className="font-medium text-slate-950">
                      {formatCurrency(result.totalTaxPayable)}
                    </dd>
                  </div>
                </dl>
              </article>
            );
          })}
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
