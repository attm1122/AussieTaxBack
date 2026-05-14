"use client";

import { CalculationResult } from "@/lib/tax/types";
import { formatCurrency } from "@/lib/tax/format";

interface AtoLodgementGuideProps {
  result: CalculationResult;
}

const residencyLabels = {
  resident: "Lives in Australia and pays tax here",
  "working-holiday-maker": "Working holiday maker",
  "foreign-resident": "Overseas or not an Australian tax resident",
};

export default function AtoLodgementGuide({ result }: AtoLodgementGuideProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:p-5">
      <h3 className="text-base font-semibold text-slate-950 mb-3">
        Guide for myTax
      </h3>

      <div className="space-y-4 text-sm text-slate-700">
        <section>
          <h4 className="font-medium text-slate-950 mb-2">Numbers to check</h4>
          <dl className="space-y-1.5">
            <div className="flex justify-between gap-4">
              <dt>Financial year</dt>
              <dd className="font-medium text-slate-950">{result.financialYear}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Your status</dt>
              <dd className="font-medium text-slate-950 text-right">
                {residencyLabels[result.taxResidency]}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Total income</dt>
              <dd className="font-medium text-slate-950">
                {formatCurrency(result.incomeBeforeTax)}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Tax already taken out</dt>
              <dd className="font-medium text-slate-950">
                {formatCurrency(result.taxAlreadyTaken)}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Work expenses</dt>
              <dd className="font-medium text-slate-950">
                {formatCurrency(result.totalWorkExpenses)}
              </dd>
            </div>
            {result.studentLoanRepayment > 0 && (
              <div className="flex justify-between gap-4">
                <dt>Study loan check income</dt>
                <dd className="font-medium text-slate-950">
                  {formatCurrency(result.studyLoanRepaymentIncome)}
                </dd>
              </div>
            )}
          </dl>
        </section>

        <section>
          <h4 className="font-medium text-slate-950 mb-2">
            Simple myTax flow
          </h4>
          <ol className="space-y-2">
            <li className="rounded-md bg-slate-50 p-3">
              <span className="font-medium text-slate-950">1. Open myTax.</span>{" "}
              Choose the same financial year shown above.
            </li>
            <li className="rounded-md bg-slate-50 p-3">
              <span className="font-medium text-slate-950">
                2. Check income.
              </span>{" "}
              Compare myTax income and tax taken out with the numbers here.
            </li>
            <li className="rounded-md bg-slate-50 p-3">
              <span className="font-medium text-slate-950">
                3. Add work expenses.
              </span>{" "}
              Only add costs you paid yourself and can explain.
            </li>
            <li className="rounded-md bg-slate-50 p-3">
              <span className="font-medium text-slate-950">
                4. Check Medicare and study loan.
              </span>{" "}
              These are common reasons your final result changes.
            </li>
            <li className="rounded-md bg-slate-50 p-3">
              <span className="font-medium text-slate-950">
                5. Compare the final number.
              </span>{" "}
              myTax is the final source. This tool helps you spot mistakes.
            </li>
          </ol>
        </section>

        {result.totalWorkExpenses > 0 && (
          <section>
            <h4 className="font-medium text-slate-950 mb-2">
              Work expense areas to check
            </h4>
            <ul className="space-y-1 list-disc list-inside">
              {result.expenseBreakdown.workClothesPPEAndLaundry > 0 && (
                <li>Work clothes, laundry and cleaning</li>
              )}
              {result.expenseBreakdown.toolsAndEquipment > 0 && (
                <li>Tools and work equipment</li>
              )}
              {result.expenseBreakdown.phoneAndInternet > 0 && (
                <li>Phone and internet used for work</li>
              )}
              {result.expenseBreakdown.trainingTicketsAndLicences > 0 && (
                <li>Training, tickets or licences</li>
              )}
              {result.expenseBreakdown.workTravel > 0 && (
                <li>Car and travel for work</li>
              )}
              {result.expenseBreakdown.subscriptionsMembershipsAndUnionFees > 0 && (
                <li>Union fees and memberships</li>
              )}
              {result.expenseBreakdown.donations > 0 && (
                <li>Gifts or donations</li>
              )}
              {result.expenseBreakdown.taxAgentOrSoftware > 0 && (
                <li>Tax agent or tax software</li>
              )}
            </ul>
          </section>
        )}

        <section>
          <h4 className="font-medium text-slate-950 mb-2">
            Before you lodge
          </h4>
          <ul className="space-y-1 list-disc list-inside">
            <li>Check your income and tax taken out against myGov.</li>
            <li>Only claim things you paid for yourself.</li>
            <li>Do not claim anything your employer paid back.</li>
            <li>Keep receipts or notes showing how you worked it out.</li>
            <li>If you were on a temporary visa, check the Medicare questions.</li>
            <li>Check spouse, children, offsets and private health insurance in myTax.</li>
          </ul>
        </section>

        <section className="rounded-md border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
          <h4 className="font-semibold">What this estimate does not fully cover</h4>
          <p className="mt-1">
            It covers common wage, expense, Medicare, spouse, child and study
            loan checks. It does not cover every special rule, such as seniors
            offsets, private health rebate changes, trust income, capital gains,
            or business income. myTax may still change the final result.
          </p>
        </section>
      </div>
    </div>
  );
}
