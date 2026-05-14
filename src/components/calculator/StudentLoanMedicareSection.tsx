"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { CalculatorFormData } from "./TaxRefundCalculator";

export default function StudentLoanMedicareSection() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<CalculatorFormData>();

  const hasStudentLoan = useWatch({ name: "hasStudentLoan" });

  const handleStudentLoanChange = (value: boolean) => {
    setValue("hasStudentLoan", value, { shouldValidate: true });
    if (!value) {
      setValue("studentLoanRepayment", 0);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-5 shadow-sm mb-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Student loan and Medicare
      </h2>

      <div className="space-y-4">
        {/* Student loan */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Do you have a student loan such as HELP, HECS, VET Student Loan or
            similar?
          </p>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="hasStudentLoan"
                checked={hasStudentLoan === true}
                onChange={() => handleStudentLoanChange(true)}
                className="text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="hasStudentLoan"
                checked={hasStudentLoan === false}
                onChange={() => handleStudentLoanChange(false)}
                className="text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">No</span>
            </label>
          </div>
        </div>

        {hasStudentLoan === true && (
          <div>
            <label
              htmlFor="studentLoanRepayment"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Student loan repayment amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                $
              </span>
              <input
                id="studentLoanRepayment"
                type="number"
                min="0"
                placeholder="0"
                {...register("studentLoanRepayment", { valueAsNumber: true })}
                className="w-full rounded-md border border-gray-300 pl-7 pr-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              This is a placeholder for the current financial year. Enter your
              estimated repayment.
            </p>
          </div>
        )}

        {/* Private hospital cover */}
        <div className="flex items-center gap-2">
          <input
            id="hasPrivateHospitalCover"
            type="checkbox"
            {...register("hasPrivateHospitalCover")}
            className="rounded text-green-600 focus:ring-green-500"
          />
          <label
            htmlFor="hasPrivateHospitalCover"
            className="text-sm text-gray-700"
          >
            Do you have private hospital cover?
          </label>
        </div>

        {/* Medicare exempt */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Do you think you are exempt from the Medicare amount?
          </p>
          <div className="flex gap-4 flex-wrap">
            {["yes", "no", "not-sure"].map((value) => (
              <label key={value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value={value}
                  {...register("medicareExempt")}
                  className="text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">
                  {value === "yes"
                    ? "Yes"
                    : value === "no"
                    ? "No"
                    : "Not sure"}
                </span>
              </label>
            ))}
          </div>
          {errors.medicareExempt && (
            <p className="text-red-600 text-sm mt-1" role="alert">
              {errors.medicareExempt.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
