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
  distance = 20,
  duration = 1000,
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
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    let animation: Animation | undefined;
    let observer: IntersectionObserver | undefined;

    function reveal() {
      if (!element) return;

      observer?.disconnect();

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

      element.style.removeProperty("visibility");
    }

    function handleMotionChange() {
      if (mediaQuery.matches) {
        observer?.disconnect();
        animation?.cancel();

        element?.style.removeProperty("visibility");
      }
    }

    const rect = element.getBoundingClientRect();

    // Do not hide content already visible on initial load.
    const isInitiallyVisible =
      rect.top < window.innerHeight &&
      rect.bottom > 0;

    if (isInitiallyVisible) return;

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
        }
      },
      {
        threshold: 0.1,
      }
    );

    element.style.visibility = "hidden";

    observer.observe(element);

    mediaQuery.addEventListener(
      "change",
      handleMotionChange
    );

    return () => {
      observer?.disconnect();
      animation?.cancel();

      element.style.removeProperty("visibility");

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