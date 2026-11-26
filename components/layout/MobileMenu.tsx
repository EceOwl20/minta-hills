"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";

import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/data/site";
import { getReservationUrl } from "@/lib/reservation";

import type { MobileMenuProps } from "@/types/navigation";

import LanguageSwitcher from "./LanguageSwitcher";

const ANIMATION_DURATION = 450;

export default function MobileMenu({
  open,
  onClose,
  items,
  pathname,
  labels,
}: MobileMenuProps) {
  const locale = useLocale();

  const reservationHref = getReservationUrl(locale);

  const dialogRef = useRef<HTMLDialogElement>(null);

  // Open and close the dialog with animation.
  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    let closeTimeout: number | undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (open) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      if (reducedMotion) {
        dialog.close();
      } else {
        closeTimeout = window.setTimeout(() => {
          if (dialog.open) {
            dialog.close();
          }
        }, ANIMATION_DURATION);
      }
    }

    return () => {
      window.clearTimeout(closeTimeout);
    };
  }, [open]);

  // Keep background scrolling locked until the dialog closes.
  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog || !open) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function restoreScroll() {
      document.body.style.overflow = previousOverflow;
    }

    dialog.addEventListener("close", restoreScroll);

    return () => {
      dialog.removeEventListener("close", restoreScroll);
      restoreScroll();
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
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      className={`
        fixed inset-y-0 left-0 right-auto
        m-0 h-dvh max-h-dvh
        w-[90vw] max-w-[520px]
        overflow-y-auto overscroll-contain
        border-0 bg-[#171717] p-0 text-white

        backdrop:transition-opacity
        backdrop:duration-[450ms]

        motion-reduce:animate-none
        motion-reduce:backdrop:transition-none

        ${
          open
            ? "animate-menu-enter backdrop:bg-black/55 backdrop:opacity-100"
            : "animate-menu-exit backdrop:bg-black/55 backdrop:opacity-0"
        }
      `}
    >
      <div
        className="
          flex min-h-full flex-col
          px-6 pb-7 pt-6
          sm:px-10 sm:pb-10
        "
      >
        {/* Menu header */}
        <div
          className="
            flex items-center justify-between gap-3
            border-b border-white/20 pb-3
          "
        >
          <span className="text-[10px] tracking-[0.18em]">
            MINTA HILLS
          </span>

          <div className="flex items-center gap-3">
            <LanguageSwitcher
              label={labels.chooseLanguage}
            />

            <button
              type="button"
              aria-label={labels.closeMenu}
              onClick={onClose}
              className="
                grid size-[42px] shrink-0
                place-items-center rounded-full
                border border-white/30
                text-[27px] font-light leading-none
                transition-colors duration-200
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
          className="my-auto grid py-8"
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
                border-b border-white/15
                py-[14px]

                text-[clamp(23px,7.5vw,36px)]
                font-light uppercase leading-[1.15]
                tracking-[-0.035em]

                transition-[padding] duration-200
                hover:pl-2
                motion-reduce:transition-none
              "
            >
              <span className="min-w-0 wrap-break-word">
                {item.label}
              </span>

              <span
                aria-hidden="true"
                className="
                  shrink-0 text-[9px] font-normal
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

           <a
    href={reservationHref}
    target="_blank"
    rel="noopener noreferrer"
    onClick={onClose}
  >
    {labels.reservation}
  </a>
        </div>
      </div>
    </dialog>
  );
}