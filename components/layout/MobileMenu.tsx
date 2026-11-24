"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";

import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/data/site";
import type { MobileMenuProps } from "@/types/navigation";

import LanguageSwitcher from "./LanguageSwitcher";

export default function MobileMenu({
  open,
  onClose,
  items,
  pathname,
  labels,
}: MobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const locale = useLocale();

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function isActive(href: string) {
    return (
      pathname === href ||
      (href !== "/" && pathname.startsWith(`${href}/`))
    );
  }

  return (
    <dialog
      ref={dialogRef}
      id="mobile-menu"
      aria-label={labels.mobileMenu}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      className="
        fixed inset-y-0 left-0 right-auto
        m-0 h-dvh max-h-dvh
        w-full max-w-[520px]
        overflow-y-auto overscroll-contain
        border-0 bg-[#171717] p-0 text-white
        backdrop:bg-black/55
        open:animate-menu-enter
        motion-reduce:animate-none
      "
    >
      <div
        className="
          flex min-h-full flex-col
          px-6 pb-7 pt-5
          sm:px-11 sm:pb-10 sm:pt-7
        "
      >
        {/* Menu header */}
        <div
          className="
            flex items-center justify-between gap-3
            border-b border-white/20 pb-6
          "
        >
          <span className="text-[10px] tracking-[0.18em]">
            MINTA HILLS
          </span>

          <div className="flex items-center gap-3">
            <LanguageSwitcher label={labels.chooseLanguage} />

            <button
              type="button"
              aria-label={labels.closeMenu}
              onClick={onClose}
              className="
                grid size-[42px] place-items-center
                rounded-full border border-white/30
                text-[27px] font-light leading-none
                transition-colors
                hover:bg-white hover:text-brand-dark
              "
            >
              ×
            </button>
          </div>
        </div>

        {/* Navigation links */}
        <nav
          aria-label={labels.mobileMenu}
          className="my-auto grid py-6"
        >
          {items.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={
                isActive(item.href) ? "page" : undefined
              }
              onClick={onClose}
              className="
                flex items-center justify-between gap-3
                border-b border-white/15 py-[13px]
                text-[clamp(24px,7vw,40px)]
                font-light capitalize leading-[1.15]
                tracking-tight
                transition-all duration-200
                hover:pl-2
                motion-reduce:transition-none
              "
            >
              <span>
                {item.label.toLocaleLowerCase(locale)}
              </span>

              <span
                className="
                  shrink-0 text-[10px] font-normal
                  tracking-widest text-white/50
                "
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </Link>
          ))}
        </nav>

        {/* Menu footer */}
        <div
          className="
            flex flex-wrap justify-between gap-4
            border-t border-white/20 pt-6
            text-[11px] tracking-wider
          "
        >
          <a href={siteConfig.phone.href}>
            {siteConfig.phone.display}
          </a>

          <Link
            href={siteConfig.reservation.href}
            onClick={onClose}
          >
            {labels.reservation}
          </Link>
        </div>
      </div>
    </dialog>
  );
}