import {
  calculateTaxForIncome,
  calculateCategoryTotal,
  calculateWorkTravelTotal,
  calculateResult,
} from "../tax/calculate-tax";
import { taxYearsConfig } from "../tax/tax-config";
import { CalculatorInput } from "../tax/types";

describe("calculateTaxForIncome", () => {
  const config = taxYearsConfig["2025-26"];

  it("returns 0 tax for income at tax-free threshold ($18,200)", () => {
    const result = calculateTaxForIncome(18200, config);
    expect(result.tax).toBe(0);
  });

  it("returns 0 tax for income below tax-free threshold", () => {
    const result = calculateTaxForIncome(10000, config);
    expect(result.tax).toBe(0);
  });

  it("calculates tax correctly at $45,000 bracket boundary", () => {
    const result = calculateTaxForIncome(45000, config);
    // Base $0 + ($45,000 - $18,201 + 1) * 0.16 = $26,800 * 0.16 = $4,288
    expect(result.tax).toBe(4288);
  });

  it("calculates tax correctly at $135,000 bracket boundary", () => {
    const result = calculateTaxForIncome(135000, config);
    // $4,288 + ($135,000 - $45,001 + 1) * 0.30 = $4,288 + $90,000 * 0.30 = $4,288 + $27,000 = $31,288
    expect(result.tax).toBe(31288);
  });

  it("calculates tax correctly at $190,000 bracket boundary", () => {
    const result = calculateTaxForIncome(190000, config);
    // $31,288 + ($190,000 - $135,001 + 1) * 0.37 = $31,288 + $55,000 * 0.37 = $31,288 + $20,350 = $51,638
    expect(result.tax).toBe(51638);
  });

  it("calculates tax correctly for high income ($200,000)", () => {
    const result = calculateTaxForIncome(200000, config);
    // $51,638 + ($200,000 - $190,001 + 1) * 0.45 = $51,638 + $10,000 * 0.45 = $51,638 + $4,500 = $56,138
    expect(result.tax).toBe(56138);
  });

  it("returns 0 for $0 income", () => {
    const result = calculateTaxForIncome(0, config);
    expect(result.tax).toBe(0);
  });

  it("returns a positive tax for income above $18,200", () => {
    const result = calculateTaxForIncome(30000, config);
    expect(result.tax).toBeGreaterThan(0);
  });

  it("includes a breakdown with the same number of brackets as config", () => {
    const result = calculateTaxForIncome(50000, config);
    expect(result.breakdown.brackets.length).toBe(config.residentRates.length);
  });
});

describe("calculateCategoryTotal", () => {
  it("returns full amount when no employer reimbursement and 100% work use", () => {
    expect(calculateCategoryTotal(500, 0, 100)).toBe(500);
  });

  it("subtracts employer reimbursement", () => {
    expect(calculateCategoryTotal(500, 200, 100)).toBe(300);
  });

  it("applies work-use percentage", () => {
    expect(calculateCategoryTotal(1000, 0, 50)).toBe(500);
  });

  it("applies both reimbursement and percentage", () => {
    expect(calculateCategoryTotal(1000, 200, 50)).toBe(400);
  });

  it("never returns negative when employer paid more than spent", () => {
    expect(calculateCategoryTotal(100, 200, 100)).toBe(0);
  });

  it("returns 0 for 0% work use", () => {
    expect(calculateCategoryTotal(1000, 0, 0)).toBe(0);
  });

  it("clamps percentage above 100 to 100", () => {
    expect(calculateCategoryTotal(1000, 0, 150)).toBe(1000);
  });

  it("clamps negative percentage to 0", () => {
    expect(calculateCategoryTotal(1000, 0, -10)).toBe(0);
  });
});

describe("calculateWorkTravelTotal", () => {
  it("calculates car costs from kilometres", () => {
    const expenses = createExpenses({ carKilometres: 1000 });
    expect(calculateWorkTravelTotal(expenses, "2025-26")).toBe(880);
  });

  it("caps car kilometres at 5,000", () => {
    const expenses = createExpenses({ carKilometres: 10000 });
    expect(calculateWorkTravelTotal(expenses, "2025-26")).toBe(4400);
  });

  it("includes other travel costs", () => {
    const expenses = createExpenses({
      carKilometres: 0,
      otherTravelCosts: 500,
    });
    expect(calculateWorkTravelTotal(expenses, "2025-26")).toBe(500);
  });

  it("includes accommodation and meals", () => {
    const expenses = createExpenses({
      carKilometres: 0,
      accommodation: 300,
      mealsWhileAway: 200,
    });
    expect(calculateWorkTravelTotal(expenses, "2025-26")).toBe(500);
  });

  it("subtracts employer reimbursement", () => {
    const expenses = createExpenses({
      carKilometres: 1000,
      travelEmployerPaid: 400,
    });
    expect(calculateWorkTravelTotal(expenses, "2025-26")).toBe(480);
  });

  it("never returns negative", () => {
    const expenses = createExpenses({
      carKilometres: 0,
      travelEmployerPaid: 1000,
    });
    expect(calculateWorkTravelTotal(expenses, "2025-26")).toBe(0);
  });
});

describe("calculateResult", () => {
  it("calculates a refund when tax paid exceeds total tax payable", () => {
    const input = createInput({
      incomeBeforeTax: 60000,
      taxPaid: 15000,
      knowsTotalExpenses: true,
      totalExpensesAmount: 1000,
    });
    const result = calculateResult(input);
    expect(result.isRefund).toBe(true);
    expect(result.estimatedRefundOrPayable).toBeGreaterThan(0);
  });

  it("calculates amount to pay when tax paid is less than total tax payable", () => {
    const input = createInput({
      incomeBeforeTax: 60000,
      taxPaid: 1000,
      knowsTotalExpenses: true,
      totalExpensesAmount: 0,
    });
    const result = calculateResult(input);
    expect(result.isRefund).toBe(false);
    expect(result.estimatedRefundOrPayable).toBeLessThan(0);
  });

  it("excludes Medicare when user is exempt", () => {
    const inputWithMedicare = createInput({
      incomeBeforeTax: 60000,
      taxPaid: 0,
      medicareExempt: false,
    });
    const inputWithoutMedicare = createInput({
      incomeBeforeTax: 60000,
      taxPaid: 0,
      medicareExempt: true,
    });
    const resultWith = calculateResult(inputWithMedicare);
    const resultWithout = calculateResult(inputWithoutMedicare);
    expect(resultWithout.medicareAmount).toBe(0);
    expect(resultWith.medicareAmount).toBeGreaterThan(0);
  });

  it("uses quick total expenses when user knows the total", () => {
    const input = createInput({
      incomeBeforeTax: 60000,
      knowsTotalExpenses: true,
      totalExpensesAmount: 5000,
    });
    const result = calculateResult(input);
    expect(result.totalWorkExpenses).toBe(5000);
  });

  it("sums guided expenses when user does not know the total", () => {
    const input = createInput({
      incomeBeforeTax: 60000,
      knowsTotalExpenses: false,
      expenses: {
        ...createExpenses({}),
        workClothesAmount: 500,
        toolsAmount: 1000,
      },
    });
    const result = calculateResult(input);
    expect(result.totalWorkExpenses).toBe(1500);
  });

  it("includes student loan repayment when applicable", () => {
    const input = createInput({
      incomeBeforeTax: 60000,
      hasStudentLoan: true,
      studentLoanRepayment: 2000,
    });
    const result = calculateResult(input);
    expect(result.studentLoanRepayment).toBe(2000);
    expect(result.totalTaxPayable).toBe(
      result.estimatedTax + result.medicareAmount + 2000
    );
  });

  it("excludes student loan repayment when not applicable", () => {
    const input = createInput({
      incomeBeforeTax: 60000,
      hasStudentLoan: false,
      studentLoanRepayment: 2000,
    });
    const result = calculateResult(input);
    expect(result.studentLoanRepayment).toBe(0);
  });

  it("never allows negative income after expenses", () => {
    const input = createInput({
      incomeBeforeTax: 5000,
      knowsTotalExpenses: true,
      totalExpensesAmount: 10000,
    });
    const result = calculateResult(input);
    expect(result.incomeAfterWorkExpenses).toBe(0);
  });

  it("works for casual worker type", () => {
    const input = createInput({
      incomeBeforeTax: 45000,
      taxPaid: 8000,
      workerType: "casual",
    });
    const result = calculateResult(input);
    expect(result.incomeAfterWorkExpenses).toBeGreaterThanOrEqual(0);
  });

  it("works for FIFO worker type", () => {
    const input = createInput({
      incomeBeforeTax: 120000,
      taxPaid: 30000,
      workerType: "fifo-dido",
    });
    const result = calculateResult(input);
    expect(result.incomeAfterWorkExpenses).toBeGreaterThanOrEqual(0);
  });

  it("applies work-use percentage to expense categories", () => {
    const input = createInput({
      incomeBeforeTax: 60000,
      knowsTotalExpenses: false,
      expenses: {
        ...createExpenses({}),
        phoneYearlyCost: 1200,
        phoneWorkPercentage: 50,
      },
    });
    const result = calculateResult(input);
    expect(result.expenseBreakdown.phoneAndInternet).toBe(600);
  });

  it("returns zero refund when tax paid equals total tax payable exactly", () => {
    // At $18,200 income: tax=0, medicare=0 (exempt), total=0
    const input = createInput({
      incomeBeforeTax: 18200,
      taxPaid: 0,
      knowsTotalExpenses: true,
      totalExpensesAmount: 0,
      medicareExempt: true,
    });
    const result = calculateResult(input);
    expect(result.estimatedRefundOrPayable).toBe(0);
  });

  it("produces correct progressive tax for mid-bracket income", () => {
    // $50,000 income: $4,288 base + ($50,000 - $45,001 + 1) * 0.30
    // = $4,288 + $5,000 * 0.30 = $4,288 + $1,500 = $5,788
    const input = createInput({
      incomeBeforeTax: 50000,
      taxPaid: 0,
      knowsTotalExpenses: true,
      totalExpensesAmount: 0,
    });
    const result = calculateResult(input);
    expect(result.estimatedTax).toBe(5788);
  });
});

// Test helpers

function createExpenses(
  overrides: Partial<CalculatorInput["expenses"]>
): CalculatorInput["expenses"] {
  return {
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
    ...overrides,
  };
}

function createInput(
  overrides: Partial<CalculatorInput>
): CalculatorInput {
  return {
    financialYear: "2025-26",
    incomeBeforeTax: 0,
    taxPaid: 0,
    workerType: "full-time",
    knowsTotalExpenses: true,
    totalExpensesAmount: 0,
    expenses: createExpenses({}),
    hasStudentLoan: false,
    studentLoanRepayment: 0,
    hasPrivateHospitalCover: false,
    medicareExempt: null,
    ...overrides,
  };
}
