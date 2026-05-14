export type FinancialYear = "2024-25" | "2025-26";

export type WorkerType =
  | "full-time"
  | "casual"
  | "fifo-dido"
  | "multiple-jobs"
  | "apprentice-trainee"
  | "contractor";

export type TaxResidency = "resident" | "working-holiday-maker" | "foreign-resident";

export interface TaxBracket {
  min: number;
  max: number | null;
  base: number;
  rate: number;
}

export interface TaxYearConfig {
  residentRates: TaxBracket[];
  workingHolidayMakerRates: TaxBracket[];
  foreignResidentRates: TaxBracket[];
  medicareRate: number;
  medicareSingleLowerThreshold: number;
  medicareSingleUpperThreshold: number;
  medicareFamilyUpperThreshold: number;
  medicareFamilyChildAddOn: number;
  medicareSurchargeSingleThresholds: {
    tier1: number;
    tier2: number;
    tier3: number;
  };
  medicareSurchargeFamilyThresholds: {
    tier1: number;
    tier2: number;
    tier3: number;
  };
  medicareSurchargeFamilyChildAddOn: number;
  studyLoanRates: TaxBracket[];
  studyLoanUsesMarginalRates: boolean;
  lowIncomeTaxOffset: {
    maximumOffset: number;
    fullOffsetThreshold: number;
    firstTaperThreshold: number;
    firstTaperRate: number;
    secondTaperThreshold: number;
    secondTaperRate: number;
  };
}

export interface WorkExpenses {
  workClothesAmount: number;
  workClothesEmployerPaid: number;
  laundryDryCleaningAmount: number;
  toolsAmount: number;
  toolsWorkPercentage: number;
  toolsEmployerPaid: number;
  phoneYearlyCost: number;
  phoneWorkPercentage: number;
  internetYearlyCost: number;
  internetWorkPercentage: number;
  trainingCost: number;
  trainingBooksMaterials: number;
  trainingTravel: number;
  trainingEmployerPaid: number;
  carKilometres: number;
  otherTravelCosts: number;
  accommodation: number;
  mealsWhileAway: number;
  travelEmployerPaid: number;
  subscriptionsAmount: number;
  subscriptionsWorkPercentage: number;
  donationsAmount: number;
  donationsHaveReceipts: boolean;
  taxAgentCost: number;
}

export interface CalculatorInput {
  financialYear: FinancialYear;
  taxResidency: TaxResidency;
  incomeBeforeTax: number;
  taxPaid: number;
  reportableFringeBenefits: number;
  reportableSuperContributions: number;
  netInvestmentLoss: number;
  exemptForeignEmploymentIncome: number;
  hasSpouseOrDependants: boolean;
  spouseIncome: number;
  dependentChildren: number;
  medicareExemptionDays: number;
  workerType: WorkerType;
  knowsTotalExpenses: boolean;
  totalExpensesAmount: number;
  expenses: WorkExpenses;
  hasStudentLoan: boolean;
  hasPrivateHospitalCover: boolean;
  medicareExempt: boolean | null;
}

export interface ExpenseBreakdown {
  workClothesPPEAndLaundry: number;
  toolsAndEquipment: number;
  phoneAndInternet: number;
  trainingTicketsAndLicences: number;
  workTravel: number;
  subscriptionsMembershipsAndUnionFees: number;
  donations: number;
  taxAgentOrSoftware: number;
  total: number;
}

export interface TaxBreakdown {
  brackets: { min: number; max: number | null; rate: number; taxInBracket: number }[];
  totalProgressiveTax: number;
}

export interface CalculationResult {
  financialYear: FinancialYear;
  taxResidency: TaxResidency;
  incomeBeforeTax: number;
  totalWorkExpenses: number;
  incomeAfterWorkExpenses: number;
  estimatedTax: number;
  lowIncomeTaxOffset: number;
  taxAfterOffsets: number;
  medicareAmount: number;
  medicareSurchargeIncome: number;
  medicareSurchargeAmount: number;
  studyLoanRepaymentIncome: number;
  studentLoanRepayment: number;
  totalTaxPayable: number;
  taxAlreadyTaken: number;
  estimatedRefundOrPayable: number;
  isRefund: boolean;
  expenseBreakdown: ExpenseBreakdown;
  taxBreakdown: TaxBreakdown;
  confidence: {
    level: "high" | "medium" | "lower";
    reasons: string[];
  };
}
