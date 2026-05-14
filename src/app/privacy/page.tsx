import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Privacy | Australian Tax Refund Calculator",
  description: "Privacy policy for the Australian Tax Refund Calculator.",
};

export default function PrivacyPage() {
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
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Privacy</h1>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                No account required
              </h2>
              <p>
                We do not require you to create an account or log in. The
                calculator works immediately without any sign-up.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                No data storage
              </h2>
              <p>
                We do not store your calculator entries in a database. All
                calculations happen in your browser. When you close the page,
                your data is gone.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Email usage
              </h2>
              <p>
                If you email yourself an estimate, your email address is used
                only to send that one estimate. We do not keep your email for
                marketing or any other purpose.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                No selling of information
              </h2>
              <p>
                We do not sell, trade, or share your tax information or email
                address with anyone.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Analytics
              </h2>
              <p>
                Basic anonymous analytics or advertising may be added in the
                future. No personal or tax data would be included.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Your comfort
              </h2>
              <p>
                You should not enter information you are uncomfortable sharing.
                If you prefer, you can download or print your estimate without
                providing any email address.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
