"use client";

import {
  useState,
  type ReactNode,
} from "react";

import { useTranslations } from "next-intl";

import GalleryFilters from "./GalleryFilters";
import GalleryGroup from "./GalleryGroup";
import GalleryLightbox from "./GalleryLightbox";

import {
  galleryGroups,
  type GalleryFilter,
  type GalleryPhoto,
} from "@/data/gallery";

type Props = {
  children: ReactNode;
  captions?: Readonly<Record<string, string>>;
};

export default function GalleryContent({
  children,
  captions = {},
}: Props) {
  const tFilters = useTranslations(
    "GalleryPage.filters"
  );

  const [activeCategory, setActiveCategory] =
    useState<GalleryFilter>("all");

  const [activePhotoIndex, setActivePhotoIndex] =
    useState<number | null>(null);

  // Filtered gallery groups
  const visibleGroups =
    activeCategory === "all"
      ? galleryGroups
      : galleryGroups.filter(
          (group) => group.id === activeCategory
        );

  // All photographs in the visible groups
  const visiblePhotos = visibleGroups.flatMap(
    (group) => group.photos
  );

  // Currently selected photograph
  const activePhoto =
    activePhotoIndex !== null
      ? visiblePhotos[activePhotoIndex]
      : null;

  function handleCategoryChange(
    category: GalleryFilter
  ) {
    setActivePhotoIndex(null);
    setActiveCategory(category);
  }

  function handlePhotoOpen(photo: GalleryPhoto) {
    const index = visiblePhotos.findIndex(
      (item) => item.id === photo.id
    );

    if (index !== -1) {
      setActivePhotoIndex(index);
    }
  }

  function handlePhotoClose() {
    setActivePhotoIndex(null);
  }

  function handlePreviousPhoto() {
    const total = visiblePhotos.length;

    if (total <= 1) return;

    setActivePhotoIndex((current) =>
      current === null
        ? null
        : (current - 1 + total) % total
    );
  }

  function handleNextPhoto() {
    const total = visiblePhotos.length;

    if (total <= 1) return;

    setActivePhotoIndex((current) =>
      current === null
        ? null
        : (current + 1) % total
    );
  }

  return (
    <>
      {/* Category filters */}
      <GalleryFilters
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Server-rendered introduction */}
      {children}

      {/* Filtered gallery groups */}
      <div id="gallery-groups">
        {visibleGroups.map((group) => (
          <GalleryGroup
            key={group.id}
            group={group}
            captions={captions}
            onPhotoOpen={handlePhotoOpen}
          />
        ))}
      </div>

      {/* Gallery lightbox */}
      {activePhoto && activePhotoIndex !== null && (
        <GalleryLightbox
          photo={activePhoto}
          caption={
            captions[activePhoto.id] ??
            tFilters(activePhoto.category)
          }
          currentIndex={activePhotoIndex}
          totalPhotos={visiblePhotos.length}
          onClose={handlePhotoClose}
          onPrevious={handlePreviousPhoto}
          onNext={handleNextPhoto}
        />
      )}
    </>
  );
}