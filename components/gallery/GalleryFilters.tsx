"use client";

import { useTranslations } from "next-intl";

import {
  galleryCategories,
  type GalleryFilter,
} from "@/data/gallery";

type Props = {
  activeCategory: GalleryFilter;
  onCategoryChange: (category: GalleryFilter) => void;
};

const filterOptions: readonly GalleryFilter[] = [
  "all",
  ...galleryCategories,
];

export default function GalleryFilters({
  activeCategory,
  onCategoryChange,
}: Props) {
  const t = useTranslations("GalleryPage.filters");

  return (
    <div
      className="
        sticky z-30
        top-[82px]
        md:top-[86px]
        xl:top-[116px]
        border-b border-black/15
        bg-white/95
        backdrop-blur-[12px]
      "
    >
      <div
        role="group"
        aria-label={t("label")}
        className="
          mx-auto flex
          w-[calc(100%-32px)]
          max-w-[1180px]
          items-center gap-[7px]
          overflow-x-auto overscroll-x-contain
          py-[10px]
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
          min-[821px]:w-[calc(100%-48px)]
        "
      >
        {filterOptions.map((category) => {
          const isActive =
            activeCategory === category;

          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={() => onCategoryChange(category)}
              className={`
                shrink-0 whitespace-nowrap
                cursor-pointer
                rounded-full border
                px-3 py-2
                font-sans text-[12px]
                font-semibold leading-[1.5]
                transition-colors
                duration-[180ms] ease-in-out
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-brand-dark
                motion-reduce:transition-none text-[#666666]

                ${
                  isActive
                    ? `
                      border-brand-dark
                      bg-brand-dark
                      text-white
                    `
                    : `
                      border-black/15
                      bg-white
                      text-text-body

                      hover:border-[#bdbdb7]
                      hover:text-brand-dark
                    `
                }
              `}
            >
              {t(category)}
            </button>
          );
        })}
      </div>
    </div>
  );
}