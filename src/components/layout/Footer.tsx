import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <p className="text-xs text-gray-500 mb-3">
          This website is independent and is not affiliated with the Australian Taxation Office.
        </p>
        <p className="text-xs text-gray-500 mb-4">
          This is only an estimate. It is not tax advice and it is not an official ATO calculator. Your final tax refund may be different depending on your full income, records, private health cover, student loan, offsets and ATO assessment.
        </p>
        <div className="flex gap-4 text-sm">
          <Link href="/privacy/" className="text-green-700 hover:underline">
            Privacy
          </Link>
          <Link href="/disclaimer/" className="text-green-700 hover:underline">
            Disclaimer
          </Link>
        </div>
      </div>
    </footer>
  );
}
