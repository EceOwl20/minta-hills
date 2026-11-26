import { getTranslations } from "next-intl/server";

import { siteConfig } from "@/data/site";
import { contactDetails } from "@/data/contact";

import ContactForm from "./ContactForm";

const detailLabelClassName = `
  mb-1.5

  font-sans text-[11px]
  font-semibold uppercase
  tracking-[0.1em]
  text-text-label
`;

const detailValueClassName = `
  font-sans text-[14px]
  font-normal leading-[1.8]
  text-text-body
`;

export default async function ContactFormSection() {
  const t = await getTranslations("ContactPage.form");

  return (
    <section
      aria-labelledby="contactFormTitle"
      className="
        bg-brand-mist
        text-brand-dark

        py-16
        md:py-20
        xl:py-[104px]
      "
    >
      <div
        className="
          mx-auto grid
          w-[calc(100%_-_40px)]
          max-w-[1640px]

          grid-cols-1
          items-start
          gap-12

          md:w-[85%]

          lg:grid-cols-[0.85fr_1.15fr]
          lg:gap-14

          xl:gap-[84px]
        "
      >
        {/* Left — Contact information */}
        <div className="min-w-0">
          {/* Eyebrow */}
          <p
            className="
              flex items-center gap-3.5

              font-sans text-[11px]
              font-semibold uppercase
              tracking-[0.14em]
              text-text-label
            "
          >
            <span
              aria-hidden="true"
              className="
                h-px w-8 shrink-0
                bg-current
              "
            />

            {t("eyebrow")}
          </p>

          {/* Heading */}
          <h2
            id="contactFormTitle"
            className="
              mt-6

              font-serif font-medium
              text-[clamp(34px,2.4vw,46px)]
              leading-[1.05]
              tracking-[-0.035em]
            "
          >
            {t("title")}

            <em className="block font-medium">
              {t("subtitle")}
            </em>
          </h2>

          {/* Description */}
          <p
            className="
              mt-6

              font-sans text-[14px]
              font-normal
              leading-[1.8]
              text-text-body
            "
          >
            {t("description")}
          </p>

          {/* Contact details */}
          <dl
            className="
              mt-8 space-y-5
              border-t border-black/25
              pt-6

              md:mt-11
            "
          >
            {/* Address */}
            <div>
              <dt className={detailLabelClassName}>
                {t("details.address")}
              </dt>

              <dd className={detailValueClassName}>
                <address className="not-italic">
                  {contactDetails.addressLines.map(
                    (line) => (
                      <span
                        key={line}
                        className="block"
                      >
                        {line}
                      </span>
                    )
                  )}
                </address>
              </dd>
            </div>

            {/* Phone and WhatsApp */}
            <div>
              <dt className={detailLabelClassName}>
                {t("details.phone")}
              </dt>

              <dd className={detailValueClassName}>
                <a
                  href={siteConfig.phone.href}
                  className="
                    transition-colors duration-300
                    hover:text-brand-dark
                    hover:underline

                    focus-visible:outline-2
                    focus-visible:outline-offset-4

                    motion-reduce:transition-none
                  "
                >
                  {siteConfig.phone.display}
                </a>
              </dd>
            </div>

            {/* Tourism licence */}
            <div>
              <dt className={detailLabelClassName}>
                {t("details.license")}
              </dt>

              <dd className={detailValueClassName}>
                {contactDetails.tourismLicense}
              </dd>
            </div>
          </dl>
        </div>

        {/* Right — Contact form */}
        <ContactForm
  enabled={
    process.env.CONTACT_FORM_ENABLED === "true"
  }
/>
      </div>
    </section>
  );
}