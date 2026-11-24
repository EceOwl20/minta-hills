"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";

import {
  getCookieConsent,
  setCookieConsent,
  subscribeToCookieConsent,
} from "@/lib/cookieConsent";

function getServerSnapshot() {
  return "pending" as const;
}

export default function CookieConsent() {
  const t = useTranslations("CookieConsent");

  const consent = useSyncExternalStore(
    subscribeToCookieConsent,
    getCookieConsent,
    getServerSnapshot
  );

  // Wait until the client preference is available.
  if (consent === "pending" || consent !== null) {
    return null;
  }

  return (
    <aside
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
      className="
        fixed bottom-3 left-3 z-[120]
        w-[calc(100%-24px)] max-w-[300px]
        border-t-2 border-brand-dark
        bg-white px-4 pb-[15px] pt-[14px]
        text-brand-dark
        shadow-[0_10px_30px_rgba(0,0,0,0.14)]

        md:bottom-[18px] md:left-[18px]
      "
    >
      {/* Cookie notice heading */}
      <h2
        id="cookie-consent-title"
        className="
          mb-[5px] text-[9px] font-semibold
          leading-relaxed tracking-[0.16em]
        "
      >
        {t("title")}
      </h2>

      {/* Description */}
      <p
        id="cookie-consent-description"
        className="
          mb-[11px] text-[10px]
          font-normal leading-[1.65]
          text-text-body
        "
      >
        {t("description")}
      </p>

      {/* Consent actions */}
      <div className="grid grid-cols-2 gap-1.5">
        <button
          type="button"
          onClick={() => setCookieConsent("accepted")}
          className="
            min-h-[32px] rounded-full
            border border-brand-dark
            bg-brand-dark px-3 py-2

            text-[8px] font-semibold
            leading-relaxed tracking-[0.1em]
            text-white

            transition-colors duration-200
            hover:bg-white hover:text-brand-dark
            motion-reduce:transition-none
          "
        >
          {t("accept")}
        </button>

        <button
          type="button"
          onClick={() => setCookieConsent("rejected")}
          className="
            min-h-[32px] rounded-full
            border border-brand-dark
            bg-white px-3 py-2

            text-[8px] font-semibold
            leading-relaxed tracking-[0.1em]
            text-brand-dark

            transition-colors duration-200
            hover:bg-brand-dark hover:text-white
            motion-reduce:transition-none
          "
        >
          {t("reject")}
        </button>
      </div>
    </aside>
  );
}