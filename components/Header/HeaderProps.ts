import { ContentTypeProps, ImageProps } from "@/utils/lib/CommonProps";
import { NavigationItemsProps } from "../Navigation Items/NavigationItemsProps";
import { SearchBoxProps } from "../SearchBox/SearchBoxProps";
import { LanguageSelectorProps } from "../LanguageSelector/LanguageSelectorProps";

export type HeaderProps = {
  fields: {
    primaryNavigation: NavigationComponentsProps[];
    secondaryNavigation: NavigationComponentsProps[];
    image: ImageProps;
  };
  sys: ContentTypeProps;
};
export type NavigationComponentsProps = NavigationItemsProps & SearchBoxProps & LanguageSelectorProps;

export type HeaderDataProps = {
  data: HeaderProps;
};
