"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";

type Props = {
  value: number;
  duration?: number;
  className?: string;
};

export default function CountUp({
  value,
  duration = 1400,
  className = "",
}: Props) {
  const locale = useLocale();

  const numberRef = useRef<HTMLSpanElement>(null);

  const formattedValue = new Intl.NumberFormat(
    locale
  ).format(value);

  useEffect(() => {
    const element = numberRef.current;

    if (!element) return;

    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const formatter = new Intl.NumberFormat(locale);

    let animationFrame: number | null = null;

    if (
      mediaQuery.matches ||
      duration <= 0 ||
      !("IntersectionObserver" in window)
    ) {
      element.textContent = formatter.format(value);
      return;
    }

    function animate() {
      const startTime = performance.now();

      function update(currentTime: number) {
        const progress = Math.min(
          (currentTime - startTime) / duration,
          1
        );

        // Ease-out cubic.
        const eased =
          1 - Math.pow(1 - progress, 3);

        const currentValue = Math.round(
          value * eased
        );

        if (element) {
          element.textContent =
            formatter.format(currentValue);
        }

        if (progress < 1) {
          animationFrame =
            window.requestAnimationFrame(update);
        } else {
          animationFrame = null;
        }
      }

      animationFrame =
        window.requestAnimationFrame(update);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        observer.disconnect();
        animate();
      },
      {
        threshold: 0.25,
      }
    );

    function handleMotionChange() {
      if (!mediaQuery.matches) return;

      observer.disconnect();

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }

      if (element) {
        element.textContent = formatter.format(value);
      }
    }

    observer.observe(element);

    mediaQuery.addEventListener(
      "change",
      handleMotionChange
    );

    return () => {
      observer.disconnect();

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }

      element.textContent = formatter.format(value);

      mediaQuery.removeEventListener(
        "change",
        handleMotionChange
      );
    };
  }, [value, duration, locale]);

  return (
    <span className={className}>
      <span className="sr-only">
        {formattedValue}
      </span>

      <span
        ref={numberRef}
        aria-hidden="true"
      >
        {formattedValue}
      </span>
    </span>
  );
}