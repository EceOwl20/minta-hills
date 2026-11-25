import { getTranslations } from "next-intl/server";

import { siteConfig } from "@/data/site";

import {
  contactChannels,
  type ContactChannelId,
} from "@/data/contact";

type ContactChannelLink = {
  value: string;
  href: string;
};

export default async function ContactChannels() {
  const t = await getTranslations("ContactPage.channels");

  const whatsappUrl = new URL(siteConfig.social.whatsapp);

  whatsappUrl.searchParams.set(
    "text",
    t("whatsapp.message")
  );

  const channelLinks: Record<
    ContactChannelId,
    ContactChannelLink
  > = {
    phone: {
      value: siteConfig.phone.display,
      href: siteConfig.phone.href,
    },

    whatsapp: {
      value: t("whatsapp.value"),
      href: whatsappUrl.toString(),
    },

    email: {
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },

    instagram: {
      value: "@mintahillskemer",
      href: siteConfig.social.instagram,
    },
  };

  return (
    <section
      aria-label={t("ariaLabel")}
      className="
        grid grid-cols-1
        gap-px

        border-b border-black/25
        bg-black/25

        sm:grid-cols-2
        lg:grid-cols-4
      "
    >
      {contactChannels.map((channel) => {
        const link = channelLinks[channel.id];

        return (
          <article
            key={channel.id}
            className="
              flex min-w-0 flex-col
              bg-brand-paper

              px-6 py-9

              md:px-8 md:py-12
              xl:min-h-[234px]
              xl:px-9 xl:py-[52px]
            "
          >
            {/* Channel number and label */}
            <p
              className="
                font-sans
                text-[11px] font-semibold
                uppercase tracking-[0.14em]
                text-text-label
              "
            >
              {channel.number} — {t(`${channel.id}.label`)}
            </p>

            {/* Contact link */}
            <a
              href={link.href}
              target={channel.external ? "_blank" : undefined}
              rel={
                channel.external
                  ? "noopener noreferrer"
                  : undefined
              }
              className="
                mt-7 self-start

                font-serif font-medium
                text-[clamp(22px,1.45vw,28px)]
                leading-[1.15]
                tracking-[-0.025em]

                text-brand-dark
                wrap-break-word
                max-w-full

                transition-colors duration-300

                hover:text-brand-dark/65
                hover:underline
                underline-offset-4

                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-brand-dark

                motion-reduce:transition-none

                md:mt-10
                xl:mt-12
              "
            >
              {link.value}
            </a>

            {/* Channel description */}
            <p
              className="
                mt-3

                font-sans font-normal
                text-[14px]
                leading-[1.7]
                text-text-body
              "
            >
              {t(`${channel.id}.description`)}
            </p>
          </article>
        );
      })}
    </section>
  );
}