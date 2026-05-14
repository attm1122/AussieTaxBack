"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { CalculatorFormData } from "./TaxRefundCalculator";

function DollarInput({
  id,
  label,
  name,
}: {
  id: string;
  label: string;
  name: keyof CalculatorFormData;
}) {
  const { register } = useFormContext<CalculatorFormData>();

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
          $
        </span>
        <input
          id={id}
          type="number"
          min="0"
          placeholder="0"
          {...register(name, { valueAsNumber: true })}
          className="w-full rounded-md border border-slate-300 pl-7 pr-3 py-2 focus:border-emerald-500"
        />
      </div>
    </div>
  );
}

export default function StudentLoanMedicareSection() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<CalculatorFormData>();

  const hasStudentLoan = useWatch({ name: "hasStudentLoan" });
  const taxResidency = useWatch({ name: "taxResidency" });
  const hasSpouseOrDependants = useWatch({ name: "hasSpouseOrDependants" });
  const medicareExemptValue = useWatch({ name: "medicareExempt" });

  const handleStudentLoanChange = (value: boolean) => {
    setValue("hasStudentLoan", value, { shouldValidate: true });
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:p-5">
      <h2 className="text-lg font-semibold text-slate-950 mb-4">
        Student loan and Medicare
      </h2>

      <div className="space-y-4">
        {/* Student loan */}
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">
            Do you have a HELP, HECS or other study loan?
          </p>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="hasStudentLoan"
                checked={hasStudentLoan === true}
                onChange={() => handleStudentLoanChange(true)}
                className="text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm text-slate-700">Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="hasStudentLoan"
                checked={hasStudentLoan === false}
                onChange={() => handleStudentLoanChange(false)}
                className="text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm text-slate-700">No</span>
            </label>
          </div>
        </div>

        {hasStudentLoan === true && (
          <p className="text-xs text-blue-700 bg-blue-50 rounded-md px-3 py-2">
            We will estimate this for you. The real ATO amount can change if
            you have extra items outside normal wages.
          </p>
        )}

        {taxResidency === "resident" ? (
          <>
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">
                Did you have a spouse or children?
              </p>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="hasSpouseOrDependants"
                    checked={hasSpouseOrDependants === true}
                    onChange={() => setValue("hasSpouseOrDependants", true)}
                    className="text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-slate-700">Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="hasSpouseOrDependants"
                    checked={hasSpouseOrDependants === false}
                    onChange={() => {
                      setValue("hasSpouseOrDependants", false);
                      setValue("spouseIncome", 0);
                      setValue("dependentChildren", 0);
                    }}
                    className="text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-slate-700">No</span>
                </label>
              </div>
            </div>

            {hasSpouseOrDependants && (
              <div className="grid gap-3 sm:grid-cols-2">
                <DollarInput
                  id="spouseIncome"
                  label="Spouse income, if any"
                  name="spouseIncome"
                />
                <div>
                  <label
                    htmlFor="dependentChildren"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Dependent children
                  </label>
                  <input
                    id="dependentChildren"
                    type="number"
                    min="0"
                    max="20"
                    placeholder="0"
                    {...register("dependentChildren", { valueAsNumber: true })}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-emerald-500"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <input
                id="hasPrivateHospitalCover"
                type="checkbox"
                {...register("hasPrivateHospitalCover")}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <label
                htmlFor="hasPrivateHospitalCover"
                className="text-sm text-slate-700"
              >
                Did you have private hospital cover?
              </label>
            </div>
            <p className="text-xs text-slate-500">
              This can affect extra Medicare charges for higher income earners.
            </p>
          </>
        ) : (
          <p className="text-xs text-blue-700 bg-blue-50 rounded-md px-3 py-2">
            Temporary visa holders often do not pay Medicare. If you could not
            use Medicare, you may need a Medicare Entitlement Statement before
            sending your tax return.
          </p>
        )}

        {/* Medicare exempt */}
        {taxResidency === "resident" && (
          <div>
            <p className="text-sm font-medium text-slate-700 mb-2">
              Did you not have to pay Medicare?
            </p>
            <div className="flex gap-4 flex-wrap">
              {["yes", "no", "not-sure"].map((value) => (
                <label
                  key={value}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    value={value}
                    {...register("medicareExempt")}
                    className="text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-slate-700">
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
        )}

        {taxResidency === "resident" && medicareExemptValue !== "yes" && (
          <details className="rounded-md border border-slate-200 bg-slate-50 p-3">
            <summary className="cursor-pointer text-sm font-medium text-slate-800">
              I could not use Medicare for part of the year
            </summary>
            <p className="mt-2 text-xs text-slate-500">
              If you have a Medicare Entitlement Statement, enter the number of
              days it says you were not covered. Leave as zero if unsure.
            </p>
            <div className="mt-3">
              <label
                htmlFor="medicareExemptionDays"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Days not covered by Medicare
              </label>
              <input
                id="medicareExemptionDays"
                type="number"
                min="0"
                max="365"
                placeholder="0"
                {...register("medicareExemptionDays", { valueAsNumber: true })}
                className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-emerald-500"
              />
            </div>
          </details>
        )}

        <details className="rounded-md border border-slate-200 bg-slate-50 p-3">
          <summary className="cursor-pointer text-sm font-medium text-slate-800">
            Add extra ATO income items
          </summary>
          <p className="mt-2 text-xs text-slate-500">
            Most people can leave these as zero. Add them if myGov shows them,
            because they can change study loan and Medicare estimates.
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <DollarInput
              id="reportableFringeBenefits"
              label="Reportable fringe benefits"
              name="reportableFringeBenefits"
            />
            <DollarInput
              id="reportableSuperContributions"
              label="Reportable super"
              name="reportableSuperContributions"
            />
            <DollarInput
              id="netInvestmentLoss"
              label="Net investment loss"
              name="netInvestmentLoss"
            />
            <DollarInput
              id="exemptForeignEmploymentIncome"
              label="Exempt foreign work income"
              name="exemptForeignEmploymentIncome"
            />
          </div>
        </details>
      </div>
    </div>
  );
}
