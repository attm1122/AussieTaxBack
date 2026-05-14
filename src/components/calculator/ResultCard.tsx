"use client";

import { CalculationResult } from "@/lib/tax/types";
import { formatCurrency } from "@/lib/tax/format";

interface ResultCardProps {
  result: CalculationResult;
}

export default function ResultCard({ result }: ResultCardProps) {
  return (
    <div
      className="bg-white border-2 border-green-500 rounded-lg p-5 md:p-6 shadow-md mb-6"
      aria-live="polite"
    >
      {/* Main result */}
      <div className="text-center mb-5">
        <p className="text-sm text-gray-600 mb-1">
          Based on what you entered, you may
          {result.isRefund ? " get a tax refund of:" : " need to pay:"}
        </p>
        <p
          className={`text-3xl md:text-4xl font-bold ${
            result.isRefund ? "text-green-600" : "text-red-600"
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
      <div className="border-t border-gray-200 pt-4 mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Breakdown
        </h3>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-600">Income before tax</dt>
            <dd className="font-medium text-gray-900">
              {formatCurrency(result.incomeBeforeTax)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600">Work expenses entered</dt>
            <dd className="font-medium text-gray-900">
              -{formatCurrency(result.totalWorkExpenses)}
            </dd>
          </div>
          <div className="flex justify-between border-t border-gray-100 pt-2">
            <dt className="text-gray-800 font-medium">
              Income after work expenses
            </dt>
            <dd className="font-semibold text-gray-900">
              {formatCurrency(result.incomeAfterWorkExpenses)}
            </dd>
          </div>
          <div className="flex justify-between pt-1">
            <dt className="text-gray-600">Estimated tax</dt>
            <dd className="font-medium text-gray-900">
              {formatCurrency(result.estimatedTax)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600">Medicare amount</dt>
            <dd className="font-medium text-gray-900">
              {formatCurrency(result.medicareAmount)}
            </dd>
          </div>
          {result.studentLoanRepayment > 0 && (
            <div className="flex justify-between">
              <dt className="text-gray-600">Student loan repayment</dt>
              <dd className="font-medium text-gray-900">
                {formatCurrency(result.studentLoanRepayment)}
              </dd>
            </div>
          )}
          <div className="flex justify-between border-t border-gray-100 pt-2">
            <dt className="text-gray-800 font-medium">Total estimated tax</dt>
            <dd className="font-semibold text-gray-900">
              {formatCurrency(result.totalTaxPayable)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600">Tax already taken from pay</dt>
            <dd className="font-medium text-gray-900">
              {formatCurrency(result.taxAlreadyTaken)}
            </dd>
          </div>
          <div
            className={`flex justify-between border-t-2 pt-2 ${
              result.isRefund
                ? "border-green-500 text-green-700"
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

      {/* Expense breakdown */}
      {result.totalWorkExpenses > 0 && (
        <div className="border-t border-gray-200 pt-4 mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Work expense breakdown
          </h3>
          <dl className="space-y-1.5 text-sm">
            {result.expenseBreakdown.workClothesPPEAndLaundry > 0 && (
              <div className="flex justify-between">
                <dt className="text-gray-600">Work clothes, PPE and laundry</dt>
                <dd className="font-medium text-gray-900">
                  {formatCurrency(result.expenseBreakdown.workClothesPPEAndLaundry)}
                </dd>
              </div>
            )}
            {result.expenseBreakdown.toolsAndEquipment > 0 && (
              <div className="flex justify-between">
                <dt className="text-gray-600">Tools and equipment</dt>
                <dd className="font-medium text-gray-900">
                  {formatCurrency(result.expenseBreakdown.toolsAndEquipment)}
                </dd>
              </div>
            )}
            {result.expenseBreakdown.phoneAndInternet > 0 && (
              <div className="flex justify-between">
                <dt className="text-gray-600">Phone and internet</dt>
                <dd className="font-medium text-gray-900">
                  {formatCurrency(result.expenseBreakdown.phoneAndInternet)}
                </dd>
              </div>
            )}
            {result.expenseBreakdown.trainingTicketsAndLicences > 0 && (
              <div className="flex justify-between">
                <dt className="text-gray-600">
                  Training, tickets and licences
                </dt>
                <dd className="font-medium text-gray-900">
                  {formatCurrency(result.expenseBreakdown.trainingTicketsAndLicences)}
                </dd>
              </div>
            )}
            {result.expenseBreakdown.workTravel > 0 && (
              <div className="flex justify-between">
                <dt className="text-gray-600">Work travel</dt>
                <dd className="font-medium text-gray-900">
                  {formatCurrency(result.expenseBreakdown.workTravel)}
                </dd>
              </div>
            )}
            {result.expenseBreakdown.subscriptionsMembershipsAndUnionFees > 0 && (
              <div className="flex justify-between">
                <dt className="text-gray-600">
                  Subscriptions, memberships and union fees
                </dt>
                <dd className="font-medium text-gray-900">
                  {formatCurrency(result.expenseBreakdown.subscriptionsMembershipsAndUnionFees)}
                </dd>
              </div>
            )}
            {result.expenseBreakdown.donations > 0 && (
              <div className="flex justify-between">
                <dt className="text-gray-600">Donations</dt>
                <dd className="font-medium text-gray-900">
                  {formatCurrency(result.expenseBreakdown.donations)}
                </dd>
              </div>
            )}
            {result.expenseBreakdown.taxAgentOrSoftware > 0 && (
              <div className="flex justify-between">
                <dt className="text-gray-600">Tax agent or tax software</dt>
                <dd className="font-medium text-gray-900">
                  {formatCurrency(result.expenseBreakdown.taxAgentOrSoftware)}
                </dd>
              </div>
            )}
            <div className="flex justify-between border-t border-gray-100 pt-2">
              <dt className="text-gray-800 font-medium">Total work expenses</dt>
              <dd className="font-semibold text-gray-900">
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
          final tax refund may be different depending on your full income,
          records, private health cover, student loan, offsets and ATO
          assessment.
        </p>
      </div>
    </div>
  );
}
