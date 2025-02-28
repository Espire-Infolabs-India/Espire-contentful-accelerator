import { ContentTypeProps, ImageProps } from "@/utils/lib/CommonProps";
import { NavigationItemsProps } from "../NavigationItems/NavigationItemsProps";
import { SearchBoxProps } from "../SearchBox/SearchBoxProps";
import { LanguageSelectorProps } from "../LanguageSelector/LanguageSelectorProps";
import { LinkListItemsProps } from "../LinkList/LinkListProps";

export type HeaderProps = {
  fields: {
    primaryNavigation: NavigationComponentsProps[];
    secondaryNavigation: NavigationComponentsProps[];
    image: ImageProps;
  };
  sys: ContentTypeProps;
};
export type NavigationComponentsProps = NavigationItemsProps &
  SearchBoxProps &
  LanguageSelectorProps &
  LinkListItemsProps;

export type HeaderDataProps = {
  data: HeaderProps;
};
