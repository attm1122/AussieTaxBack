import {
  CalculatorInput,
  CalculationResult,
  ExpenseBreakdown,
  TaxBracket,
  TaxBreakdown,
  TaxResidency,
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
  return calculateTaxFromBrackets(income, config.residentRates);
}

export function calculateTaxFromBrackets(
  income: number,
  rates: TaxBracket[]
): { tax: number; breakdown: TaxBreakdown } {
  const taxableIncome = Math.max(0, income);
  let applicableBracket = rates[0];

  // Find the highest bracket that applies to this income
  for (const bracket of rates) {
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
  const brackets: TaxBreakdown["brackets"] = rates.map(
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

function getRatesForResidency(
  config: TaxYearConfig,
  taxResidency: TaxResidency
): TaxBracket[] {
  if (taxResidency === "working-holiday-maker") {
    return config.workingHolidayMakerRates;
  }
  if (taxResidency === "foreign-resident") {
    return config.foreignResidentRates;
  }
  return config.residentRates;
}

export function calculateMedicareLevy(
  taxableIncome: number,
  config: TaxYearConfig,
  taxResidency: TaxResidency,
  medicareExempt: boolean | null,
  medicareExemptionDays: number = 0,
  hasSpouseOrDependants: boolean = false,
  familyTaxableIncome: number = taxableIncome,
  dependentChildren: number = 0
): number {
  const exemptionDays = Math.max(0, Math.min(365, medicareExemptionDays));

  if (
    taxResidency !== "resident" ||
    medicareExempt === true ||
    exemptionDays >= 365
  ) {
    return 0;
  }

  let fullYearLevy: number;

  if (hasSpouseOrDependants) {
    const familyUpperThreshold =
      config.medicareFamilyUpperThreshold +
      Math.max(0, dependentChildren) * config.medicareFamilyChildAddOn;
    const familyLowerThreshold = familyUpperThreshold * 0.8;

    if (familyTaxableIncome <= familyLowerThreshold) {
      fullYearLevy = 0;
    } else if (familyTaxableIncome <= familyUpperThreshold) {
      fullYearLevy = Math.min(
        taxableIncome * config.medicareRate,
        (familyTaxableIncome - familyLowerThreshold) * 0.1
      );
    } else {
      fullYearLevy = taxableIncome * config.medicareRate;
    }
  } else if (taxableIncome <= config.medicareSingleLowerThreshold) {
    fullYearLevy = 0;
  } else if (taxableIncome <= config.medicareSingleUpperThreshold) {
    fullYearLevy = (taxableIncome - config.medicareSingleLowerThreshold) * 0.1;
  } else {
    fullYearLevy = taxableIncome * config.medicareRate;
  }

  const taxableDaysRatio = (365 - exemptionDays) / 365;
  return roundCents(fullYearLevy * taxableDaysRatio);
}

export function calculateMedicareSurcharge(
  medicareSurchargeIncome: number,
  config: TaxYearConfig,
  taxResidency: TaxResidency,
  hasPrivateHospitalCover: boolean,
  hasSpouseOrDependants: boolean = false,
  dependentChildren: number = 0,
  familyMedicareSurchargeIncome: number = medicareSurchargeIncome
): number {
  if (taxResidency !== "resident" || hasPrivateHospitalCover) {
    return 0;
  }

  const childAddOn =
    hasSpouseOrDependants && dependentChildren > 1
      ? (dependentChildren - 1) * config.medicareSurchargeFamilyChildAddOn
      : 0;
  const thresholds = hasSpouseOrDependants
    ? {
        tier1: config.medicareSurchargeFamilyThresholds.tier1 + childAddOn,
        tier2: config.medicareSurchargeFamilyThresholds.tier2 + childAddOn,
        tier3: config.medicareSurchargeFamilyThresholds.tier3 + childAddOn,
      }
    : config.medicareSurchargeSingleThresholds;
  const testIncome = hasSpouseOrDependants
    ? familyMedicareSurchargeIncome
    : medicareSurchargeIncome;

  if (testIncome > thresholds.tier3) {
    return roundCents(medicareSurchargeIncome * 0.015);
  }
  if (testIncome > thresholds.tier2) {
    return roundCents(medicareSurchargeIncome * 0.0125);
  }
  if (testIncome > thresholds.tier1) {
    return roundCents(medicareSurchargeIncome * 0.01);
  }
  return 0;
}

export function calculateStudyLoanRepayment(
  repaymentIncome: number,
  config: TaxYearConfig
): number {
  const income = Math.max(0, repaymentIncome);

  if (!config.studyLoanUsesMarginalRates) {
    const bracket = config.studyLoanRates.find(
      (rate) => income >= rate.min && income <= (rate.max ?? income)
    );
    return bracket ? roundCents(income * bracket.rate) : 0;
  }

  const bracket = config.studyLoanRates.find(
    (rate) => income >= rate.min && income <= (rate.max ?? income)
  );

  if (!bracket || bracket.rate === 0) {
    return 0;
  }

  if (bracket.min === 179286) {
    return roundCents(income * bracket.rate);
  }

  const threshold = Math.max(0, bracket.min - 1);
  return roundCents(bracket.base + (income - threshold) * bracket.rate);
}

export function calculateLowIncomeTaxOffset(
  taxableIncome: number,
  incomeTaxBeforeOffsets: number,
  config: TaxYearConfig,
  taxResidency: TaxResidency
): number {
  if (taxResidency !== "resident" || incomeTaxBeforeOffsets <= 0) {
    return 0;
  }

  const lito = config.lowIncomeTaxOffset;
  let offset = 0;

  if (taxableIncome <= lito.fullOffsetThreshold) {
    offset = lito.maximumOffset;
  } else if (taxableIncome <= lito.firstTaperThreshold) {
    offset =
      lito.maximumOffset -
      (taxableIncome - lito.fullOffsetThreshold) * lito.firstTaperRate;
  } else if (taxableIncome <= lito.secondTaperThreshold) {
    offset =
      325 - (taxableIncome - lito.firstTaperThreshold) * lito.secondTaperRate;
  }

  return roundCents(Math.min(Math.max(0, offset), incomeTaxBeforeOffsets));
}

function getConfidence(input: CalculatorInput, totalWorkExpenses: number): CalculationResult["confidence"] {
  const reasons: string[] = [];

  if (input.taxResidency !== "resident") {
    reasons.push("temporary visa or non-resident tax can depend on your exact situation");
  }
  if (input.medicareExemptionDays > 0 || input.medicareExempt === null) {
    reasons.push("Medicare can change if you were exempt or only covered for part of the year");
  }
  if (input.hasSpouseOrDependants) {
    reasons.push("spouse or children can change Medicare");
  }
  if (input.workerType === "contractor") {
    reasons.push("contractor and ABN income may need extra tax rules");
  }
  if (totalWorkExpenses > 0) {
    reasons.push("work expenses depend on records and ATO rules");
  }
  if (
    input.reportableFringeBenefits > 0 ||
    input.reportableSuperContributions > 0 ||
    input.netInvestmentLoss > 0 ||
    input.exemptForeignEmploymentIncome > 0
  ) {
    reasons.push("extra myGov income items can affect study loan and Medicare");
  }

  if (reasons.length === 0) {
    return {
      level: "high",
      reasons: ["simple wage estimate with no extra Medicare or expense issues"],
    };
  }

  return {
    level: reasons.length <= 2 ? "medium" : "lower",
    reasons,
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
    calculateTaxFromBrackets(
      incomeAfterWorkExpenses,
      getRatesForResidency(config, input.taxResidency)
    );

  const lowIncomeTaxOffset = calculateLowIncomeTaxOffset(
    incomeAfterWorkExpenses,
    estimatedTax,
    config,
    input.taxResidency
  );

  const taxAfterOffsets = roundCents(
    Math.max(0, estimatedTax - lowIncomeTaxOffset)
  );

  const extraIncomeForTests = roundCents(
    Math.max(0, input.reportableFringeBenefits) +
      Math.max(0, input.reportableSuperContributions) +
      Math.max(0, input.netInvestmentLoss) +
      Math.max(0, input.exemptForeignEmploymentIncome)
  );

  const studyLoanRepaymentIncome = roundCents(
    incomeAfterWorkExpenses + extraIncomeForTests
  );

  const medicareSurchargeIncome = roundCents(
    incomeAfterWorkExpenses + extraIncomeForTests
  );

  const familyTaxableIncome = roundCents(
    incomeAfterWorkExpenses + Math.max(0, input.spouseIncome)
  );

  const familyMedicareSurchargeIncome = roundCents(
    medicareSurchargeIncome + Math.max(0, input.spouseIncome)
  );

  const medicareAmount = calculateMedicareLevy(
    incomeAfterWorkExpenses,
    config,
    input.taxResidency,
    input.medicareExempt,
    input.medicareExemptionDays,
    input.hasSpouseOrDependants,
    familyTaxableIncome,
    input.dependentChildren
  );

  const studentLoanRepayment = input.hasStudentLoan
    ? calculateStudyLoanRepayment(studyLoanRepaymentIncome, config)
    : 0;

  const medicareSurchargeAmount = calculateMedicareSurcharge(
    medicareSurchargeIncome,
    config,
    input.taxResidency,
    input.hasPrivateHospitalCover,
    input.hasSpouseOrDependants,
    input.dependentChildren,
    familyMedicareSurchargeIncome
  );

  const totalTaxPayable = roundCents(
    taxAfterOffsets +
      medicareAmount +
      medicareSurchargeAmount +
      studentLoanRepayment
  );

  const estimatedRefundOrPayable = roundCents(
    input.taxPaid - totalTaxPayable
  );

  return {
    financialYear: input.financialYear,
    taxResidency: input.taxResidency,
    incomeBeforeTax: input.incomeBeforeTax,
    totalWorkExpenses,
    incomeAfterWorkExpenses,
    estimatedTax,
    lowIncomeTaxOffset,
    taxAfterOffsets,
    medicareAmount,
    medicareSurchargeIncome,
    medicareSurchargeAmount,
    studyLoanRepaymentIncome,
    studentLoanRepayment,
    totalTaxPayable,
    taxAlreadyTaken: input.taxPaid,
    estimatedRefundOrPayable,
    isRefund: estimatedRefundOrPayable > 0,
    expenseBreakdown,
    taxBreakdown,
    confidence: getConfidence(input, totalWorkExpenses),
  };
}
