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
    medicareRate: 0.02,
  },
  "2024-25": {
    residentRates: [
      { min: 0, max: 18200, base: 0, rate: 0 },
      { min: 18201, max: 45000, base: 0, rate: 0.16 },
      { min: 45001, max: 135000, base: 4288, rate: 0.30 },
      { min: 135001, max: 190000, base: 31288, rate: 0.37 },
      { min: 190001, max: null, base: 51638, rate: 0.45 },
    ],
    medicareRate: 0.02,
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
