"use client";

import { useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateResult } from "@/lib/tax/calculate-tax";
import type { CalculatorInput, CalculationResult } from "@/lib/tax/types";
import IncomeSection from "./IncomeSection";
import QuickExpensesSection from "./QuickExpensesSection";
import StudentLoanMedicareSection from "./StudentLoanMedicareSection";
import ResultCard from "./ResultCard";
import SaveCalculationActions from "./SaveCalculationActions";

const schema = z.object({
  financialYear: z.enum(["2024-25", "2025-26"]),
  incomeBeforeTax: z.coerce.number().min(0, "Income must be 0 or more"),
  taxPaid: z.coerce.number().min(0, "Tax must be 0 or more"),
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
  studentLoanRepayment: z.coerce.number().min(0).default(0),
  hasPrivateHospitalCover: z.boolean().default(false),
  medicareExempt: z.enum(["yes", "no", "not-sure"]).optional(),
});

export type CalculatorFormData = z.infer<typeof schema>;

function buildCalculatorInput(data: CalculatorFormData): CalculatorInput {
  return {
    financialYear: data.financialYear,
    incomeBeforeTax: data.incomeBeforeTax,
    taxPaid: data.taxPaid,
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
    studentLoanRepayment: data.studentLoanRepayment,
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
      incomeBeforeTax: 0,
      taxPaid: 0,
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
      studentLoanRepayment: 0,
      hasPrivateHospitalCover: false,
    },
    mode: "onChange",
  });

  const watchedValues = methods.watch();

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
        className="space-y-2"
        noValidate
      >
        <IncomeSection />
        <QuickExpensesSection />
        <StudentLoanMedicareSection />

        {result && (
          <>
            <ResultCard result={result} />
            <SaveCalculationActions result={result} />
          </>
        )}
      </form>
    </FormProvider>
  );
}
