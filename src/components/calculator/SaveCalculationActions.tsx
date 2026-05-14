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
    `  Income after work expenses:  ${formatCurrency(result.incomeAfterWorkExpenses)}`,
    `  Estimated tax:               ${formatCurrency(result.estimatedTax)}`,
    `  Medicare amount:             ${formatCurrency(result.medicareAmount)}`,
    ...(result.studentLoanRepayment > 0
      ? [`  Student loan repayment:      ${formatCurrency(result.studentLoanRepayment)}`]
      : []),
    `  Tax already taken from pay:  ${formatCurrency(result.taxAlreadyTaken)}`,
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
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);
  const [sending, setSending] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getPlainTextSummary(result));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setEmailStatus({
        type: "error",
        message: "Could not copy to clipboard.",
      });
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

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setEmailStatus(null);

    try {
      const response = await fetch("/api/email-estimate/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, estimate: result }),
      });
      const data = await response.json();

      if (response.ok) {
        setEmailStatus({ type: "info", message: data.message });
      } else {
        setEmailStatus({
          type: "error",
          message: data.error || "Something went wrong.",
        });
      }
    } catch {
      setEmailStatus({
        type: "error",
        message: "Could not send. Please try downloading instead.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-5 shadow-sm">
      <h3 className="text-base font-semibold text-gray-900 mb-4">
        Save your estimate
      </h3>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2 mb-5 no-print">
        <button
          type="button"
          onClick={handleCopy}
          className="bg-gray-100 text-gray-800 text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-200 transition-colors border border-gray-300"
        >
          {copied ? "Copied!" : "Copy result"}
        </button>
        <button
          type="button"
          onClick={handlePrint}
          className="bg-gray-100 text-gray-800 text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-200 transition-colors border border-gray-300"
        >
          Print result
        </button>
        <button
          type="button"
          onClick={handleDownload}
          className="bg-gray-100 text-gray-800 text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-200 transition-colors border border-gray-300"
        >
          Download (.txt)
        </button>
      </div>

      {/* Email form */}
      <form onSubmit={handleEmail} className="no-print">
        <label
          htmlFor="emailAddress"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Enter your email and we&apos;ll send you a copy of your estimate.
        </label>
        <div className="flex gap-2 flex-wrap sm:flex-nowrap">
          <input
            id="emailAddress"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 min-w-0 rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          <button
            type="submit"
            disabled={sending || !email}
            className="bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
          >
            {sending ? "Sending..." : "Send to my email"}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          We only use your email to send this estimate. We do not store your tax
          details for an account.
        </p>
        {emailStatus && (
          <p
            className={`text-sm mt-2 ${
              emailStatus.type === "error"
                ? "text-red-600"
                : emailStatus.type === "success"
                ? "text-green-600"
                : "text-gray-600"
            }`}
            role="status"
          >
            {emailStatus.message}
          </p>
        )}
      </form>
    </div>
  );
}
