type ClosingAction = "villas" | "reservation" | "gallery";

type ClosingConfig = {
  image: string;
  actions: readonly ClosingAction[];
};

export const closingConfig = {
  about: {
    image: "/images/exteriors/dusk-2.jpg",
    actions: ["villas", "reservation"],
  },

  hospitality: {
    image: "/images/exteriors/hero-2.jpg",
    actions: ["reservation", "villas"],
  },

  experiences: {
    image: "/images/exteriors/dusk-1.jpg",
    actions: ["reservation", "villas"],
  },

    villas: {
    image: "/images/exteriors/hero-4.jpg",
    actions: ["reservation", "gallery"],
  },
} as const satisfies Record<string, ClosingConfig>;

export type ClosingVariant = keyof typeof closingConfig;