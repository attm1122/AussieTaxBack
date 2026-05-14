"use client";

import { useFormContext } from "react-hook-form";
import { CalculatorFormData } from "./TaxRefundCalculator";

export default function IncomeSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CalculatorFormData>();

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-5 shadow-sm mb-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Your income</h2>
      <div className="space-y-4">
        {/* Financial Year */}
        <div>
          <label
            htmlFor="financialYear"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Which financial year are you estimating?
          </label>
          <select
            id="financialYear"
            {...register("financialYear")}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
          >
            <option value="2025-26">2025-26</option>
            <option value="2024-25">2024-25</option>
          </select>
          {errors.financialYear && (
            <p className="text-red-600 text-sm mt-1" role="alert">
              {errors.financialYear.message}
            </p>
          )}
        </div>

        {/* Income Before Tax */}
        <div>
          <label
            htmlFor="incomeBeforeTax"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            How much did you earn before tax?
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
              $
            </span>
            <input
              id="incomeBeforeTax"
              type="number"
              min="0"
              placeholder="0"
              {...register("incomeBeforeTax", { valueAsNumber: true })}
              className="w-full rounded-md border border-gray-300 pl-7 pr-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              aria-invalid={errors.incomeBeforeTax ? "true" : "false"}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Use the total income from your payslips, income statement or myGov.
          </p>
          {errors.incomeBeforeTax && (
            <p className="text-red-600 text-sm mt-1" role="alert">
              {errors.incomeBeforeTax.message}
            </p>
          )}
        </div>

        {/* Tax Paid */}
        <div>
          <label
            htmlFor="taxPaid"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            How much tax was already taken from your pay?
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
              $
            </span>
            <input
              id="taxPaid"
              type="number"
              min="0"
              placeholder="0"
              {...register("taxPaid", { valueAsNumber: true })}
              className="w-full rounded-md border border-gray-300 pl-7 pr-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              aria-invalid={errors.taxPaid ? "true" : "false"}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            This is the tax your employer already took out during the year.
          </p>
          {errors.taxPaid && (
            <p className="text-red-600 text-sm mt-1" role="alert">
              {errors.taxPaid.message}
            </p>
          )}
        </div>

        {/* Worker Type */}
        <div>
          <label
            htmlFor="workerType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            What best describes your work?
          </label>
          <select
            id="workerType"
            {...register("workerType")}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
            aria-invalid={errors.workerType ? "true" : "false"}
          >
            <option value="">Select your work type</option>
            <option value="full-time">Full-time or part-time employee</option>
            <option value="casual">Casual worker</option>
            <option value="fifo-dido">FIFO or DIDO worker</option>
            <option value="multiple-jobs">More than one job</option>
            <option value="apprentice-trainee">Apprentice or trainee</option>
            <option value="contractor">Contractor</option>
          </select>
          {errors.workerType && (
            <p className="text-red-600 text-sm mt-1" role="alert">
              {errors.workerType.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
