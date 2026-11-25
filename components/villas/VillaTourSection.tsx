import Image from "next/image";
import { getTranslations } from "next-intl/server";

import RevealOnScroll from "@/components/common/RevealOnScroll";

import {
  villaConfig,
  villaTourRooms,
} from "@/data/villas";

const chipKeys = [
  "first",
  "second",
  "third",
] as const;

export default async function VillaTourSection() {
  const t = await getTranslations("VillasPage.tour");

const { specs, beds } = villaConfig;

const values = {
  livingArea: specs.livingArea,
  kitchens: specs.kitchens,
  bedrooms: specs.bedrooms,
  bathrooms: specs.bathrooms,
  toilets: specs.toilets,
  balconies: specs.balconies,
  capacity: specs.capacity,
  doubleBeds: beds.double,
  singleBeds: beds.single,
};

  return (
    <section
      id="villa-tour"
      aria-labelledby="villa-tour-heading"
      className="
        bg-brand-paper text-brand-dark

        px-5 py-[clamp(64px,7vw,104px)]

        min-[761px]:px-[6%]
        min-[1101px]:px-[7.5%]
      "
    >
      {/* Section heading */}
      <RevealOnScroll
        className="
          mb-[clamp(44px,5vw,76px)]
          max-w-[720px]
        "
      >
        {/* Section label */}
        <p
          className="
            flex items-center gap-[14px]
            text-[11px] font-semibold
            uppercase leading-relaxed
            tracking-[0.16em]
            text-text-label 
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

        {/* Section title */}
        <h2
          id="villa-tour-heading"
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

      {/* Villa rooms */}
      <div className="border-b border-black/25">
        {villaTourRooms.map((room, index) => {
          const isReversed = index % 2 !== 0;

          const roomNumber = String(index + 1).padStart(
            2,
            "0"
          );

          return (
            <article
              key={room.id}
              aria-labelledby={`villa-tour-${room.id}`}
              className="group border-t border-black/25"
            >
              <RevealOnScroll
                className="
                  grid grid-cols-1
                  items-center gap-7

                  py-[clamp(34px,4vw,58px)]

                  min-[1101px]:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]
                  min-[1101px]:gap-[clamp(30px,4.5vw,76px)]
                "
              >
                {/* Room image */}
                <div
                  className={`
                    relative aspect-[3/2]
                    min-w-0 overflow-hidden

                    ${
                      isReversed
                        ? "min-[1101px]:order-2"
                        : ""
                    }
                  `}
                >
                  <Image
                    src={room.image}
                    alt={t(
                      `rooms.${room.id}.imageAlt`
                    )}
                    fill
                    sizes={
                      isReversed
                        ? "(min-width: 1101px) 40vw, (min-width: 761px) 88vw, 100vw"
                        : "(min-width: 1101px) 46vw, (min-width: 761px) 88vw, 100vw"
                    }
                    className="
                      object-cover object-center

                      transition-transform
                      duration-[900ms]
                      ease-[cubic-bezier(0.16,1,0.3,1)]

                      group-hover:scale-[1.04]

                      motion-reduce:transition-none
                      motion-reduce:group-hover:scale-100
                    "
                  />
                </div>

                {/* Room content */}
                <div className="min-w-0">
                  {/* Room number and category */}
                  <span
                    className="
                      mb-[14px] block

                      text-[11px] font-semibold
                      uppercase leading-[1.55]
                      tracking-[0.16em]
                      text-text-label text-[#4a4a44]
                    "
                  >
                    {roomNumber} —{" "}
                    {t(`rooms.${room.id}.category`)}
                  </span>

                  {/* Room title */}
                  <h3
                    id={`villa-tour-${room.id}`}
                    className="
                      mb-[14px]

                      font-serif font-normal
                      text-[clamp(22px,2vw,30px)]
                      leading-[1.15]
                      tracking-[-0.03em]
                    "
                  >
                    {t(`rooms.${room.id}.title`)}
                  </h3>

                  {/* Room description */}
                  <p
                    className="
                      max-w-[46ch]
                      font-sans text-[14px]
                      font-normal leading-[1.8]
                      text-text-body
                    "
                  >
                    {t(
                      `rooms.${room.id}.description`,
                      values
                    )}
                  </p>

                  {/* Room information chips */}
                  <ul
                    className="
                      mt-[22px] flex flex-wrap
                      items-center gap-2"
                  >
                    {chipKeys.map((chip) => (
                      <li
                        key={chip}
                        className="
                          inline-flex max-w-full
                          items-center justify-center
                          rounded-[20px]
                          border border-black/25
                          px-3 py-[7px]
                          text-[11px] font-semibold
                          uppercase leading-[1.5]
                          tracking-[0.1em]
                          text-text-label
                          min-[761px]:px-[15px]
                          min-[761px]:py-2 text-[#4a4a44]">
                        {t(
                          `rooms.${room.id}.chips.${chip}`,
                          values
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealOnScroll>
            </article>
          );
        })}
      </div>
    </section>
  );
}