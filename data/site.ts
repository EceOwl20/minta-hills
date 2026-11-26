import type { routing } from "@/i18n/routing";

type Locale = (typeof routing.locales)[number];

export const siteConfig = {
  name: "Minta Hills",
  logo: "/images/branding/logo-crest.png",
  url: "https://mintahills.com",

  connexease: {
    messengerId: "7cc8027f-e833-435e-b40f-230f07e38f8f",
  },

  phone: {
    display: "+90 242 212 02 94",
    href: "tel:+902422120294",
    whatsapp: "902422120294",
  },

  email: "info@mintahills.com",

reservation: {
  urls: {
    tr: "https://minta-hills-kemer.rezervasyonal.com/",
    en: "https://minta-hills-kemer.rezervasyonal.com/en/",
    de: "https://minta-hills-kemer.rezervasyonal.com/en/",
    ru: "https://minta-hills-kemer.rezervasyonal.com/ru/",
  } satisfies Record<Locale, string>,
},

  address: {
    street: "Arslanbucak Mah. 282. Sok. No:10",
    district: "Kemer",
    city: "Antalya",
    country: "Türkiye",
  },

  tourismLicense: "07-3022",

  social: {
    instagram: "https://www.instagram.com/mintahillskemer/",
    whatsapp: "https://wa.me/902422120294",
  },
} as const;
