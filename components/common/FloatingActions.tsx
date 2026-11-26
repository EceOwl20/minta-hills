"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";

import {
  getCookieConsent,
  subscribeToCookieConsent,
} from "@/lib/cookieConsent";

const SCROLL_THRESHOLD = 500;

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, {
    passive: true,
  });

  return () => {
    window.removeEventListener("scroll", callback);
  };
}

function getScrollSnapshot() {
  return window.scrollY > SCROLL_THRESHOLD;
}

function getServerSnapshot() {
  return false;
}

function getServerConsentSnapshot() {
  return "pending" as const;
}

export default function FloatingActions() {
  const t = useTranslations("FloatingActions");

  const showBackToTop = useSyncExternalStore(
    subscribeToScroll,
    getScrollSnapshot,
    getServerSnapshot
  );

  const consent = useSyncExternalStore(
    subscribeToCookieConsent,
    getCookieConsent,
    getServerConsentSnapshot
  );

  const isCookieBannerVisible = consent === null;

  function handleBackToTop() {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "instant" : "smooth",
    });
  }

  return (
    <div
      className={`
        fixed right-7 z-[90] bottom-[106px]
        flex flex-col items-center gap-3

        transition-[bottom] duration-300 ease-out
        motion-reduce:transition-none

        md:bottom-28 md:right-6

        ${isCookieBannerVisible ? "bottom-[220px]" : "bottom-3.5"}
      `}
    >
      {/* Back to top */}
      {showBackToTop && (
        <button
          type="button"
          aria-label={t("backToTop")}
          title={t("backToTop")}
          onClick={handleBackToTop}
          className="
            grid size-10 md:size-12 place-items-center
            rounded-full border border-black/10
            bg-white text-brand-dark

            shadow-[0_4px_20px_rgba(0,0,0,0.12)]

            transition-colors duration-200
            hover:bg-brand-dark hover:text-white
            motion-reduce:transition-none
          "
        >
          <svg
            width={17}
            height={17}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 19V5M7 10l5-5 5 5" />
          </svg>
        </button>
      )}
    </div>
  );
}
