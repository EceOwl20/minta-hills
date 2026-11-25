import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { galleryHero } from "@/data/gallery";

type Props = {
  photoCount: number;
};

export default async function GalleryHero({
  photoCount,
}: Props) {
  const t = await getTranslations("GalleryPage.hero");

  const meta = [
    t("photoCount", {
      count: photoCount,
    }),
    t("villa"),
    t("location"),
  ];

  return (
    <section
      aria-labelledby="gallery-heading"
      className="
        relative flex items-end overflow-hidden
        bg-brand-dark text-white

        h-[42vh] min-h-[300px]

        min-[521px]:h-[46vh]
        min-[521px]:min-h-[330px]

        min-[821px]:h-[clamp(360px,52vh,560px)]
        min-[821px]:min-h-[360px]
      "
    >
      {/* Hero background */}
      <Image
        src={galleryHero.image}
        alt={t("imageAlt")}
        fill
        preload
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_20%,rgba(0,0,0,0.68)_100%)]
        "
      />

      {/* Hero content */}
      <div
        className="
          relative z-10 mx-auto
          w-[calc(100%-32px)]
          max-w-[1180px]

          pb-[30px]

          min-[821px]:w-[calc(100%-48px)]
          min-[821px]:pb-10
        "
      >
        {/* Eyebrow */}
        <p
          className="
            mb-[10px]

            font-sans text-[11px]
            font-semibold uppercase
            leading-relaxed
            tracking-[0.15em]
            text-white/90
          "
        >
          {t("eyebrow")}
        </p>

        {/* Page heading */}
        <h1
          id="gallery-heading"
          className="
            max-w-[720px]

            font-sans font-light
            text-[36px]
            leading-[1.04]
            tracking-[-0.035em]
            text-white

            min-[521px]:text-[clamp(36px,4.8vw,62px)]
          "
        >
          {t("title")}
        </h1>

        {/* Gallery information */}
        <ul
          className="
            mt-5 flex flex-wrap
            items-center gap-x-3 gap-y-2

            font-sans text-[12px]
            font-normal leading-relaxed
            text-white/90

            min-[521px]:gap-x-[14px]
          "
        >
          {meta.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}