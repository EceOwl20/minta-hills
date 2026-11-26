import type {
  AppPathname,
  StaticAppPathname,
} from "@/i18n/routing";

export type MenuItem = {
  href: StaticAppPathname;
  label: string;
};

export type HeaderLabels = {
  homeLinkLabel: string;
  mainMenu: string;
  mobileMenu: string;
  openMenu: string;
  closeMenu: string;
  chooseLanguage: string;
  callUs: string;
  reservation: string;
};

export type HeaderProps = {
  items: MenuItem[];
  labels: HeaderLabels;
};

export type MobileMenuProps = HeaderProps & {
  open: boolean;
  onClose: () => void;
  pathname: AppPathname;
};
