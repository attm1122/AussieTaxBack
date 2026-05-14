import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Contact | Aussie Tax Back",
  description: "Contact information for Aussie Tax Back.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <Link href="/" className="mb-5 inline-block text-sm font-medium text-emerald-700">
            Back to calculator
          </Link>
          <h1 className="text-3xl font-bold text-slate-950">Contact</h1>
          <div className="mt-6 space-y-5 text-slate-700">
            <p>
              For feedback, corrections, or suggestions, use the GitHub project
              while this site is in early development.
            </p>
            <p>
              GitHub:{" "}
              <a
                href="https://github.com/attm1122/AussieTaxBack"
                className="font-medium text-emerald-700 hover:underline"
              >
                AussieTaxBack
              </a>
            </p>
            <p>
              Do not send private tax file numbers, payslips, passport details,
              bank details, or other sensitive personal information.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
