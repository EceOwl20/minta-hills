import { getTranslations } from "next-intl/server";

import CountUp from "@/components/common/CountUp";
import {
  figuresConfig,
  type FiguresVariant,
} from "@/data/figures";

import { villaConfig } from "@/data/villas";

type Props = {
  variant?: FiguresVariant;
};

export default async function FiguresSection({
  variant = "about",
}: Props) {
  const t = await getTranslations("FiguresSection");

  const figures = figuresConfig[variant];

  return (
    <section
      id="figures"
      aria-label={t(`labels.${variant}`)}
      className="
        grid grid-cols-2
        border-y border-black/25
        bg-brand-paper text-brand-dark

        lg:grid-cols-4
      "
    >
     {figures.map((item, index) => (
        <div
          key={item.id}
          className={`
            flex min-w-0 flex-col
            items-center justify-center
            px-4 py-[clamp(34px,4vw,58px)]
            text-center

            ${index % 2 === 0
              ? "border-r border-black/25"
              : ""
            }

            ${index < 2
              ? "border-b border-black/25 lg:border-b-0"
              : ""
            }

            ${index === 1
              ? "lg:border-r lg:border-black/25"
              : ""
            }
          `}
        >
          <CountUp
            value={item.value}
            duration={1400}
            className="
              block font-serif font-normal
              text-[clamp(32px,3.4vw,48px)]
              leading-none tracking-[-0.035em]
            "
          />

          <span
            className="
              mt-4 text-[11px] font-semibold
              leading-relaxed tracking-[0.12em]
              text-text-label text-[#4a4a44]
            "
          >
            {item.id === "bathrooms"
  ? t("items.bathrooms", {
      toilets: villaConfig.specs.toilets,
    })
  : t(`items.${item.id}`)}
          </span>
        </div>
      ))}
    </section>
  );
}