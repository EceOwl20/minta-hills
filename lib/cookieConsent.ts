export const COOKIE_CONSENT_KEY = "minta-hills:cookie-consent:v1";

export const COOKIE_CONSENT_EVENT = "minta-hills:consent-change";

export type CookieConsentValue = "accepted" | "rejected";

let sessionConsent: CookieConsentValue | null = null;

export function getCookieConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") return null;

  try {
    const value = window.localStorage.getItem(
      COOKIE_CONSENT_KEY
    );

    if (value === "accepted" || value === "rejected") {
      return value;
    }

    return sessionConsent;
  } catch {
    return sessionConsent;
  }
}

export function setCookieConsent(
  value: CookieConsentValue
): void {
  if (typeof window === "undefined") return;

  sessionConsent = value;

  try {
    window.localStorage.setItem(
      COOKIE_CONSENT_KEY,
      value
    );
  } catch {
    // Storage may be unavailable in some browsers.
  }

  window.dispatchEvent(
    new Event(COOKIE_CONSENT_EVENT)
  );
}

export function subscribeToCookieConsent(
  callback: () => void
): () => void {
  window.addEventListener("storage", callback);

  window.addEventListener(
    COOKIE_CONSENT_EVENT,
    callback
  );

  return () => {
    window.removeEventListener("storage", callback);

    window.removeEventListener(
      COOKIE_CONSENT_EVENT,
      callback
    );
  };
}