import { villaConfig } from "@/data/villas";

export const figuresConfig = {
  about: [
    {
      id: "garden",
      value: 20000,
    },
    {
      id: "villas",
      value: villaConfig.count,
    },
    {
      id: "livingArea",
      value: villaConfig.specs.livingArea,
    },
    {
      id: "capacity",
      value: villaConfig.specs.capacity,
    },
  ],

  villas: [
    {
      id: "livingArea",
      value: villaConfig.specs.livingArea,
    },
    {
      id: "bedrooms",
      value: villaConfig.specs.bedrooms,
    },
    {
      id: "bathrooms",
      value: villaConfig.specs.bathrooms,
    },
    {
      id: "balconies",
      value: villaConfig.specs.balconies,
    },
  ],
} as const;

export type FiguresVariant = keyof typeof figuresConfig;