export const distances = [
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
    id: "ciraliChimaera",
    distance: 35,
  },
  {
    id: "antalyaAirport",
    distance: 60,
  },
] as const;

export type DistanceId =
  (typeof distances)[number]["id"];