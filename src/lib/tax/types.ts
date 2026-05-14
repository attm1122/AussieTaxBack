export type FinancialYear = "2024-25" | "2025-26";

export type WorkerType =
  | "full-time"
  | "casual"
  | "fifo-dido"
  | "multiple-jobs"
  | "apprentice-trainee"
  | "contractor";

export interface TaxBracket {
  min: number;
  max: number | null;
  base: number;
  rate: number;
}

export interface TaxYearConfig {
  residentRates: TaxBracket[];
  medicareRate: number;
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
  incomeBeforeTax: number;
  taxPaid: number;
  workerType: WorkerType;
  knowsTotalExpenses: boolean;
  totalExpensesAmount: number;
  expenses: WorkExpenses;
  hasStudentLoan: boolean;
  studentLoanRepayment: number;
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
  incomeBeforeTax: number;
  totalWorkExpenses: number;
  incomeAfterWorkExpenses: number;
  estimatedTax: number;
  medicareAmount: number;
  studentLoanRepayment: number;
  totalTaxPayable: number;
  taxAlreadyTaken: number;
  estimatedRefundOrPayable: number;
  isRefund: boolean;
  expenseBreakdown: ExpenseBreakdown;
  taxBreakdown: TaxBreakdown;
}
