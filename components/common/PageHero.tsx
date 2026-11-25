import Image, { type StaticImageData } from "next/image";

import { Link } from "@/i18n/navigation";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type Props = {
  image: string | StaticImageData;
  imageAlt: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  description?: string;

  breadcrumbs?: readonly BreadcrumbItem[];
  breadcrumbLabel?: string;

  meta?: readonly string[];

  height?: "default" | "compact" | "large";

  imagePosition?: "center" | "top" | "bottom";
};

const heightClasses = {
  default: "min-h-[min(76svh,560px)] md:min-h-[min(72svh,620px)]",

  compact: "min-h-[380px] md:min-h-[460px]",

  large: "min-h-[75svh] md:min-h-[85svh]",
} as const;

const imagePositionClasses = {
  center: "object-center",
  top: "object-top",
  bottom: "object-bottom",
} as const;

export default function PageHero({
  image,
  imageAlt,
  title,
  subtitle,
  eyebrow,
  description,
  breadcrumbs,
  breadcrumbLabel,
  meta,
  height = "default",
  imagePosition = "center",
}: Props) {
  return (
    <section
      aria-labelledby="page-hero-heading"
      className={`
        relative isolate flex items-end
        overflow-hidden bg-brand-charcoal
        text-white

        ${heightClasses[height]}
      `}
    >
      {/* Background image */}
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="100vw"
        preload
        className={`
          object-cover
          ${imagePositionClasses[imagePosition]}
        `}
      />

      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 z-10
          bg-[linear-gradient(180deg,rgba(0,0,0,0.52)_0%,rgba(0,0,0,0.18)_38%,rgba(0,0,0,0.58)_74%,rgba(0,0,0,0.8)_100%),linear-gradient(90deg,rgba(0,0,0,0.6),rgba(0,0,0,0.14)_60%,rgba(0,0,0,0)_80%)]
        "
      />

      {/* Hero content */}
      <div
        className="relative z-20 w-full
  px-6 pb-10 pt-[calc(var(--header-height)+40px)]
  animate-hero-enter
  motion-reduce:animate-none
  md:pb-[clamp(65px,9vw,180px)]
  lg:px-[7.5%]
  [text-shadow:0_1px_14px_rgba(0,0,0,0.45)]"
      >
        {/* Breadcrumb navigation */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label={breadcrumbLabel} className="mb-6">
            <ol
              className="
                flex flex-wrap items-center gap-x-2.5 gap-y-2
                text-[11px] font-semibold uppercase
                leading-relaxed tracking-[0.14em]
                text-white/70
              "
            >
              {breadcrumbs.map((item, index) => {
                const isLast = index === breadcrumbs.length - 1;

                return (
                  <li key={index} className="flex items-center gap-2 font-semibold text-[#a9a9a1]">
                    {index > 0 && (
                      <span aria-hidden="true" className="text-white/50">
                        /
                      </span>
                    )}

                    {item.href && !isLast ? (
                      <Link
                        href={item.href}
                        className="
                          text-white transition-opacity
                          hover:opacity-70
                        "
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span aria-current={isLast ? "page" : undefined}>
                        {item.label}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        {/* Eyebrow */}
        {eyebrow && (
          <p
            className="
              mb-5 text-[11px] font-semibold
              uppercase leading-relaxed
              tracking-[0.16em]
              text-white/80
            "
          >
            {eyebrow}
          </p>
        )}

        {/* Page heading */}
        <h1
          id="page-hero-heading"
          className="
    max-w-[850px]
    font-serif font-normal
    text-[clamp(30px,8vw,40px)]
    leading-[1.04]
    tracking-[-0.035em]

    md:text-[clamp(34px,4.2vw,58px)]
  "
        >
          {title}

          {subtitle && (
            <>
              <br />
              <em className="font-normal italic">{subtitle}</em>
            </>
          )}
        </h1>

        {/* Description */}
        {description && (
          <p
            className="
              mt-6 max-w-[650px]
              text-[15px] font-normal
              leading-[1.8] text-white/95

              md:mt-7 md:text-[16px]
            "
          >
            {description}
          </p>
        )}

        {/* Additional information */}
        {meta && meta.length > 0 && (
          <ul
            className="
  mt-[30px] flex max-w-[720px]
  flex-wrap items-center
  gap-x-[22px] gap-y-4

  border-t border-white/30 pt-[26px]

  text-[11px] font-semibold uppercase
  leading-relaxed tracking-[0.1em]
  text-white/85

  md:mt-[44px] md:gap-x-[34px]
"
          >
            {meta.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
