# Australian Tax Refund Calculator

A simple, fast, and accessible tax refund calculator for Australian workers.

**Live site:** [https://australian-tax-refund-calculator.vercel.app](https://australian-tax-refund-calculator.vercel.app)

## Features

- No login, no account, no dashboard
- Simple form-first design
- Instant estimate as you type
- Plain English (no ATO jargon)
- 8 guided work expense categories
- Configurable tax rates by financial year
- Copy, print, download, and email your estimate
- Mobile-first responsive design
- Full keyboard accessibility
- SEO-optimized with Schema.org structured data

## Tech Stack

- **Framework:** Next.js 14 (App Router, static export)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Forms:** React Hook Form + Zod validation
- **Testing:** Jest + Testing Library

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
```

Static files are exported to the `out/` directory.

### Run tests

```bash
npm run test
```

### Run TypeScript checks

```bash
npm run typecheck
```

## Project Structure

```
src/
├── app/                          # Next.js pages
│   ├── page.tsx                  # Home page (calculator + SEO content)
│   ├── layout.tsx                # Root layout with metadata
│   ├── globals.css               # Tailwind + print styles
│   ├── privacy/page.tsx          # Privacy policy
│   ├── disclaimer/page.tsx       # Disclaimer
│   ├── api/email-estimate/route.ts # Email API stub
│   └── SEOContent.tsx            # FAQ, links, how-it-works
├── components/
│   ├── calculator/
│   │   ├── TaxRefundCalculator.tsx   # Main form container
│   │   ├── IncomeSection.tsx         # Income inputs
│   │   ├── QuickExpensesSection.tsx  # Quick vs guided toggle
│   │   ├── GuidedExpensesSection.tsx # 8 expense categories
│   │   ├── ExpenseCard.tsx           # Reusable category card
│   │   ├── StudentLoanMedicareSection.tsx
│   │   ├── ResultCard.tsx            # Result display
│   │   └── SaveCalculationActions.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── AdPlaceholder.tsx
├── lib/
│   └── tax/
│       ├── types.ts              # All TypeScript interfaces
│       ├── tax-config.ts         # Tax rates by financial year
│       ├── calculate-tax.ts      # Calculation engine
│       ├── format.ts             # AUD formatting
│       └── index.ts              # Public API exports
└── lib/__tests__/
    └── tax-calculation.test.ts   # 36 unit tests
```

## Updating Tax Rates

Tax rates are stored in `src/lib/tax/tax-config.ts`:

```typescript
export const taxYearsConfig: Record<FinancialYear, TaxYearConfig> = {
  "2025-26": {
    residentRates: [
      { min: 0, max: 18200, base: 0, rate: 0 },
      { min: 18201, max: 45000, base: 0, rate: 0.16 },
      // ...
    ],
    medicareRate: 0.02,
  },
};
```

To add a new financial year, add a new entry to this config object. The calculator UI will automatically pick it up.

## Updating Official ATO Links

Helpful ATO links are stored in `src/app/SEOContent.tsx`:

```typescript
const helpfulLinks = [
  { label: "Work clothing and laundry expenses", href: "https://www.ato.gov.au/..." },
  // ...
];
```

## Configuring Email Sending

The email API stub at `src/app/api/email-estimate/route.ts` is ready for integration with providers like Resend or SendGrid.

To enable email:

1. Set the `EMAIL_PROVIDER` environment variable
2. Add your provider's API key
3. Implement the send logic in the route handler

```typescript
const emailProvider = process.env.EMAIL_PROVIDER;
// Add your provider integration here
```

## Plain Language Guide

This project uses plain English throughout the user interface:

| We Use | We Avoid |
|--------|----------|
| Work expenses | Deductions |
| Tax already taken from your pay | Tax withheld |
| Income after work expenses | Taxable income |
| Student loan repayment | HELP/HECS repayment |
| Medicare amount | Medicare levy |
| Paid back by your employer | Reimbursed |
| Records or receipts | Substantiation |

## Privacy Notes

- No account or login required
- No calculator data stored in a database
- Email addresses used only for sending estimates
- No selling or sharing of information

## Disclaimer

This calculator provides general estimates only. It is not financial, legal, or tax advice. It is not affiliated with the Australian Taxation Office. For official assessments, consult the ATO or a registered tax agent.

## License

MIT
