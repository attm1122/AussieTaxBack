import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TaxRefundCalculator from "@/components/calculator/TaxRefundCalculator";
import { SEOContent } from "./SEOContent";
import { AdPlaceholder } from "@/components/AdPlaceholder";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-white border-b border-gray-200 py-10">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Australian Tax Refund Calculator
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Estimate your tax refund or tax bill in plain English.
            </p>
            <p className="text-sm text-gray-500">
              Built for employees, casual workers, FIFO workers and people with
              more than one job.
            </p>
            <a
              href="#calculator"
              className="no-print inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition-colors"
            >
              Start calculator
            </a>
          </div>
        </section>

        {/* Calculator */}
        <section id="calculator" className="py-8">
          <div className="max-w-3xl mx-auto px-4">
            <TaxRefundCalculator />
            <AdPlaceholder />
          </div>
        </section>

        {/* SEO Content */}
        <section className="bg-white border-t border-gray-200 py-10">
          <div className="max-w-3xl mx-auto px-4">
            <SEOContent />
            <AdPlaceholder />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
