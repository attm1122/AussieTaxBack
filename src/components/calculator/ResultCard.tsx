"use client";

import { CalculationResult } from "@/lib/tax/types";
import { formatCurrency } from "@/lib/tax/format";

interface ResultCardProps {
  result: CalculationResult;
}

export default function ResultCard({ result }: ResultCardProps) {
  const confidenceText =
    result.confidence.level === "high"
      ? "This is a good estimate for a simple wage situation."
      : result.confidence.level === "medium"
      ? "This is useful, but check the items listed below in myTax."
      : "Use this as a rough guide. Your final myTax result may move more.";

  return (
    <div
      className="rounded-lg border border-emerald-200 bg-white p-5 shadow-lg shadow-emerald-950/5 md:p-6"
      aria-live="polite"
    >
      {/* Main result */}
      <div className="text-center mb-5">
        <p className="text-sm text-slate-600 mb-1">
          Based on what you entered, you may
          {result.isRefund ? " get a tax refund of:" : " need to pay:"}
        </p>
        <p
          className={`text-3xl md:text-4xl font-bold ${
            result.isRefund ? "text-emerald-600" : "text-red-600"
          }`}
        >
          {result.isRefund ? "+" : ""}
          {formatCurrency(result.estimatedRefundOrPayable)}
        </p>
        {!result.isRefund && result.estimatedRefundOrPayable < 0 && (
          <p className="text-lg text-red-600 font-medium mt-1">
            {formatCurrency(Math.abs(result.estimatedRefundOrPayable))} payable
          </p>
        )}
      </div>

      {/* Main breakdown */}
      <div className="border-t border-slate-200 pt-4 mb-4">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">
          Breakdown
        </h3>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-slate-600">Income before tax</dt>
            <dd className="font-medium text-slate-950">
              {formatCurrency(result.incomeBeforeTax)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-600">Work expenses</dt>
            <dd className="font-medium text-slate-950">
              -{formatCurrency(result.totalWorkExpenses)}
            </dd>
          </div>
          <div className="flex justify-between border-t border-slate-100 pt-2">
            <dt className="text-slate-800 font-medium">
              Income after expenses
            </dt>
            <dd className="font-semibold text-slate-950">
              {formatCurrency(result.incomeAfterWorkExpenses)}
            </dd>
          </div>
          <div className="flex justify-between pt-1">
            <dt className="text-slate-600">Estimated tax</dt>
            <dd className="font-medium text-slate-950">
              {formatCurrency(result.estimatedTax)}
            </dd>
          </div>
          {result.lowIncomeTaxOffset > 0 && (
            <div className="flex justify-between">
              <dt className="text-slate-600">Low income tax offset</dt>
              <dd className="font-medium text-emerald-700">
                -{formatCurrency(result.lowIncomeTaxOffset)}
              </dd>
            </div>
          )}
          {result.lowIncomeTaxOffset > 0 && (
            <div className="flex justify-between border-t border-slate-100 pt-2">
              <dt className="text-slate-800 font-medium">Tax after offset</dt>
              <dd className="font-semibold text-slate-950">
                {formatCurrency(result.taxAfterOffsets)}
              </dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt className="text-slate-600">Medicare</dt>
            <dd className="font-medium text-slate-950">
              {formatCurrency(result.medicareAmount)}
            </dd>
          </div>
          {result.medicareSurchargeAmount > 0 && (
            <div className="flex justify-between">
              <dt className="text-slate-600">Extra Medicare charge</dt>
              <dd className="font-medium text-slate-950">
                {formatCurrency(result.medicareSurchargeAmount)}
              </dd>
            </div>
          )}
          {result.medicareSurchargeAmount > 0 && (
            <div className="flex justify-between text-xs">
              <dt className="text-slate-500">Medicare check income</dt>
              <dd className="font-medium text-slate-700">
                {formatCurrency(result.medicareSurchargeIncome)}
              </dd>
            </div>
          )}
          {result.studentLoanRepayment > 0 && (
            <div className="flex justify-between">
              <dt className="text-slate-600">Study loan repayment</dt>
              <dd className="font-medium text-slate-950">
                {formatCurrency(result.studentLoanRepayment)}
              </dd>
            </div>
          )}
          {result.studentLoanRepayment > 0 && (
            <div className="flex justify-between text-xs">
              <dt className="text-slate-500">Study loan check income</dt>
              <dd className="font-medium text-slate-700">
                {formatCurrency(result.studyLoanRepaymentIncome)}
              </dd>
            </div>
          )}
          <div className="flex justify-between border-t border-slate-100 pt-2">
            <dt className="text-slate-800 font-medium">Total tax estimate</dt>
            <dd className="font-semibold text-slate-950">
              {formatCurrency(result.totalTaxPayable)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-600">Tax already taken out</dt>
            <dd className="font-medium text-slate-950">
              {formatCurrency(result.taxAlreadyTaken)}
            </dd>
          </div>
          <div
            className={`flex justify-between border-t-2 pt-2 ${
              result.isRefund
                ? "border-emerald-500 text-emerald-700"
                : "border-red-500 text-red-700"
            }`}
          >
            <dt className="font-semibold">
              {result.isRefund ? "Estimated refund" : "Amount to pay"}
            </dt>
            <dd className="font-bold text-lg">
              {result.isRefund
                ? `+${formatCurrency(result.estimatedRefundOrPayable)}`
                : formatCurrency(result.estimatedRefundOrPayable)}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mb-4 rounded-md border border-slate-200 bg-slate-50 p-3 text-sm">
        <p className="font-medium text-slate-950">
          Estimate confidence:{" "}
          <span
            className={
              result.confidence.level === "high"
                ? "text-emerald-700"
                : result.confidence.level === "medium"
                ? "text-amber-700"
                : "text-red-700"
            }
          >
            {result.confidence.level === "high"
              ? "High"
              : result.confidence.level === "medium"
              ? "Medium"
              : "Lower"}
          </span>
        </p>
        <p className="mt-1 text-xs text-slate-600">{confidenceText}</p>
        <ul className="mt-2 space-y-1 text-xs text-slate-600">
          {result.confidence.reasons.map((reason) => (
            <li key={reason}>- {reason}</li>
          ))}
        </ul>
      </div>

      {/* Expense breakdown */}
      {result.totalWorkExpenses > 0 && (
        <div className="border-t border-slate-200 pt-4 mb-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">
            Work expense breakdown
          </h3>
          <dl className="space-y-1.5 text-sm">
            {result.expenseBreakdown.workClothesPPEAndLaundry > 0 && (
              <div className="flex justify-between">
                <dt className="text-slate-600">Work clothes, PPE and laundry</dt>
                <dd className="font-medium text-slate-950">
                  {formatCurrency(result.expenseBreakdown.workClothesPPEAndLaundry)}
                </dd>
              </div>
            )}
            {result.expenseBreakdown.toolsAndEquipment > 0 && (
              <div className="flex justify-between">
                <dt className="text-slate-600">Tools and equipment</dt>
                <dd className="font-medium text-slate-950">
                  {formatCurrency(result.expenseBreakdown.toolsAndEquipment)}
                </dd>
              </div>
            )}
            {result.expenseBreakdown.phoneAndInternet > 0 && (
              <div className="flex justify-between">
                <dt className="text-slate-600">Phone and internet</dt>
                <dd className="font-medium text-slate-950">
                  {formatCurrency(result.expenseBreakdown.phoneAndInternet)}
                </dd>
              </div>
            )}
            {result.expenseBreakdown.trainingTicketsAndLicences > 0 && (
              <div className="flex justify-between">
                <dt className="text-slate-600">
                  Training, tickets and licences
                </dt>
                <dd className="font-medium text-slate-950">
                  {formatCurrency(result.expenseBreakdown.trainingTicketsAndLicences)}
                </dd>
              </div>
            )}
            {result.expenseBreakdown.workTravel > 0 && (
              <div className="flex justify-between">
                <dt className="text-slate-600">Work travel</dt>
                <dd className="font-medium text-slate-950">
                  {formatCurrency(result.expenseBreakdown.workTravel)}
                </dd>
              </div>
            )}
            {result.expenseBreakdown.subscriptionsMembershipsAndUnionFees > 0 && (
              <div className="flex justify-between">
                <dt className="text-slate-600">
                  Subscriptions, memberships and union fees
                </dt>
                <dd className="font-medium text-slate-950">
                  {formatCurrency(result.expenseBreakdown.subscriptionsMembershipsAndUnionFees)}
                </dd>
              </div>
            )}
            {result.expenseBreakdown.donations > 0 && (
              <div className="flex justify-between">
                <dt className="text-slate-600">Donations</dt>
                <dd className="font-medium text-slate-950">
                  {formatCurrency(result.expenseBreakdown.donations)}
                </dd>
              </div>
            )}
            {result.expenseBreakdown.taxAgentOrSoftware > 0 && (
              <div className="flex justify-between">
                <dt className="text-slate-600">Tax agent or tax software</dt>
                <dd className="font-medium text-slate-950">
                  {formatCurrency(result.expenseBreakdown.taxAgentOrSoftware)}
                </dd>
              </div>
            )}
            <div className="flex justify-between border-t border-slate-100 pt-2">
              <dt className="text-slate-800 font-medium">Total work expenses</dt>
              <dd className="font-semibold text-slate-950">
                {formatCurrency(result.expenseBreakdown.total)}
              </dd>
            </div>
          </dl>
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-xs text-amber-800">
        <p className="font-medium mb-1">This is only an estimate.</p>
        <p>
          It is not tax advice and it is not an official ATO calculator. Your
          real refund may be different if the ATO has extra income, Medicare,
          study loan, or other details for you.
        </p>
        <p className="mt-2">
          It uses the details you enter here. It does not cover every special
          rule, such as seniors offsets, every Medicare exemption, trust income,
          capital gains, or private health rebate adjustments.
        </p>
      </div>
    </div>
  );
}
