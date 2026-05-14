import { FinancialYear, TaxYearConfig, WorkerType } from "./types";

/**
 * Tax configuration by financial year.
 * Rates are isolated here for easy annual updates.
 * Sources: ATO individual income tax rates (Stage 3 tax cuts effective 2024-25).
 */
export const taxYearsConfig: Record<FinancialYear, TaxYearConfig> = {
  "2025-26": {
    residentRates: [
      { min: 0, max: 18200, base: 0, rate: 0 },
      { min: 18201, max: 45000, base: 0, rate: 0.16 },
      { min: 45001, max: 135000, base: 4288, rate: 0.30 },
      { min: 135001, max: 190000, base: 31288, rate: 0.37 },
      { min: 190001, max: null, base: 51638, rate: 0.45 },
    ],
    workingHolidayMakerRates: [
      { min: 0, max: 45000, base: 0, rate: 0.15 },
      { min: 45001, max: 135000, base: 6750, rate: 0.30 },
      { min: 135001, max: 190000, base: 33750, rate: 0.37 },
      { min: 190001, max: null, base: 54100, rate: 0.45 },
    ],
    foreignResidentRates: [
      { min: 0, max: 135000, base: 0, rate: 0.30 },
      { min: 135001, max: 190000, base: 40500, rate: 0.37 },
      { min: 190001, max: null, base: 60850, rate: 0.45 },
    ],
    medicareRate: 0.02,
    medicareSingleLowerThreshold: 27222,
    medicareSingleUpperThreshold: 34027,
    medicareFamilyUpperThreshold: 57383,
    medicareFamilyChildAddOn: 5270,
    medicareSurchargeSingleThresholds: {
      tier1: 101000,
      tier2: 118000,
      tier3: 158000,
    },
    medicareSurchargeFamilyThresholds: {
      tier1: 202000,
      tier2: 236000,
      tier3: 316000,
    },
    medicareSurchargeFamilyChildAddOn: 1500,
    studyLoanUsesMarginalRates: true,
    studyLoanRates: [
      { min: 0, max: 67000, base: 0, rate: 0 },
      { min: 67001, max: 125000, base: 0, rate: 0.15 },
      { min: 125001, max: 179285, base: 8700, rate: 0.17 },
      { min: 179286, max: null, base: 0, rate: 0.10 },
    ],
    lowIncomeTaxOffset: {
      maximumOffset: 700,
      fullOffsetThreshold: 37500,
      firstTaperThreshold: 45000,
      firstTaperRate: 0.05,
      secondTaperThreshold: 66667,
      secondTaperRate: 0.015,
    },
  },
  "2024-25": {
    residentRates: [
      { min: 0, max: 18200, base: 0, rate: 0 },
      { min: 18201, max: 45000, base: 0, rate: 0.16 },
      { min: 45001, max: 135000, base: 4288, rate: 0.30 },
      { min: 135001, max: 190000, base: 31288, rate: 0.37 },
      { min: 190001, max: null, base: 51638, rate: 0.45 },
    ],
    workingHolidayMakerRates: [
      { min: 0, max: 45000, base: 0, rate: 0.15 },
      { min: 45001, max: 135000, base: 6750, rate: 0.30 },
      { min: 135001, max: 190000, base: 33750, rate: 0.37 },
      { min: 190001, max: null, base: 54100, rate: 0.45 },
    ],
    foreignResidentRates: [
      { min: 0, max: 135000, base: 0, rate: 0.30 },
      { min: 135001, max: 190000, base: 40500, rate: 0.37 },
      { min: 190001, max: null, base: 60850, rate: 0.45 },
    ],
    medicareRate: 0.02,
    medicareSingleLowerThreshold: 27222,
    medicareSingleUpperThreshold: 34027,
    medicareFamilyUpperThreshold: 57383,
    medicareFamilyChildAddOn: 5270,
    medicareSurchargeSingleThresholds: {
      tier1: 97000,
      tier2: 113000,
      tier3: 151000,
    },
    medicareSurchargeFamilyThresholds: {
      tier1: 194000,
      tier2: 226000,
      tier3: 302000,
    },
    medicareSurchargeFamilyChildAddOn: 1500,
    studyLoanUsesMarginalRates: false,
    studyLoanRates: [
      { min: 0, max: 54434, base: 0, rate: 0 },
      { min: 54435, max: 62850, base: 0, rate: 0.01 },
      { min: 62851, max: 66620, base: 0, rate: 0.02 },
      { min: 66621, max: 70618, base: 0, rate: 0.025 },
      { min: 70619, max: 74855, base: 0, rate: 0.03 },
      { min: 74856, max: 79346, base: 0, rate: 0.035 },
      { min: 79347, max: 84107, base: 0, rate: 0.04 },
      { min: 84108, max: 89154, base: 0, rate: 0.045 },
      { min: 89155, max: 94503, base: 0, rate: 0.05 },
      { min: 94504, max: 100174, base: 0, rate: 0.055 },
      { min: 100175, max: 106185, base: 0, rate: 0.06 },
      { min: 106186, max: 112556, base: 0, rate: 0.065 },
      { min: 112557, max: 119309, base: 0, rate: 0.07 },
      { min: 119310, max: 126467, base: 0, rate: 0.075 },
      { min: 126468, max: 134056, base: 0, rate: 0.08 },
      { min: 134057, max: 142100, base: 0, rate: 0.085 },
      { min: 142101, max: 150626, base: 0, rate: 0.09 },
      { min: 150627, max: 159663, base: 0, rate: 0.095 },
      { min: 159664, max: null, base: 0, rate: 0.10 },
    ],
    lowIncomeTaxOffset: {
      maximumOffset: 700,
      fullOffsetThreshold: 37500,
      firstTaperThreshold: 45000,
      firstTaperRate: 0.05,
      secondTaperThreshold: 66667,
      secondTaperRate: 0.015,
    },
  },
};

export const workerTypeLabels: Record<WorkerType, string> = {
  "full-time": "Full-time or part-time employee",
  casual: "Casual worker",
  "fifo-dido": "FIFO or DIDO worker",
  "multiple-jobs": "More than one job",
  "apprentice-trainee": "Apprentice or trainee",
  contractor: "Contractor",
};

/** ATO cents-per-kilometre rate for car expenses (max 5,000 business km) */
export const kilometerRate2024_25 = 0.88;
export const kilometerRate2025_26 = 0.88;
