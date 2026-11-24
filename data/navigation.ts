export const navigationItems = [
  {
    key: "index",
    href: "/",
  },
  {
    key: "hakkimizda",
    href: "/hakkimizda",
  },
  {
    key: "hospitality",
    href: "/hospitality",
  },
  {
    key: "experiences",
    href: "/experiences",
  },
  {
    key: "villas",
    href: "/villas",
  },
  {
    key: "gallery",
    href: "/gallery",
  },
  {
    key: "blog",
    href: "/blog",
  },
  {
    key: "contact",
    href: "/contact",
  },
] as const;

export type NavigationKey =
  (typeof navigationItems)[number]["key"];