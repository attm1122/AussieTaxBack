import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Privacy | Aussie Tax Back",
  description: "Privacy policy for Aussie Tax Back.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <Link
            href="/"
            className="text-sm text-emerald-700 hover:underline mb-4 inline-block"
          >
            &larr; Back to calculator
          </Link>
          <h1 className="text-3xl font-bold text-slate-950 mb-6">Privacy</h1>

          <div className="space-y-6 text-slate-700">
            <section>
              <h2 className="text-lg font-semibold text-slate-950 mb-2">
                No account required
              </h2>
              <p>
                We do not require you to create an account or log in. The
                calculator works immediately without any sign-up.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-950 mb-2">
                Calculator entries
              </h2>
              <p>
                We do not store your calculator entries in a database. All
                calculations happen in your browser. When you close the page,
                your data is gone.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-950 mb-2">
                No tax file numbers
              </h2>
              <p>
                You should not enter tax file numbers, passport numbers, bank
                details, payslips, or other private identity documents into this
                site.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-950 mb-2">
                No selling of tax information
              </h2>
              <p>
                We do not sell your calculator entries or tax information. We
                do not ask for your tax file number, passport number, payslips,
                or bank details.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-950 mb-2">
                Google ads, cookies and analytics
              </h2>
              <p>
                This site may use analytics and advertising tools, including
                Google AdSense, after launch. Those services may use cookies or
                similar technology such as IP addresses, device identifiers, or
                browser information to measure visits, prevent fraud, limit ad
                repetition, and show ads.
              </p>
              <p className="mt-2">
                Third-party vendors, including Google, may use cookies to serve
                ads based on your visits to this site or other sites. Google and
                its partners may use advertising cookies to personalize ads when
                personalized ads are allowed.
              </p>
              <p className="mt-2">
                You can control Google ad personalization at{" "}
                <a
                  href="https://adssettings.google.com/"
                  className="font-medium text-emerald-700 hover:underline"
                >
                  Google Ad Settings
                </a>
                . You can also read{" "}
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  className="font-medium text-emerald-700 hover:underline"
                >
                  how Google uses data on partner sites
                </a>
                .
              </p>
              <p className="mt-2">
                Some users may also have privacy choices shown through Google
                consent or privacy messages, depending on their location and the
                advertising settings used on the site.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-950 mb-2">
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
