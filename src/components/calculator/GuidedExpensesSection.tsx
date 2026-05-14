"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { CalculatorFormData } from "./TaxRefundCalculator";
import ExpenseCard from "./ExpenseCard";

function useCalcForm() {
  return useFormContext<CalculatorFormData>();
}

function DollarInput({
  id,
  label,
  name,
  error,
  placeholder = "0",
}: {
  id: string;
  label: string;
  name: keyof CalculatorFormData;
  error?: { message?: string };
  placeholder?: string;
}) {
  const { register } = useCalcForm();
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
        <input
          id={id}
          type="number"
          min="0"
          placeholder={placeholder}
          {...register(name, { valueAsNumber: true })}
          className="w-full rounded-md border border-gray-300 pl-7 pr-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
          aria-invalid={error ? "true" : "false"}
        />
      </div>
      {error && (
        <p className="text-red-600 text-sm mt-1" role="alert">{error.message}</p>
      )}
    </div>
  );
}

function PctInput({
  id,
  label,
  name,
  error,
}: {
  id: string;
  label: string;
  name: keyof CalculatorFormData;
  error?: { message?: string };
}) {
  const { register } = useCalcForm();
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="number"
          min="0"
          max="100"
          placeholder="0"
          {...register(name, { valueAsNumber: true })}
          className="w-full rounded-md border border-gray-300 px-3 py-2 pr-8 focus:ring-2 focus:ring-green-500 focus:border-green-500"
          aria-invalid={error ? "true" : "false"}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">%</span>
      </div>
      {error && (
        <p className="text-red-600 text-sm mt-1" role="alert">{error.message}</p>
      )}
    </div>
  );
}

export default function GuidedExpensesSection() {
  const { register, formState } = useCalcForm();
  const workerType = useWatch({ name: "workerType" });
  const errors = formState.errors;
  const isFifo = workerType === "fifo-dido";

  return (
    <div className="mt-4">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
        Work expense categories
      </h3>

      <ExpenseCard
        title="Work clothes, PPE and laundry"
        description="Did you buy clothing, boots or safety gear for work?"
        examples={["Steel-cap boots", "High-vis clothing", "Gloves", "Safety glasses", "Hard hats", "Branded uniforms", "Protective clothing"]}
        helperWarning="Everyday clothes usually do not count, even if you wear them to work."
      >
        <DollarInput id="workClothesAmount" label="How much did you spend?" name="workClothesAmount" error={errors.workClothesAmount} />
        <DollarInput id="workClothesEmployerPaid" label="How much did your employer pay you back?" name="workClothesEmployerPaid" error={errors.workClothesEmployerPaid} />
        <DollarInput id="laundryDryCleaningAmount" label="Did you pay for laundry or dry-cleaning?" name="laundryDryCleaningAmount" error={errors.laundryDryCleaningAmount} />
      </ExpenseCard>

      <ExpenseCard
        title="Tools and equipment"
        description="Did you buy tools or equipment to do your job?"
        examples={["Tools", "Laptop", "Tablet", "Phone", "Work bag", "Safety equipment", "Repairs to tools"]}
      >
        <DollarInput id="toolsAmount" label="How much did you spend?" name="toolsAmount" error={errors.toolsAmount} />
        <PctInput id="toolsWorkPercentage" label="What percentage was for work?" name="toolsWorkPercentage" error={errors.toolsWorkPercentage} />
        <DollarInput id="toolsEmployerPaid" label="How much did your employer pay you back?" name="toolsEmployerPaid" error={errors.toolsEmployerPaid} />
        <p className="text-xs text-gray-500">Only include the work-use part. For example, if you use your phone 50% for work, only include 50% of the cost.</p>
      </ExpenseCard>

      <ExpenseCard
        title="Phone and internet"
        description="Did you use your phone or internet for work?"
        examples={["Calling customers", "Using work apps", "Checking rosters", "Work emails", "Messaging your manager", "Uploading timesheets"]}
      >
        <DollarInput id="phoneYearlyCost" label="Yearly phone cost" name="phoneYearlyCost" error={errors.phoneYearlyCost} />
        <PctInput id="phoneWorkPercentage" label="Phone work-use percentage" name="phoneWorkPercentage" error={errors.phoneWorkPercentage} />
        <DollarInput id="internetYearlyCost" label="Yearly internet cost" name="internetYearlyCost" error={errors.internetYearlyCost} />
        <PctInput id="internetWorkPercentage" label="Internet work-use percentage" name="internetWorkPercentage" error={errors.internetWorkPercentage} />
        <p className="text-xs text-gray-500">Use your best estimate if you have records. Do not include private use.</p>
      </ExpenseCard>

      <ExpenseCard
        title="Training, tickets and licences"
        description="Did you pay for training, courses, tickets or licences for work?"
        examples={["First aid certificate", "White card", "Working at heights", "Confined space ticket", "Machinery ticket", "Required work licence", "Online course", "Work-related certification"]}
        helperWarning="Training usually needs to be connected to your current job."
      >
        <DollarInput id="trainingCost" label="Course or licence cost" name="trainingCost" error={errors.trainingCost} />
        <DollarInput id="trainingBooksMaterials" label="Books or learning materials" name="trainingBooksMaterials" error={errors.trainingBooksMaterials} />
        <DollarInput id="trainingTravel" label="Travel for training" name="trainingTravel" error={errors.trainingTravel} />
        <DollarInput id="trainingEmployerPaid" label="How much did your employer pay you back?" name="trainingEmployerPaid" error={errors.trainingEmployerPaid} />
      </ExpenseCard>

      <ExpenseCard
        title="Work travel"
        description="Did you pay for travel for work?"
        examples={["Driving between job sites", "Parking", "Tolls", "Taxi or rideshare", "Flights for work", "Accommodation for work trips", "Meals while away overnight for work"]}
        helperWarning="Normal travel from home to work usually does not count."
      >
        {isFifo && (
          <p className="text-xs text-blue-700 bg-blue-50 rounded-md px-3 py-2 mb-2">
            FIFO travel can be tricky. Only include costs you paid yourself and were not paid back for.
          </p>
        )}
        <div>
          <label htmlFor="carKilometres" className="block text-sm font-medium text-gray-700 mb-1">
            Car kilometres for work
          </label>
          <input
            id="carKilometres"
            type="number"
            min="0"
            max="5000"
            placeholder="0"
            {...register("carKilometres", { valueAsNumber: true })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          <p className="text-xs text-gray-500 mt-1">Maximum 5,000 km can be claimed.</p>
        </div>
        <DollarInput id="otherTravelCosts" label="Other travel costs" name="otherTravelCosts" error={errors.otherTravelCosts} />
        <DollarInput id="accommodation" label="Accommodation" name="accommodation" error={errors.accommodation} />
        <DollarInput id="mealsWhileAway" label="Meals while away overnight" name="mealsWhileAway" error={errors.mealsWhileAway} />
        <DollarInput id="travelEmployerPaid" label="How much did your employer pay you back?" name="travelEmployerPaid" error={errors.travelEmployerPaid} />
      </ExpenseCard>

      <ExpenseCard
        title="Subscriptions, memberships and union fees"
        description="Did you pay for work-related memberships or subscriptions?"
        examples={["Union fees", "Professional membership", "Industry registration", "Trade journals", "Work software", "Paid apps used for work", "Online tools"]}
      >
        <DollarInput id="subscriptionsAmount" label="Total amount paid" name="subscriptionsAmount" error={errors.subscriptionsAmount} />
        <PctInput id="subscriptionsWorkPercentage" label="Work-use percentage, if partly personal" name="subscriptionsWorkPercentage" error={errors.subscriptionsWorkPercentage} />
      </ExpenseCard>

      <ExpenseCard
        title="Donations"
        description="Did you donate to a registered charity?"
        examples={[]}
        helperWarning="Only include donations you believe are tax-deductible and have records for."
      >
        <DollarInput id="donationsAmount" label="Total donations" name="donationsAmount" error={errors.donationsAmount} />
        <div className="flex items-center gap-2">
          <input
            id="donationsHaveReceipts"
            type="checkbox"
            {...register("donationsHaveReceipts")}
            className="rounded text-green-600 focus:ring-green-500"
          />
          <label htmlFor="donationsHaveReceipts" className="text-sm text-gray-700">
            Do you have records or receipts?
          </label>
        </div>
      </ExpenseCard>

      <ExpenseCard
        title="Tax agent or tax software"
        description="Did you pay someone to help with your tax?"
        examples={["Accountant", "Tax agent", "Tax software", "Tax advice"]}
      >
        <DollarInput id="taxAgentCost" label="Total amount paid" name="taxAgentCost" error={errors.taxAgentCost} />
      </ExpenseCard>
    </div>
  );
}
