export const villaConfig = {
  count: 8,

  image: "/images/exteriors/villa-night.jpg",

  href: "/villas",

  specs: {
    livingArea: 145,
    capacity: 6,
    kitchens: 1,
    bedrooms: 3,
    toilets: 3,
    bathrooms: 2,
    balconies: 3,
  },

  beds: {
    double: 2,
    single: 2,
  },
} as const;

export const villaEquipment = [
  "ledTv",
  "refrigerator",
  "dishwasher",
  "washingMachine",
  "builtInOven",
  "builtInMicrowave",
  "electricCooktop",
  "filterCoffeeMachine",
  "teaMachineAndKettle",
  "hairDryer",
  "ironAndIroningBoard",
] as const;

export type VillaEquipmentId =
  (typeof villaEquipment)[number];

  export const villasHero = {
  image: "/images/exteriors/villa-1.jpg",
} as const;

type VillaTourRoomConfig = {
  id: string;
  image: string;
};

export const villaTourRooms = [
  {
    id: "living",
    image: "/images/interiors/living.jpg",
  },
  {
    id: "kitchen",
    image: "/images/interiors/kitchen.jpg",
  },
  {
    id: "bedrooms",
    image: "/images/interiors/bedroom.jpg",
  },
  {
    id: "bathrooms",
    image: "/images/interiors/bath.jpg",
  },
  {
    id: "balconies",
    image: "/images/exteriors/villa-2.jpg",
  },
] as const satisfies readonly VillaTourRoomConfig[];

export type VillaTourRoomId =
  (typeof villaTourRooms)[number]["id"];