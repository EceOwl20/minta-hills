"use client";

import Image from "next/image";

import {
  useEffect,
  useRef,
  type KeyboardEvent,
} from "react";

import { useTranslations } from "next-intl";

import type { GalleryPhoto } from "@/data/gallery";

type Props = {
  photo: GalleryPhoto;
  caption: string;
  currentIndex: number;
  totalPhotos: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

const navigationButtonClass = `
  inline-flex size-[42px] shrink-0
  items-center justify-center

  cursor-pointer rounded-full
  border border-white/25

  bg-transparent text-white
  text-[18px]

  transition-colors duration-200

  hover:bg-white hover:text-black

  focus-visible:outline-2
  focus-visible:outline-offset-4
  focus-visible:outline-white

  motion-reduce:transition-none
`;

export default function GalleryLightbox({
  photo,
  caption,
  currentIndex,
  totalPhotos,
  onClose,
  onPrevious,
  onNext,
}: Props) {
  const t = useTranslations("GalleryPage.lightbox");

  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    if (!dialog.open) {
      dialog.showModal();
    }

    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus({
      preventScroll: true,
    });

    return () => {
      if (dialog.open) {
        dialog.close();
      }

      document.body.style.overflow = previousOverflow;

      if (
        previousFocus instanceof HTMLElement &&
        previousFocus.isConnected
      ) {
        previousFocus.focus({
          preventScroll: true,
        });
      }
    };
  }, []);

  function handleKeyDown(
    event: KeyboardEvent<HTMLDialogElement>
  ) {
    if (event.key === "ArrowLeft" && totalPhotos > 1) {
      event.preventDefault();
      onPrevious();
    }

    if (event.key === "ArrowRight" && totalPhotos > 1) {
      event.preventDefault();
      onNext();
    }
  }

  const position = {
    current: currentIndex + 1,
    total: totalPhotos,
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label={t("label")}
      onKeyDown={handleKeyDown}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className="
        fixed inset-0 m-0
        h-dvh w-full

        max-h-none max-w-none

        overflow-hidden border-0
        bg-transparent p-0
        text-white

        backdrop:bg-black/95
      "
    >
      {/* Lightbox overlay */}
      <div
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            onClose();
          }
        }}
        className="
          relative flex h-full w-full
          items-center justify-center

          bg-black/[0.2]

          px-3 pb-3 pt-[76px]

          min-[521px]:px-6
          min-[521px]:pb-6
        "
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          type="button"
          aria-label={t("close")}
          onClick={onClose}
          className="
            absolute right-5 top-[18px]
            z-10

            inline-flex size-11
            items-center justify-center

            cursor-pointer rounded-full
            border border-white/25
            bg-white/[0.08]

            text-[28px] leading-none text-white

            transition-colors duration-200

            hover:bg-white hover:text-black

            focus-visible:outline-2
            focus-visible:outline-offset-4
            focus-visible:outline-white

            motion-reduce:transition-none
          "
        >
          <span aria-hidden="true">×</span>
        </button>

        {/* Active photograph */}
        <figure
          className="
            flex min-h-0 max-h-full
            w-fit max-w-full
            flex-col gap-3
          "
        >
          <Image
            key={photo.id}
            src={photo.src}
            alt={caption}
            width={photo.width}
            height={photo.height}
            loading="eager"
            sizes="(max-width: 1248px) 100vw, 1200px"
            className="
              block min-h-0

              h-auto w-auto
              max-h-[80dvh]
              max-w-full

              shrink rounded-[10px]
              object-contain

              min-[1249px]:max-w-[1200px]
            "
          />

          {/* Caption and navigation */}
          <div
            className="
              flex shrink-0 flex-col
              items-start justify-between

              gap-3 text-white

              min-[521px]:flex-row
              min-[521px]:items-center
              min-[521px]:gap-[18px]
            "
          >
            {/* Photo caption */}
            <figcaption
              aria-live="polite"
              className="
                min-w-0 break-words
                font-sans text-[13px]
                font-normal leading-relaxed
              "
            >
              {caption}
            </figcaption>

            {/* Photo navigation */}
            <div
              className="
                flex shrink-0
                items-center gap-2
              "
            >
              {/* Photo counter */}
              <span
                aria-label={t("position", position)}
                className="
                  mr-[6px]
                  whitespace-nowrap

                  font-sans text-[11px]
                  text-white/[0.66]
                  tabular-nums
                "
              >
                {t("counter", position)}
              </span>

              {totalPhotos > 1 && (
                <>
                  {/* Previous photo */}
                  <button
                    type="button"
                    aria-label={t("previous")}
                    onClick={onPrevious}
                    className={navigationButtonClass}
                  >
                    <span aria-hidden="true">←</span>
                  </button>

                  {/* Next photo */}
                  <button
                    type="button"
                    aria-label={t("next")}
                    onClick={onNext}
                    className={navigationButtonClass}
                  >
                    <span aria-hidden="true">→</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </figure>
      </div>
    </dialog>
  );
}