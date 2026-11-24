import { getTranslations } from "next-intl/server";

import CountUp from "@/components/common/CountUp";
import { aboutFigures } from "@/data/about";

export default async function FiguresSection() {
  const t = await getTranslations(
    "AboutPage.figures"
  );

  return (
    <section
      id="figures"
      aria-label={t("label")}
      className="
        grid grid-cols-2
        border-y border-black/25
        bg-brand-paper text-brand-dark

        lg:grid-cols-4
      "
    >
      {aboutFigures.map((item, index) => (
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
              text-text-label
            "
          >
            {t(item.id)}
          </span>
        </div>
      ))}
    </section>
  );
}