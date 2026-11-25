"use client";

import { useTransition } from "react";
import { hasLocale, useLocale } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

import { getLocalizedBlogPathname } from "@/lib/blogRouting";

type Props = {
  label: string;
};

export default function LanguageSwitcher({ label }: Props) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  function handleLanguageChange(value: string) {
    if (!hasLocale(routing.locales, value)) return;
    if (!hasLocale(routing.locales, locale)) return;

    const nextLocale = value;

    if (nextLocale === locale) return;

    const localizedPathname = getLocalizedBlogPathname(
      pathname,
      locale,
      nextLocale
    );

    const currentUrl =
      localizedPathname +
      window.location.search +
      window.location.hash;

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