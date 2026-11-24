import { villaConfig } from "./villas";

export const aboutFigures = [
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
] as const;

export const aboutSeasons = [
  {
    id: "winter",
    image: "/images/exteriors/villa-night.jpg",
  },
  {
    id: "summer",
    image: "/images/exteriors/pool-2.jpg",
  },
] as const;