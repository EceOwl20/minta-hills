export const contactHero = {
  image: "/images/hospitality/cafe-3.jpg",
} as const;

export type ContactChannelId =
  | "phone"
  | "whatsapp"
  | "email"
  | "instagram";

type ContactChannelConfig = {
  id: ContactChannelId;
  number: string;
  external: boolean;
};

export const contactChannels = [
  {
    id: "phone",
    number: "01",
    external: false,
  },
  {
    id: "whatsapp",
    number: "02",
    external: true,
  },
  {
    id: "email",
    number: "03",
    external: false,
  },
  {
    id: "instagram",
    number: "04",
    external: true,
  },
] as const satisfies readonly ContactChannelConfig[];

export const contactSubjects = [
  "reservation",
  "villaInformation",
  "availabilityAndPrice",
  "directions",
  "other",
] as const;

export type ContactSubject =
  (typeof contactSubjects)[number];

export const contactFormLimits = {
  name: 100,
  email: 254,
  phone: 30,
  message: 3000,
} as const;

export const contactDetails = {
  addressLines: [
    "Arslanbucak Mah. 282. Sok. No:10",
    "Kemer / ANTALYA",
  ],
  tourismLicense: "07-3022",
} as const;

export const contactMap = {
  embedUrl:
    "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3203.2118660004844!2d30.52347187582912!3d36.59720607230572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzbCsDM1JzQ5LjkiTiAzMMKwMzEnMzMuOCJF!5e0!3m2!1str!2str!4v1717495246889!5m2!1str!2str",

  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=36.5971944%2C30.5260556",
} as const;

export const contactDistances = [
  {
    id: "kemerCenter",
    distance: 4,
  },
  {
    id: "phaselis",
    distance: 12,
  },
  {
    id: "olymposCableCar",
    distance: 18,
  },
  {
    id: "ciraliYanartas",
    distance: 35,
  },
  {
    id: "antalyaAirport",
    distance: 60,
  },
] as const;

export const contactClosing = {
  image: "/images/exteriors/pool-2.jpg",
} as const;