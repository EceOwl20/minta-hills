"use client";

import { useTranslations } from "next-intl";

import GalleryImage from "./GalleryImage";

import type {
  GalleryGroupData,
  GalleryPhoto,
} from "@/data/gallery";

type Props = {
  group: GalleryGroupData;
  captions: Readonly<Record<string, string>>;
  onPhotoOpen: (photo: GalleryPhoto) => void;
};

export default function GalleryGroup({
  group,
  captions,
  onPhotoOpen,
}: Props) {
  const t = useTranslations("GalleryPage.groups");

  const tFilters = useTranslations(
    "GalleryPage.filters"
  );

  const categoryTitle = tFilters(group.id);

  return (
    <section
      id={`gallery-${group.id}`}
      aria-labelledby={`gallery-heading-${group.id}`}
      className="
        mx-auto
        w-[calc(100%-32px)]
        max-w-[1180px]
        pt-5 pb-[34px]
        min-[821px]:w-[calc(100%-48px)]
        min-[821px]:pt-6
        min-[821px]:pb-[42px]
      "
    >
      {/* Category heading */}
      <div
        className="
          mb-[14px] flex
          items-start justify-between gap-4
          min-[521px]:items-center
        "
      >
        <div className="min-w-0">
          {/* Category title */}
          <h2
            id={`gallery-heading-${group.id}`}
            className="
              font-sans text-[20px]
              font-normal leading-tight
              tracking-[-0.015em]
              text-brand-dark
            "
          >
            {categoryTitle}
          </h2>

          {/* Category description */}
          <p
            className="
              mt-1
              font-sans text-[14px]
              font-light leading-relaxed
              text-text-body
            "
          >
            {t("description", {
              category: categoryTitle,
            })}
          </p>
        </div>

        {/* Dynamic photo count */}
        <span
          className="
            shrink-0 whitespace-nowrap

            rounded-full
            border border-[#e5e5e2]
            bg-[#f7f7f5]

            px-[9px] py-[6px]

            font-sans text-[11px]
            font-normal leading-relaxed
            text-text-body
          "
        >
          {t("photoCount", {
            count: group.photos.length,
          })}
        </span>
      </div>

      {/* Gallery grid */}
      <div
        className="
          grid grid-cols-1 gap-[7px]

          min-[361px]:grid-cols-2

          min-[521px]:gap-[9px]

          min-[821px]:grid-cols-3
          min-[821px]:gap-3

          min-[1051px]:grid-cols-4
        "
      >
        {group.photos.map((photo) => (
          <GalleryImage
            key={photo.id}
            photo={photo}
            caption={
              captions[photo.id] ?? categoryTitle
            }
            onOpen={onPhotoOpen}
          />
        ))}
      </div>
    </section>
  );
}