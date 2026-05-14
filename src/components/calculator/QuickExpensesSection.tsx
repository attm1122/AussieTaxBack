"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { useState } from "react";
import { CalculatorFormData } from "./TaxRefundCalculator";
import GuidedExpensesSection from "./GuidedExpensesSection";

export default function QuickExpensesSection() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<CalculatorFormData>();

  const knowsTotal = useWatch({ name: "knowsTotalExpenses" });
  const [showGuided, setShowGuided] = useState(false);

  const handleKnowsTotalChange = (value: boolean) => {
    setValue("knowsTotalExpenses", value, { shouldValidate: true });
    if (value) {
      setShowGuided(false);
    }
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:p-5">
      <h2 className="text-lg font-semibold text-slate-950 mb-4">
        Quick work expenses
      </h2>

      <div className="mb-4">
        <p className="text-sm font-medium text-slate-700 mb-2">
          Do you already know your total work expenses?
        </p>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="knowsTotalExpenses"
              checked={knowsTotal === true}
              onChange={() => handleKnowsTotalChange(true)}
              className="text-emerald-600 focus:ring-emerald-500"
            />
            <span className="text-sm text-slate-700">Yes</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="knowsTotalExpenses"
              checked={knowsTotal === false}
              onChange={() => handleKnowsTotalChange(false)}
              className="text-emerald-600 focus:ring-emerald-500"
            />
            <span className="text-sm text-slate-700">No</span>
          </label>
        </div>
      </div>

      {knowsTotal === true && (
        <div>
          <label
            htmlFor="totalExpensesAmount"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            How much did you spend on work expenses?
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
              $
            </span>
            <input
              id="totalExpensesAmount"
              type="number"
              min="0"
              placeholder="0"
              {...register("totalExpensesAmount", { valueAsNumber: true })}
              className="w-full rounded-md border border-slate-300 pl-7 pr-3 py-2 focus:border-emerald-500"
            />
          </div>
          {errors.totalExpensesAmount && (
            <p className="text-red-600 text-sm mt-1" role="alert">
              {errors.totalExpensesAmount.message}
            </p>
          )}
        </div>
      )}

      {knowsTotal === false && !showGuided && (
        <button
          type="button"
          onClick={() => setShowGuided(true)}
          className="no-print w-full rounded-md border border-emerald-200 bg-emerald-50 px-4 py-2.5 font-medium text-emerald-800 transition-colors hover:bg-emerald-100"
        >
          Help me find work expenses
        </button>
      )}

      {knowsTotal === false && showGuided && (
        <GuidedExpensesSection />
      )}
    </div>
  );
}
