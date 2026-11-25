import {
  getTranslations,
  setRequestLocale,
} from "next-intl/server";

import GalleryHero from "@/components/gallery/GalleryHero";
import GalleryContent from "@/components/gallery/GalleryContent";
import GalleryIntro from "@/components/gallery/GalleryIntro";

import {
  galleryPhotos,
  galleryPhotoCount,
} from "@/data/gallery";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function GalleryPage({
  params,
}: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  const tCaptions = await getTranslations({
    locale,
    namespace: "GalleryPage.captions",
  });

  const captions = Object.fromEntries(
    galleryPhotos.map((photo) => [
      photo.id,
      tCaptions(photo.captionKey),
    ])
  );

  return (
    <main
      id="main"
      className="bg-white text-brand-dark"
    >
      <GalleryHero
        photoCount={galleryPhotoCount}
      />

      <GalleryContent captions={captions}>
        <GalleryIntro />
      </GalleryContent>
    </main>
  );
}