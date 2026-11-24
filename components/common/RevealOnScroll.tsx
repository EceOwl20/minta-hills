"use client";

import {
  useEffect,
  useRef,
  type ReactNode,
} from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  duration?: number;
};

export default function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  distance = 24,
  duration = 1100,
}: Props) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (
      mediaQuery.matches ||
      !("IntersectionObserver" in window) ||
      typeof element.animate !== "function"
    ) {
      return;
    }

    let animation: Animation | undefined;

    const rect = element.getBoundingClientRect();

    // Keep initially visible content accessible.
    const isInitiallyVisible =
      rect.top < window.innerHeight;

    if (isInitiallyVisible) return;

    function reveal() {
      if (!element) return;

      observer.disconnect();

      animation = element.animate(
        [
          {
            opacity: 0,
            transform: `translateY(${distance}px)`,
          },
          {
            opacity: 1,
            transform: "translateY(0)",
          },
        ],
        {
          duration,
          delay,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "backwards",
        }
      );

      element.style.removeProperty("opacity");
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
        }
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -24px 0px",
      }
    );

    element.style.opacity = "0";

    observer.observe(element);

    function handleMotionChange() {
      if (!mediaQuery.matches) return;

      observer.disconnect();
      animation?.cancel();

      element?.style.removeProperty("opacity");
    }

    function handleFocus() {
      observer.disconnect();
      animation?.cancel();

      element?.style.removeProperty("opacity");
    }

    element.addEventListener("focusin", handleFocus);

    mediaQuery.addEventListener(
      "change",
      handleMotionChange
    );

    return () => {
      observer.disconnect();
      animation?.cancel();

      element.style.removeProperty("opacity");

      element.removeEventListener(
        "focusin",
        handleFocus
      );

      mediaQuery.removeEventListener(
        "change",
        handleMotionChange
      );
    };
  }, [delay, distance, duration]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}