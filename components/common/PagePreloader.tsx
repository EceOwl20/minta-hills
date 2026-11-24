"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { siteConfig } from "@/data/site";

const FADE_DURATION = 900;
const MAX_WAIT_DURATION = 5000;

export default function PagePreloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);

  const [isLeaving, setIsLeaving] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let dismissed = false;

    let fallbackTimeout: number | undefined;
    let removalTimeout: number | undefined;

    function dismissPreloader() {
      if (dismissed) return;

      dismissed = true;

      window.clearTimeout(fallbackTimeout);

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      setIsLeaving(true);

      removalTimeout = window.setTimeout(
        () => {
          setIsVisible(false);
        },
        reducedMotion ? 0 : FADE_DURATION
      );
    }

    if (document.readyState === "complete") {
      fallbackTimeout = window.setTimeout(
        dismissPreloader,
        0
      );
    } else {
      window.addEventListener(
        "load",
        dismissPreloader,
        { once: true }
      );

      // Prevent the preloader from blocking the page indefinitely.
      fallbackTimeout = window.setTimeout(
        dismissPreloader,
        MAX_WAIT_DURATION
      );
    }

    return () => {
      dismissed = true;

      window.removeEventListener(
        "load",
        dismissPreloader
      );

      window.clearTimeout(fallbackTimeout);
      window.clearTimeout(removalTimeout);

      // Also remove the overlay if the component is unmounted.
      preloaderRef.current?.style.removeProperty("opacity");
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={preloaderRef}
      aria-hidden="true"
      className={`animate-preloader-safety
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-black
        transition-opacity duration-[900ms]
        ease-in-out
        motion-reduce:transition-none
        ${
          isLeaving
            ? "pointer-events-none opacity-0"
            : "opacity-100"
        }
      `}
    >
      <Image
  src={siteConfig.logo}
  alt=""
  width={320}
  height={320}
  loading="eager"
  sizes="(min-width: 768px) 200px, 150px"
  className={`
    size-[150px] object-contain

    transition-transform duration-[900ms]
    ease-in-out

    md:size-[200px]

    motion-reduce:transition-none

    ${isLeaving ? "scale-105" : "scale-100"}
  `}
/>
    </div>
  );
}