"use client";

import { useState } from "react";
import { CalculationResult } from "@/lib/tax/types";
import { formatCurrency } from "@/lib/tax/format";

interface SaveCalculationActionsProps {
  result: CalculationResult;
}

function getPlainTextSummary(result: CalculationResult): string {
  const lines = [
    "Australian Tax Refund Calculator - Estimate Summary",
    "================================================",
    "",
    result.isRefund
      ? `Estimated refund: ${formatCurrency(result.estimatedRefundOrPayable)}`
      : `Amount to pay: ${formatCurrency(Math.abs(result.estimatedRefundOrPayable))}`,
    "",
    "Breakdown:",
    `  Income before tax:           ${formatCurrency(result.incomeBeforeTax)}`,
    `  Work expenses:               ${formatCurrency(result.totalWorkExpenses)}`,
    `  Income after expenses:       ${formatCurrency(result.incomeAfterWorkExpenses)}`,
    `  Estimated tax:               ${formatCurrency(result.estimatedTax)}`,
    ...(result.lowIncomeTaxOffset > 0
      ? [`  Low income tax offset:      -${formatCurrency(result.lowIncomeTaxOffset)}`]
      : []),
    ...(result.lowIncomeTaxOffset > 0
      ? [`  Tax after offset:           ${formatCurrency(result.taxAfterOffsets)}`]
      : []),
    `  Medicare:                    ${formatCurrency(result.medicareAmount)}`,
    ...(result.medicareSurchargeAmount > 0
      ? [`  Extra Medicare charge:      ${formatCurrency(result.medicareSurchargeAmount)}`]
      : []),
    ...(result.studentLoanRepayment > 0
      ? [`  Study loan repayment:        ${formatCurrency(result.studentLoanRepayment)}`]
      : []),
    `  Tax already taken out:       ${formatCurrency(result.taxAlreadyTaken)}`,
    "",
    "This is only an estimate. It is not tax advice.",
    "Not affiliated with the Australian Taxation Office.",
  ];
  return lines.join("\n");
}

export default function SaveCalculationActions({
  result,
}: SaveCalculationActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getPlainTextSummary(result));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const blob = new Blob([getPlainTextSummary(result)], {
      type: "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "tax-estimate.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:p-5">
      <h3 className="mb-2 text-base font-semibold text-slate-950">
        Save your estimate
      </h3>
      <p className="mb-4 text-sm text-slate-600">
        Keep a copy before you jump into myTax.
      </p>

      <div className="no-print flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition hover:border-emerald-300 hover:text-emerald-700"
        >
          {copied ? "Copied!" : "Copy result"}
        </button>
        <button
          type="button"
          onClick={handlePrint}
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition hover:border-emerald-300 hover:text-emerald-700"
        >
          Print result
        </button>
        <button
          type="button"
          onClick={handleDownload}
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 transition hover:border-emerald-300 hover:text-emerald-700"
        >
          Download (.txt)
        </button>
      </div>
    </div>
  );
}
