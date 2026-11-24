import { getTranslations } from "next-intl/server";

import { navigationItems } from "@/data/navigation";

import HeaderClient from "./HeaderClient";

export default async function Header() {
  const t = await getTranslations("Header");

  const items = navigationItems.map((item) => ({
    href: item.href,
    label: t(`navigation.${item.key}`),
  }));

  return (
    <>
      <a
        href="#main"
        className="
          fixed -top-24 left-4 z-[100]
          bg-white px-5 py-3
          text-xs font-semibold text-brand-dark
          focus:top-4
        "
      >
        {t("skipToContent")}
      </a>

      <HeaderClient
        items={items}
        labels={{
          homeLinkLabel: t("homeLinkLabel"),
          mainMenu: t("mainMenu"),
          mobileMenu: t("mobileMenu"),
          openMenu: t("openMenu"),
          closeMenu: t("closeMenu"),
          chooseLanguage: t("chooseLanguage"),
          callUs: t("callUs"),
          reservation: t("reservation"),
        }}
      />
    </>
  );
}