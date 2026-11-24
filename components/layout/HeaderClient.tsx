"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { Link, usePathname } from "@/i18n/navigation";
import { siteConfig } from "@/data/site";
import type { HeaderProps } from "@/types/navigation";

import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";

export default function HeaderClient({ items, labels }: HeaderProps) {
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const progressRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  let animationFrame: number | null = null;

  function updateScroll() {
    const scrollY = window.scrollY;

    const scrollableHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const progress =
      scrollableHeight > 0
        ? Math.min(
            Math.max(scrollY / scrollableHeight, 0),
            1
          )
        : 0;

    setIsScrolled(scrollY > 50);

    if (progressRef.current) {
      progressRef.current.style.transform =
        `scaleX(${progress})`;
    }

    animationFrame = null;
  }

  function handleScroll() {
    if (animationFrame !== null) return;

    animationFrame =
      window.requestAnimationFrame(updateScroll);
  }

  updateScroll();

  window.addEventListener("scroll", handleScroll, {
    passive: true,
  });

  window.addEventListener("resize", handleScroll);

  const resizeObserver = new ResizeObserver(handleScroll);

  resizeObserver.observe(document.body);

  return () => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleScroll);

    resizeObserver.disconnect();

    if (animationFrame !== null) {
      window.cancelAnimationFrame(animationFrame);
    }
  };
}, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1280px)");

    function handleResize(event: MediaQueryListEvent) {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    }

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  function isActive(href: string) {
    return (
      pathname === href || (href !== "/" && pathname.startsWith(`${href}/`))
    );
  }

  return (
    <>
    {/* Scroll Progress Bar */}
{/* Scroll Progress Bar */}
<div
  aria-hidden="true"
  className="
    pointer-events-none fixed inset-x-0 top-0
    z-[100] h-[2px]
  "
>
  <div
    ref={progressRef}
    className="h-full w-full origin-left bg-white"
    style={{ transform: "scaleX(0)" }}
  />
</div>

  <header
  className={`
    inset-x-0 top-0 z-50
    h-(--header-height) w-full text-white
    ${
      isScrolled
        ? "fixed bg-[linear-gradient(180deg,rgba(7,11,13,0.94)_0%,rgba(7,11,13,0.72)_64%,rgba(7,11,13,0.24)_100%)]"
        : "absolute bg-[linear-gradient(180deg,rgba(7,11,13,0.88)_0%,rgba(7,11,13,0.56)_64%,rgba(7,11,13,0)_100%)]"
    }
  `}
>
        <nav
          aria-label={labels.mainMenu}
          className="
            mx-auto grid h-full w-full max-w-[1500px]
            grid-cols-[auto_1fr] items-center
            gap-4 px-5
            xl:grid-cols-[112px_minmax(0,1fr)_auto]
            xl:gap-4 xl:px-7
            2xl:grid-cols-[132px_minmax(0,1fr)_auto]
            2xl:gap-6
          "
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label={labels.homeLinkLabel}
            className="
              grid size-[78px] shrink-0 place-items-center
              xl:h-[112px] xl:w-[108px]
              2xl:w-[124px]
            "
          >
            <Image
              src={siteConfig.logo}
              alt={siteConfig.name}
              width={320}
              height={320}
              sizes="(min-width: 1536px) 118px, (min-width: 1280px) 104px, 76px"
              loading="eager"
              className="
                size-[76px] rounded-sm object-contain
                xl:size-[104px]
                2xl:h-[108px] 2xl:w-[118px]
              "
            />
          </Link>

          {/* Desktop navigation */}
          <div
            className="
              hidden min-w-0 items-center justify-center
              gap-[clamp(10px,1.25vw,24px)]
              xl:flex
            "
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`
                  whitespace-nowrap text-[11px]
                  font-light leading-none tracking-[0.045em]
                  text-white transition-opacity duration-200
                  2xl:text-[12px] 2xl:tracking-[0.09em]
                  ${
                    isActive(item.href)
                      ? "opacity-100"
                      : "opacity-85 hover:opacity-100"
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Header actions */}
          <div className="flex items-center justify-self-end gap-1.5">
            <div className="hidden items-center gap-1.5 xl:flex">
              {/* Phone */}
              <a
                href={siteConfig.phone.href}
                aria-label={labels.callUs}
                className="
                  grid size-[34px] shrink-0 place-items-center
                  rounded-full border border-white/50
                  transition-colors
                  hover:bg-white hover:text-brand-dark
                "
              >
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0"
                >
                  <path d="M5.4 3.8 8.8 3l1.6 4-2.2 1.7a14 14 0 0 0 7.1 7.1l1.7-2.2 4 1.6-.8 3.4c-.2.9-1 1.5-1.9 1.4C10.7 19.1 4.9 13.3 4 5.7c-.1-.9.5-1.7 1.4-1.9Z" />
                </svg>
              </a>

              {/* Language */}
              <LanguageSwitcher label={labels.chooseLanguage} />

              {/* Reservation */}
              <Link
                href={siteConfig.reservation.href}
                aria-current={
                  isActive(siteConfig.reservation.href) ? "page" : undefined
                }
                className="
                  inline-flex h-[34px] min-w-[112px]
                  items-center justify-center whitespace-nowrap
                  rounded-full border border-white/55 px-3
                  text-[9px] font-medium tracking-widest
                  transition-colors duration-200
                  hover:border-white hover:bg-white
                  hover:text-brand-dark
                "
              >
                {labels.reservation}
              </Link>
            </div>

            {/* Mobile menu toggle */}
            <button
              type="button"
              aria-label={labels.openMenu}
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(true)}
              className="
                grid size-[44px] place-content-center
                gap-[5px] rounded-full
                border border-white/50 bg-black/15
                xl:hidden
              "
            >
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-5 bg-current" />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu
        key={pathname}
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        items={items}
        pathname={pathname}
        labels={labels}
      />
    </>
  );
}
