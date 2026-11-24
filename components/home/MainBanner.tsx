import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { heroSlides } from "@/data/heroSlides";

import HeroSlider from "./HeroSlider";

export default async function MainBanner() {
  const t = await getTranslations("MainBanner");

  const slides = heroSlides.map((slide) => ({
    id: slide.id,
    src: slide.src,
    alt: t(`slides.${slide.altKey}`),
  }));

  return (
    <section
      aria-label={t("label")}
      className="
        relative isolate h-svh min-h-[650px]
        overflow-hidden bg-brand-charcoal text-white
        md:min-h-[720px]
      "
    >
      <HeroSlider
        slides={slides}
        labels={{
          nextSlide: t("nextSlide"),
          pauseSlider: t("pauseSlider"),
          playSlider: t("playSlider"),
        }}
      />

      {/* Hero content */}
      <div
        className="
          absolute bottom-[15%] left-6 z-20
          w-[calc(100%-48px)]
          animate-hero-enter
          motion-reduce:animate-none
          md:bottom-[11%] md:left-[7.5%]
          md:w-3/4 md:max-w-[820px]
        "
      >
        {/* Location */}
        <p
          className="
            mb-5 text-[11px] font-semibold
            leading-relaxed tracking-[0.16em]
            md:mb-6
          "
        >
          {t("location")}
        </p>

        {/* Main heading */}
        <h1
          className="
            max-w-[820px] font-sans
            text-[clamp(36px,10vw,48px)]
            font-light leading-[0.98]
            tracking-[-0.035em]
            text-white
            md:text-[clamp(48px,5.5vw,78px)]
            md:leading-[0.94]
          "
        >
          {t("title")}

          <br />

          {t("subtitle")}
        </h1>

        {/* Actions and description */}
        <div
          className="
            mt-[30px] flex flex-col items-start gap-5
            md:mt-[42px] md:flex-row
            md:items-center md:gap-[72px]
          "
        >
          <Link
            href="/villas"
            className="
              group inline-flex min-h-[46px]
              shrink-0 items-center justify-between gap-8
              rounded-full border border-white/80
              px-[22px] py-3
              text-[11px] font-semibold
              tracking-[0.1em]
              transition-colors duration-200
              hover:bg-white hover:text-brand-dark
            "
          >
            {t("discover")}

            <svg
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="
                shrink-0 transition-transform
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
                motion-reduce:transform-none
              "
            >
              <path d="M6 18L18 6M7 6h11v11" />
            </svg>
          </Link>

          <p
            className="
              hidden max-w-[340px]
              text-sm font-normal leading-[1.8]
              text-white/95 md:block
            "
          >
            {t("description")}
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#highlights"
        className="
          absolute bottom-[13%] right-[3%] z-30
          hidden items-center gap-3
          text-[11px] font-medium tracking-[0.16em]
          text-white lg:flex
        "
      >
        <span className="h-[50px] w-px bg-white/80" />

        <span className="[writing-mode:vertical-rl]">
          {t("scroll")}
        </span>
      </a>
    </section>
  );
}