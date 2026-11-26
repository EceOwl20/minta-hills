import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { navigationItems } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { bookingPlatforms } from "@/data/footer";

export default async function Footer() {
  const t = await getTranslations("Footer");
  const tNav = await getTranslations("Header.navigation");

  const footerNavigation = navigationItems.filter(
    (item) => item.key !== "contact"
  );

  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#131313] text-white">
      <div className="mx-auto w-full max-w-[1900px] px-6 lg:px-[7%]">

        {/* Main footer */}
        <div
          className="
            grid grid-cols-1 gap-10 py-14
            md:grid-cols-2 md:gap-12 md:py-16
            xl:grid-cols-[1.6fr_0.65fr_0.95fr_0.65fr]
            xl:gap-[5%] xl:py-[72px]
          "
        >

          {/* Brand */}
          <div className="flex min-w-0 flex-col gap-5">
            <div className="flex items-center gap-5">

              <Link href="/" className="shrink-0">
                <Image
                  src={siteConfig.logo}
                  alt={siteConfig.name}
                  width={132}
                  height={132}
                  className="
                    size-[100px] rounded-sm object-contain
                    lg:size-[120px] 2xl:size-[132px]
                  "
                />
              </Link>

              <div>
                <p
                  className="
                    text-[17px] font-light leading-[1.3]
                    text-white/90 lg:text-[19px]
                  "
                >
                  {t("tagline")}
                  <br />
                  {t("taglineSecond")}
                </p>

                <p
                  className="
                    mt-3 text-[9px] font-normal
                    tracking-[0.17em] text-white/80
                  "
                >
                  {t("location")}
                </p>
              </div>
            </div>

            {/* Tourism license */}
            <div
              className="
                border-t border-white/15 pt-4
                text-[8px] font-normal
                leading-relaxed tracking-[0.08em]
                text-[#7c7c7c]
              "
            >
              <p>{t("ministry")}</p>

              <p className="mt-1 font-medium text-white/85">
                {t("license")}: {siteConfig.tourismLicense}
              </p>
            </div>

            {/* Booking platforms */}
            <div
              aria-label={t("platforms")}
              role="group"
              className="flex flex-wrap items-center gap-2"
            >
              {bookingPlatforms.map((platform) => (
                <a
                  key={platform.id}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={platform.name}
                  className="
                    grid h-[38px] w-[44px]
                    place-items-center rounded-sm
                    border border-white/15
                    bg-white/[0.02]
                    transition-colors duration-200
                    hover:border-white/50 hover:bg-white/10
                  "
                >
                  <Image
                    src={platform.logo}
                    alt=""
                    width={22}
                    height={22}
                    unoptimized
                    className="size-[22px] object-contain"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Explore navigation */}
          <nav
            aria-label={t("footerMenu")}
            className="flex flex-col items-start"
          >
            <h2
              className="
                mb-5 text-[9px] font-medium
                tracking-[0.16em] text-white/60
              "
            >
              {t("explore")}
            </h2>

            <ul className="flex flex-col gap-3">
              {footerNavigation.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="
                      text-[12px] font-light
                      capitalize leading-relaxed
                      text-white/85
                      transition-colors duration-200
                      hover:text-white
                    "
                  >
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="flex min-w-0 flex-col items-start">
            <h2
              className="
                mb-5 text-[10px] font-normal
                tracking-[0.16em] text-white/60
              "
            >
              {t("contact")}
            </h2>

            <address
              className="
                text-[13px] font-light not-italic
                leading-[1.8] text-white/75
              "
            >
              {siteConfig.address.street}
              <br />
              {siteConfig.address.district}
              {" / "}
              {siteConfig.address.city}
            </address>

            <a
              href={siteConfig.phone.href}
              className="
                mt-3 text-[13px] font-light
                text-white/85 transition-colors
                hover:text-white
              "
            >
              {siteConfig.phone.display}
            </a>

            <Link
              href="/contact"
              className="
                group mt-5 inline-flex min-h-[38px]
                max-w-full items-center justify-between gap-3
                rounded-full border border-white/30
                px-4 py-2
                text-[10px] font-light
                leading-relaxed tracking-wider
                transition-colors duration-200
                hover:border-white hover:bg-white
                hover:text-brand-dark
              "
            >
              {t("directions")}

              <svg
                width={14}
                height={14}
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
          </div>

          {/* Social media */}
          <div className="flex flex-col items-start">
            <h2
              className="
                mb-5 text-[9px] font-medium
                tracking-[0.16em] text-white/60
              "
            >
              {t("social")}
            </h2>

            <div className="flex flex-wrap items-center gap-2.5">

              {/* Instagram */}
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("instagram")}
                className="
                  grid size-[42px] place-items-center
                  rounded-full border border-white/20
                  text-white/85
                  transition-colors duration-200
                  hover:border-white hover:bg-white
                  hover:text-brand-dark
                "
              >
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
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                  />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="0.75"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("whatsapp")}
                className="
                  grid size-[42px] place-items-center
                  rounded-full border border-white/20
                  text-white/85
                  transition-colors duration-200
                  hover:border-white hover:bg-white
                  hover:text-brand-dark
                "
              >
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
                >
                  <path
                    d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.5-4.9A8.5 8.5 0 1 1 20.5 11.5Z"
                  />
                  <path
                    d="M8 7.5c-.5.5-.5 2 .5 3.5s2.5 3 4 3.5 2.5.5 3-.5l-2-1.5-1 1c-1.5-.5-3-2-3.5-3.5l1-1-1.5-2Z"
                  />
                </svg>
              </a>

            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div
          className="
            flex flex-col items-start justify-between
            gap-4 border-t border-white/15 py-6
            text-[7px] font-normal
            leading-relaxed tracking-[0.1em]
            text-white/60
            md:flex-row md:items-center 
          "
        >
          <p className="font-light text-[]">
            © {year} MINTA HILLS. {t("rights")}
          </p>

          <Link
            href="/contact"
            className="transition-colors  hover:text-white"
          >
            {t("privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}