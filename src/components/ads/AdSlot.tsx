"use client";

import { useEffect } from "react";

type AdPlacement = "top" | "result" | "content" | "article" | "footer";

const adSlots: Record<AdPlacement, string | undefined> = {
  top: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP || "1417115917",
  result: process.env.NEXT_PUBLIC_ADSENSE_SLOT_RESULT || "5746024577",
  content: process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT || "6867534556",
  article: process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE || "4411550150",
  footer: process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER || "3896544831",
};

const adsenseClient =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-1045059001611132";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdSlotProps {
  placement: AdPlacement;
  className?: string;
}

export default function AdSlot({ placement, className = "" }: AdSlotProps) {
  const client = adsenseClient;
  const slot = adSlots[placement];

  useEffect(() => {
    if (!client || !slot) {
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Ad blockers and local dev can block AdSense. The page should still work.
    }
  }, [client, slot]);

  if (!client || !slot) {
    return null;
  }

  return (
    <aside
      className={`no-print mx-auto w-full max-w-4xl overflow-hidden rounded-lg border border-slate-200 bg-white p-3 text-center shadow-sm ${className}`}
      aria-label="Advertisement"
    >
      <p className="mb-2 text-[11px] uppercase tracking-wide text-slate-400">
        Advertisement
      </p>
      <ins
        className="adsbygoogle block min-h-64"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
