"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import type { GalleryPhoto } from "@/data/gallery";

type Props = {
  photo: GalleryPhoto;
  caption: string;
  onOpen: (photo: GalleryPhoto) => void;
};

export default function GalleryImage({
  photo,
  caption,
  onOpen,
}: Props) {
  const t = useTranslations("GalleryPage.groups");

  return (
    <button
      type="button"
      aria-label={t("viewImage", { caption })}
      onClick={() => onOpen(photo)}
      className="
        group relative block w-full
        aspect-[4/3]
        overflow-hidden

        cursor-zoom-in
        rounded-[8px]
        border border-black/[0.04]
        bg-[#f7f7f5]

        text-left

        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-brand-dark

        min-[521px]:rounded-[10px]
      "
    >
      {/* Gallery photo */}
      <Image
        src={photo.src}
        alt={caption}
        fill
        sizes="
          (max-width: 360px) calc(100vw - 32px),
          (max-width: 820px) 50vw,
          (max-width: 1050px) 33vw,
          (max-width: 1228px) 25vw,
          286px
        "
        className="
          object-cover object-center

          transition-[transform,filter]
          duration-[220ms] ease-in-out

          group-hover:scale-[1.018]
          group-hover:brightness-[0.92]

          group-focus-visible:scale-[1.018]
          group-focus-visible:brightness-[0.92]

          motion-reduce:transition-none
          motion-reduce:group-hover:scale-100
          motion-reduce:group-focus-visible:scale-100
        "
      />

      {/* Photo caption */}
      <span
        className="
          pointer-events-none
          absolute bottom-[6px] left-[6px]

          w-max max-w-[calc(100%-12px)]
          truncate

          rounded-[7px]
          bg-black/[0.68]
          backdrop-blur-[8px]

          px-[7px] py-[5px]

          font-sans text-[10px]
          font-normal leading-[1.2]
          text-white

          transition-[opacity,transform]
          duration-[180ms] ease-in-out

          min-[521px]:bottom-2
          min-[521px]:left-2
          min-[521px]:max-w-[calc(100%-16px)]
          min-[521px]:px-[9px]
          min-[521px]:py-[6px]
          min-[521px]:text-[11px]

          min-[821px]:translate-y-1
          min-[821px]:opacity-0

          group-hover:translate-y-0
          group-hover:opacity-100

          group-focus-visible:translate-y-0
          group-focus-visible:opacity-100

          motion-reduce:transition-none
          motion-reduce:translate-y-0
        "
      >
        {caption}
      </span>
    </button>
  );
}