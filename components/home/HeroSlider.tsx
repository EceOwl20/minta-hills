"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Slide = {
  id: number;
  src: string;
  alt: string;
};

type Props = {
  slides: Slide[];
  labels: {
    nextSlide: string;
    pauseSlider: string;
    playSlider: string;
  };
};

const AUTOPLAY_DELAY = 6000;

export default function HeroSlider({
  slides,
  labels,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);

  const totalSlides = slides.length;

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    function handleChange() {
      setReducedMotion(mediaQuery.matches);
    }

    handleChange();

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (
      totalSlides <= 1 ||
      isPaused ||
      reducedMotion
    ) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setPreviousIndex(activeIndex);
      setActiveIndex((activeIndex + 1) % totalSlides);
    }, AUTOPLAY_DELAY);

    return () => window.clearTimeout(timeout);
  }, [
    activeIndex,
    totalSlides,
    isPaused,
    reducedMotion,
  ]);

  function handleNext() {
    if (totalSlides <= 1) return;

    setPreviousIndex(activeIndex);
    setActiveIndex((activeIndex + 1) % totalSlides);
  }

  function formatNumber(value: number) {
    return String(value).padStart(2, "0");
  }

  if (totalSlides === 0) return null;

  return (
    <>
      {/* Background images */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;
          const isPrevious = index === previousIndex;

          return (
            <div
              key={slide.id}
              aria-hidden={!isActive}
              className={`
                absolute inset-0
                transition-opacity duration-[900ms]
                ease-in-out motion-reduce:transition-none
                ${
                  isActive
                    ? "z-20 opacity-100"
                    : isPrevious
                      ? "z-10 opacity-100"
                      : "z-0 opacity-0"
                }
              `}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="100vw"
                preload={index === 0}
                loading={index === 0 ? undefined : "eager"}
                className="object-cover object-center"
              />
            </div>
          );
        })}
      </div>

      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 z-10
          bg-linear-to-b
          from-black/55 via-black/16 to-black/72
        "
      />

      {totalSlides > 1 && (
        <>
          {/* Next slide button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label={labels.nextSlide}
            className="
              absolute bottom-[5%] right-6 z-30
              grid size-[46px] place-items-center
              rounded-full border border-white/65
              bg-transparent text-white
              transition-colors duration-200
              hover:bg-white hover:text-brand-dark
              md:bottom-auto md:right-[7.5%]
              md:top-1/2 md:size-[54px]
            "
          >
            <svg
              width={22}
              height={22}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 12h16M15 7l5 5-5 5" />
            </svg>
          </button>

          {/* Slide counter */}
          <div
            className="
              absolute bottom-[6%] left-6 z-30
              flex items-center gap-3
              text-[11px] font-medium
              tracking-[0.12em] text-white
              md:bottom-[12%] md:left-auto md:right-[7.5%]
            "
          >
            <span>{formatNumber(activeIndex + 1)}</span>

            <span
              aria-hidden="true"
              className="h-px w-[72px] bg-white/55"
            />

            <span>{formatNumber(totalSlides)}</span>

            {!reducedMotion && (
              <button
                type="button"
                onClick={() => setIsPaused((prev) => !prev)}
                aria-label={
                  isPaused
                    ? labels.playSlider
                    : labels.pauseSlider
                }
                className="
                  ml-1 grid size-8 place-items-center
                  rounded-full transition-colors
                  hover:bg-white/15
                "
              >
                {isPaused ? (
                  <svg
                    width={12}
                    height={12}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M7 4l14 8-14 8z" />
                  </svg>
                ) : (
                  <svg
                    width={12}
                    height={12}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M7 4h3v16H7zm7 0h3v16h-3z" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
}