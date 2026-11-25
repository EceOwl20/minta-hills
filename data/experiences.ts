export const experiences = [
  {
    id: "garden",
    image: "/images/exteriors/garden-lawn.jpg",
    href: "/experiences",
  },
  {
    id: "pool",
    image: "/images/exteriors/pool-detail.jpg",
    href: "/experiences",
  },
  {
    id: "hospitality",
    image: "/images/hospitality/cafe-3.jpg",
    href: "/hospitality",
  },
] as const;

export const experiencesHero = {
  image: "/images/destinations/tahtali.jpg",
} as const;

export const featuredExperience = {
  id: "tahtali",
  image: "/images/destinations/olympos-plaj.jpg",
  facts: [
    "altitude",
    "cableCar",
    "distance",
  ],
} as const;

type ExperienceCardConfig = {
  id: string;
  image: string;
  wide: boolean;
};

export const destinationExperiences = [
  {
    id: "lycianWay",
    image: "/images/destinations/likya-yolu.jpg",
    wide: true,
  },
  {
    id: "phaselis",
    image: "/images/destinations/phaselis.jpg",
    wide: false,
  },
  {
    id: "cirali",
    image: "/images/destinations/cirali.jpg",
    wide: false,
  },
  {
    id: "chimaera",
    image: "/images/destinations/yanartas.jpg",
    wide: false,
  },
  {
    id: "paragliding",
    image: "/images/destinations/tahtali-zirve.jpg",
    wide: false,
  },
  {
    id: "goynuk",
    image: "/images/destinations/goynuk.jpg",
    wide: false,
  },
  {
    id: "kemerMarina",
    image: "/images/destinations/kemer-marina.jpg",
    wide: true,
  },
] as const satisfies readonly ExperienceCardConfig[];

export type DestinationExperienceId =
  (typeof destinationExperiences)[number]["id"];