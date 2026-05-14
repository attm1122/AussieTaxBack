import {
  CalculatorInput,
  CalculationResult,
  ExpenseBreakdown,
  TaxBreakdown,
  TaxYearConfig,
  WorkExpenses,
} from "./types";
import {
  kilometerRate2024_25,
  kilometerRate2025_26,
  taxYearsConfig,
} from "./tax-config";

function roundCents(amount: number): number {
  return Math.round(amount * 100) / 100;
}

/**
 * Calculate progressive tax for a given income using ATO resident tax brackets.
 *
 * ATO formula: For the bracket that contains the income:
 *   tax = base + (income - threshold) * rate
 *
 * Example: $50,000 income falls in bracket 3 ($45,001 - $135,000)
 *   tax = $4,288 + ($50,000 - $45,000) * 0.30 = $4,288 + $1,500 = $5,788
 */
export function calculateTaxForIncome(
  income: number,
  config: TaxYearConfig
): { tax: number; breakdown: TaxBreakdown } {
  const taxableIncome = Math.max(0, income);
  let applicableBracket = config.residentRates[0];

  // Find the highest bracket that applies to this income
  for (const bracket of config.residentRates) {
    if (taxableIncome > (bracket.max ?? taxableIncome)) {
      continue; // Income exceeds this bracket, keep looking
    }
    if (taxableIncome >= bracket.min) {
      applicableBracket = bracket;
      break;
    }
  }

  // Use the ATO base + rate formula for the applicable bracket
  // The threshold is (min - 1) because ATO brackets use "for each $1 over $X"
  let totalTax: number;
  const threshold = Math.max(0, applicableBracket.min - 1);
  if (taxableIncome <= threshold) {
    totalTax = applicableBracket.base;
  } else {
    const excessOverThreshold = taxableIncome - threshold;
    totalTax = Math.round(applicableBracket.base + excessOverThreshold * applicableBracket.rate);
  }

  totalTax = Math.max(0, totalTax);

  // Build breakdown for all brackets
  const brackets: TaxBreakdown["brackets"] = config.residentRates.map(
    (bracket) => {
      if (taxableIncome <= bracket.min) {
        return {
          min: bracket.min,
          max: bracket.max,
          rate: bracket.rate,
          taxInBracket: 0,
        };
      }

      const bracketMax = bracket.max ?? taxableIncome;
      const incomeInBracket = Math.max(0, Math.min(taxableIncome, bracketMax) - bracket.min);
      const taxInBracket = roundCents(incomeInBracket * bracket.rate);

      return {
        min: bracket.min,
        max: bracket.max,
        rate: bracket.rate,
        taxInBracket,
      };
    }
  );

  return {
    tax: totalTax,
    breakdown: {
      brackets,
      totalProgressiveTax: totalTax,
    },
  };
}

/**
 * Calculate a single expense category total.
 * Applies employer reimbursement and work-use percentage.
 * Never returns a negative value.
 */
export function calculateCategoryTotal(
  spent: number,
  employerPaidBack: number,
  workPercentage: number = 100
): number {
  const netAfterReimbursement = Math.max(0, spent - employerPaidBack);
  const percentageMultiplier = Math.max(0, Math.min(100, workPercentage)) / 100;
  return roundCents(netAfterReimbursement * percentageMultiplier);
}

/**
 * Calculate work travel total including car kilometres.
 */
export function calculateWorkTravelTotal(
  expenses: WorkExpenses,
  year: "2024-25" | "2025-26"
): number {
  const kmRate =
    year === "2024-25" ? kilometerRate2024_25 : kilometerRate2025_26;
  const cappedKm = Math.min(expenses.carKilometres, 5000);
  const carCosts = roundCents(cappedKm * kmRate);
  const totalTravel =
    carCosts +
    expenses.otherTravelCosts +
    expenses.accommodation +
    expenses.mealsWhileAway;
  return Math.max(0, roundCents(totalTravel - expenses.travelEmployerPaid));
}

/**
 * Calculate the full expense breakdown from guided inputs.
 */
export function calculateExpenseBreakdown(
  input: CalculatorInput
): ExpenseBreakdown {
  const e = input.expenses;

  const workClothesPPEAndLaundry = roundCents(
    Math.max(0, e.workClothesAmount - e.workClothesEmployerPaid) +
      e.laundryDryCleaningAmount
  );

  const toolsAndEquipment = calculateCategoryTotal(
    e.toolsAmount,
    e.toolsEmployerPaid,
    e.toolsWorkPercentage
  );

  const phoneAndInternet = roundCents(
    calculateCategoryTotal(e.phoneYearlyCost, 0, e.phoneWorkPercentage) +
      calculateCategoryTotal(e.internetYearlyCost, 0, e.internetWorkPercentage)
  );

  const trainingTicketsAndLicences = roundCents(
    Math.max(
      0,
      e.trainingCost + e.trainingBooksMaterials + e.trainingTravel - e.trainingEmployerPaid
    )
  );

  const workTravel = calculateWorkTravelTotal(e, input.financialYear);

  const subscriptionsMembershipsAndUnionFees = calculateCategoryTotal(
    e.subscriptionsAmount,
    0,
    e.subscriptionsWorkPercentage
  );

  const donations = e.donationsAmount;
  const taxAgentOrSoftware = e.taxAgentCost;

  const total = roundCents(
    workClothesPPEAndLaundry +
      toolsAndEquipment +
      phoneAndInternet +
      trainingTicketsAndLicences +
      workTravel +
      subscriptionsMembershipsAndUnionFees +
      donations +
      taxAgentOrSoftware
  );

  return {
    workClothesPPEAndLaundry,
    toolsAndEquipment,
    phoneAndInternet,
    trainingTicketsAndLicences,
    workTravel,
    subscriptionsMembershipsAndUnionFees,
    donations,
    taxAgentOrSoftware,
    total,
  };
}

/**
 * Main calculation function. Given calculator inputs, produces the full result.
 */
export function calculateResult(input: CalculatorInput): CalculationResult {
  const config = taxYearsConfig[input.financialYear];

  // Determine total work expenses
  let totalWorkExpenses: number;
  let expenseBreakdown: ExpenseBreakdown;

  if (input.knowsTotalExpenses) {
    totalWorkExpenses = Math.max(0, input.totalExpensesAmount);
    expenseBreakdown = {
      workClothesPPEAndLaundry: 0,
      toolsAndEquipment: 0,
      phoneAndInternet: 0,
      trainingTicketsAndLicences: 0,
      workTravel: 0,
      subscriptionsMembershipsAndUnionFees: 0,
      donations: 0,
      taxAgentOrSoftware: 0,
      total: totalWorkExpenses,
    };
  } else {
    expenseBreakdown = calculateExpenseBreakdown(input);
    totalWorkExpenses = expenseBreakdown.total;
  }

  const incomeAfterWorkExpenses = Math.max(
    0,
    input.incomeBeforeTax - totalWorkExpenses
  );

  const { tax: estimatedTax, breakdown: taxBreakdown } =
    calculateTaxForIncome(incomeAfterWorkExpenses, config);

  const medicareAmount =
    input.medicareExempt === true
      ? 0
      : roundCents(incomeAfterWorkExpenses * config.medicareRate);

  const studentLoanRepayment = input.hasStudentLoan
    ? input.studentLoanRepayment
    : 0;

  const totalTaxPayable = roundCents(
    estimatedTax + medicareAmount + studentLoanRepayment
  );

  const estimatedRefundOrPayable = roundCents(
    input.taxPaid - totalTaxPayable
  );

  return {
    incomeBeforeTax: input.incomeBeforeTax,
    totalWorkExpenses,
    incomeAfterWorkExpenses,
    estimatedTax,
    medicareAmount,
    studentLoanRepayment,
    totalTaxPayable,
    taxAlreadyTaken: input.taxPaid,
    estimatedRefundOrPayable,
    isRefund: estimatedRefundOrPayable > 0,
    expenseBreakdown,
    taxBreakdown,
  };
}
