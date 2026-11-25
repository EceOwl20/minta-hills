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