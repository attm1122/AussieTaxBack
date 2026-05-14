import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Disclaimer | Australian Tax Refund Calculator",
  description: "Disclaimer for the Australian Tax Refund Calculator.",
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <Link
            href="/"
            className="text-sm text-green-700 hover:underline mb-4 inline-block"
          >
            &larr; Back to calculator
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Disclaimer</h1>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                General estimates only
              </h2>
              <p>
                This website provides general estimates only. The calculations
                are based on the information you enter and standard Australian
                tax rates.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Not professional advice
              </h2>
              <p>
                This site does not provide financial, legal, or tax advice. It
                is a tool to help you estimate your tax position.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Not affiliated with the ATO
              </h2>
              <p>
                This website is independent and is not affiliated with the
                Australian Taxation Office. Only the ATO can provide official
                tax assessments.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Check official guidance
              </h2>
              <p>
                You should check official ATO guidance or speak with a
                registered tax agent for advice about your specific situation.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Personal circumstances vary
              </h2>
              <p>
                Tax outcomes depend on your personal circumstances, including
                your full income, deductions, offsets, private health cover,
                student loans, and other factors that this simple calculator may
                not capture.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
