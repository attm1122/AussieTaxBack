"use client";

import { useMemo } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateResult } from "@/lib/tax/calculate-tax";
import type { CalculatorInput, CalculationResult } from "@/lib/tax/types";
import IncomeSection from "./IncomeSection";
import QuickExpensesSection from "./QuickExpensesSection";
import StudentLoanMedicareSection from "./StudentLoanMedicareSection";
import ResultCard from "./ResultCard";
import SaveCalculationActions from "./SaveCalculationActions";
import AtoLodgementGuide from "./AtoLodgementGuide";
import AssumptionsSourcesPanel from "./AssumptionsSourcesPanel";
import AdSlot from "@/components/ads/AdSlot";

const schema = z.object({
  financialYear: z.enum(["2024-25", "2025-26"]),
  taxResidency: z.enum(["resident", "working-holiday-maker", "foreign-resident"]),
  incomeBeforeTax: z.coerce.number().min(0, "Income must be 0 or more"),
  taxPaid: z.coerce.number().min(0, "Tax must be 0 or more"),
  reportableFringeBenefits: z.coerce.number().min(0).default(0),
  reportableSuperContributions: z.coerce.number().min(0).default(0),
  netInvestmentLoss: z.coerce.number().min(0).default(0),
  exemptForeignEmploymentIncome: z.coerce.number().min(0).default(0),
  hasSpouseOrDependants: z.boolean().default(false),
  spouseIncome: z.coerce.number().min(0).default(0),
  dependentChildren: z.coerce.number().min(0).max(20).default(0),
  medicareExemptionDays: z.coerce.number().min(0).max(365).default(0),
  workerType: z.string().min(1, "Please select your work type"),
  knowsTotalExpenses: z.boolean().default(false),
  totalExpensesAmount: z.coerce.number().min(0).default(0),
  workClothesAmount: z.coerce.number().min(0).default(0),
  workClothesEmployerPaid: z.coerce.number().min(0).default(0),
  laundryDryCleaningAmount: z.coerce.number().min(0).default(0),
  toolsAmount: z.coerce.number().min(0).default(0),
  toolsWorkPercentage: z.coerce.number().min(0).max(100).default(100),
  toolsEmployerPaid: z.coerce.number().min(0).default(0),
  phoneYearlyCost: z.coerce.number().min(0).default(0),
  phoneWorkPercentage: z.coerce.number().min(0).max(100).default(0),
  internetYearlyCost: z.coerce.number().min(0).default(0),
  internetWorkPercentage: z.coerce.number().min(0).max(100).default(0),
  trainingCost: z.coerce.number().min(0).default(0),
  trainingBooksMaterials: z.coerce.number().min(0).default(0),
  trainingTravel: z.coerce.number().min(0).default(0),
  trainingEmployerPaid: z.coerce.number().min(0).default(0),
  carKilometres: z.coerce.number().min(0).default(0),
  otherTravelCosts: z.coerce.number().min(0).default(0),
  accommodation: z.coerce.number().min(0).default(0),
  mealsWhileAway: z.coerce.number().min(0).default(0),
  travelEmployerPaid: z.coerce.number().min(0).default(0),
  subscriptionsAmount: z.coerce.number().min(0).default(0),
  subscriptionsWorkPercentage: z.coerce.number().min(0).max(100).default(100),
  donationsAmount: z.coerce.number().min(0).default(0),
  donationsHaveReceipts: z.boolean().default(false),
  taxAgentCost: z.coerce.number().min(0).default(0),
  hasStudentLoan: z.boolean().default(false),
  hasPrivateHospitalCover: z.boolean().default(false),
  medicareExempt: z.enum(["yes", "no", "not-sure"]).default("not-sure"),
});

export type CalculatorFormData = z.infer<typeof schema>;

function buildCalculatorInput(data: CalculatorFormData): CalculatorInput {
  return {
    financialYear: data.financialYear,
    taxResidency: data.taxResidency,
    incomeBeforeTax: data.incomeBeforeTax,
    taxPaid: data.taxPaid,
    reportableFringeBenefits: data.reportableFringeBenefits,
    reportableSuperContributions: data.reportableSuperContributions,
    netInvestmentLoss: data.netInvestmentLoss,
    exemptForeignEmploymentIncome: data.exemptForeignEmploymentIncome,
    hasSpouseOrDependants: data.hasSpouseOrDependants,
    spouseIncome: data.spouseIncome,
    dependentChildren: data.dependentChildren,
    medicareExemptionDays: data.medicareExemptionDays,
    workerType: data.workerType as CalculatorInput["workerType"],
    knowsTotalExpenses: data.knowsTotalExpenses,
    totalExpensesAmount: data.totalExpensesAmount,
    expenses: {
      workClothesAmount: data.workClothesAmount,
      workClothesEmployerPaid: data.workClothesEmployerPaid,
      laundryDryCleaningAmount: data.laundryDryCleaningAmount,
      toolsAmount: data.toolsAmount,
      toolsWorkPercentage: data.toolsWorkPercentage,
      toolsEmployerPaid: data.toolsEmployerPaid,
      phoneYearlyCost: data.phoneYearlyCost,
      phoneWorkPercentage: data.phoneWorkPercentage,
      internetYearlyCost: data.internetYearlyCost,
      internetWorkPercentage: data.internetWorkPercentage,
      trainingCost: data.trainingCost,
      trainingBooksMaterials: data.trainingBooksMaterials,
      trainingTravel: data.trainingTravel,
      trainingEmployerPaid: data.trainingEmployerPaid,
      carKilometres: data.carKilometres,
      otherTravelCosts: data.otherTravelCosts,
      accommodation: data.accommodation,
      mealsWhileAway: data.mealsWhileAway,
      travelEmployerPaid: data.travelEmployerPaid,
      subscriptionsAmount: data.subscriptionsAmount,
      subscriptionsWorkPercentage: data.subscriptionsWorkPercentage,
      donationsAmount: data.donationsAmount,
      donationsHaveReceipts: data.donationsHaveReceipts,
      taxAgentCost: data.taxAgentCost,
    },
    hasStudentLoan: data.hasStudentLoan,
    hasPrivateHospitalCover: data.hasPrivateHospitalCover,
    medicareExempt:
      data.medicareExempt === "yes"
        ? true
        : data.medicareExempt === "no"
        ? false
        : null,
  };
}

export default function TaxRefundCalculator() {
  const methods = useForm<CalculatorFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      financialYear: "2025-26",
      taxResidency: "resident",
      incomeBeforeTax: 0,
      taxPaid: 0,
      reportableFringeBenefits: 0,
      reportableSuperContributions: 0,
      netInvestmentLoss: 0,
      exemptForeignEmploymentIncome: 0,
      hasSpouseOrDependants: false,
      spouseIncome: 0,
      dependentChildren: 0,
      medicareExemptionDays: 0,
      workerType: "",
      knowsTotalExpenses: false,
      totalExpensesAmount: 0,
      workClothesAmount: 0,
      workClothesEmployerPaid: 0,
      laundryDryCleaningAmount: 0,
      toolsAmount: 0,
      toolsWorkPercentage: 100,
      toolsEmployerPaid: 0,
      phoneYearlyCost: 0,
      phoneWorkPercentage: 0,
      internetYearlyCost: 0,
      internetWorkPercentage: 0,
      trainingCost: 0,
      trainingBooksMaterials: 0,
      trainingTravel: 0,
      trainingEmployerPaid: 0,
      carKilometres: 0,
      otherTravelCosts: 0,
      accommodation: 0,
      mealsWhileAway: 0,
      travelEmployerPaid: 0,
      subscriptionsAmount: 0,
      subscriptionsWorkPercentage: 100,
      donationsAmount: 0,
      donationsHaveReceipts: false,
      taxAgentCost: 0,
      hasStudentLoan: false,
      hasPrivateHospitalCover: false,
      medicareExempt: "not-sure",
    },
    mode: "onChange",
  });

  const watchedValues = useWatch({
    control: methods.control,
  }) as CalculatorFormData;

  const result: CalculationResult | null = useMemo(() => {
    if (
      watchedValues.incomeBeforeTax <= 0 ||
      watchedValues.workerType === "" ||
      watchedValues.taxPaid < 0
    ) {
      return null;
    }
    try {
      const input = buildCalculatorInput(watchedValues);
      return calculateResult(input);
    } catch {
      return null;
    }
  }, [watchedValues]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="space-y-4"
        noValidate
      >
        <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-4 text-sm text-emerald-950">
          <p className="font-semibold">Start with your myGov income statement.</p>
          <p className="mt-1 text-emerald-900/80">
            You only need a few numbers: income, tax already taken out, and any work costs you paid yourself.
          </p>
        </div>
        <IncomeSection />
        <QuickExpensesSection />
        <StudentLoanMedicareSection />

        {result && (
          <>
            <ResultCard result={result} />
            <AdSlot placement="result" />
            <AtoLodgementGuide result={result} />
            <AssumptionsSourcesPanel />
            <SaveCalculationActions result={result} />
          </>
        )}
      </form>
    </FormProvider>
  );
}
