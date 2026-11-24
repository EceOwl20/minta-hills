"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

type Props = {
  label: string;
};

export default function LanguageSwitcher({ label }: Props) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  function handleLanguageChange(value: string) {
    if (!routing.locales.includes(value as Locale)) return;

    const nextLocale = value as Locale;

    if (nextLocale === locale) return;

    const currentUrl = pathname + window.location.search + window.location.hash;

    startTransition(() => {
      router.replace(currentUrl, {
        locale: nextLocale,
      });
    });
  }

  return (
    <div className="relative shrink-0">
      <select
        aria-label={label}
        value={locale}
        disabled={isPending}
        onChange={(event) => handleLanguageChange(event.target.value)}
        className="
          h-[34px] w-[58px] appearance-none
          rounded-full border border-white/50
          bg-black/20 pl-3 pr-5
          !text-[10px] font-medium tracking-wider text-white
          cursor-pointer
          disabled:cursor-wait disabled:opacity-60
        "
      >
        {routing.locales.map((language) => (
          <option
            key={language}
            value={language}
            className="bg-brand-dark text-white"
          >
            {language.toUpperCase()}
          </option>
        ))}
      </select>

      <svg
        width={10}
        height={10}
        aria-hidden="true"
        viewBox="0 0 16 16"
        fill="none"
        className="
    pointer-events-none absolute right-2 top-1/2
    h-[10px] w-[10px] -translate-y-1/2
  "
      >
        <path
          d="M4 6L8 10L12 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
