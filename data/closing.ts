type ClosingAction = "villas" | "reservation";

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
} as const satisfies Record<string, ClosingConfig>;

export type ClosingVariant = keyof typeof closingConfig;