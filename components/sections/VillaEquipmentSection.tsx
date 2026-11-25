import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

import RevealOnScroll from "@/components/common/RevealOnScroll";
import { villaEquipment } from "@/data/villas";

type Props = {
  showCta?: boolean;
};

export default async function VillaEquipmentSection({
  showCta = true,
}: Props) {
  const t = await getTranslations(
    "VillaEquipmentSection"
  );

  return (
    <section
      id="villa-equipment"
      aria-labelledby="villa-equipment-heading"
      className="
        bg-brand-mist text-brand-dark

        px-5 py-[clamp(64px,7vw,104px)]

        min-[761px]:px-[7.5%]
      "
    >
      {/* Section heading */}
      <div
        className="
          mb-[clamp(40px,4vw,64px)]

          grid grid-cols-1 items-end
          gap-6

          lg:grid-cols-2
          lg:gap-[clamp(40px,4vw,80px)]
        "
      >
        {/* Heading content */}
        <RevealOnScroll>
          <p
            className="
              flex items-center gap-[14px]
              text-[11px] font-semibold
              uppercase leading-relaxed
              tracking-[0.16em]
              text-text-label text-[#4a4a44]
            "
          >
            <span
              aria-hidden="true"
              className="
                h-px w-[34px] shrink-0
                bg-current
              "
            />

            {t("eyebrow")}
          </p>

          <h2
            id="villa-equipment-heading"
            className="
              mt-6

              font-serif font-normal
              text-[clamp(26px,2.6vw,40px)]
              leading-[1.14]
              tracking-[-0.035em]
            "
          >
            {t("title")}

            <br />

            <em className="font-normal italic">
              {t("subtitle")}
            </em>
          </h2>
        </RevealOnScroll>

        {/* Section description */}
        <RevealOnScroll delay={120}>
          <p
            className="
              text-[15px] font-light
              leading-[1.8]
              text-text-body"
          >
            {t("description")}
          </p>
        </RevealOnScroll>
      </div>

      {/* Equipment list */}
      <ul
        className="
          grid grid-cols-1
          border-t border-black/25

          min-[621px]:grid-cols-2
          min-[621px]:gap-x-8

          min-[1101px]:grid-cols-3
          min-[1101px]:gap-x-[clamp(32px,3vw,56px)]
        "
      >
        {villaEquipment.map((item, index) => (
          <li
            key={item}
            className="
              min-w-0
              border-b border-black/25
            "
          >
            <RevealOnScroll
              delay={(index % 3) * 100}
              className="
                flex min-h-[64px]
                items-center gap-[18px]
                px-0.5 py-[18px]
              "
            >
              {/* Equipment number */}
              <span
                aria-hidden="true"
                className="
                  w-[18px] shrink-0 text-[#4a4a44]
                  text-[11px] font-semibold
                  leading-relaxed
                  tracking-[0.12em]
                  text-text-label
                  tabular-nums
                "
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Equipment name */}
              <span
                className="
                  min-w-0
                  font-serif font-normal
                  text-[15px] leading-[1.5]
                  text-brand-dark
                "
              >
                {t(`items.${item}`)}
              </span>
            </RevealOnScroll>
          </li>
        ))}
      </ul>

      {/* Accommodation CTA */}
      {showCta && (
        <RevealOnScroll className="mt-5">
          <Link
            href="/villas"
            className="
              inline-flex min-h-[48px]
              max-w-full
              items-center justify-between
              gap-[30px]

              rounded-[26px]
              border border-brand-dark
              bg-transparent

              px-6 py-3

              text-[11px] font-semibold
              uppercase leading-relaxed
              tracking-[0.1em]
              text-brand-dark

              transition-colors duration-250

              hover:bg-brand-dark
              hover:text-white

              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-brand-dark

              motion-reduce:transition-none
            "
          >
            {t("discoverVillas")}

            <span
              aria-hidden="true"
              className="
                shrink-0
                text-[16px] leading-none
              "
            >
              ↗
            </span>
          </Link>
        </RevealOnScroll>
      )}
    </section>
  );
}