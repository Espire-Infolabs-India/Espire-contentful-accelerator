"use client";
import Image from "next/image";
import NavigationLinks from "../NavigationItems/NavigationItems";
import SearchBox from "../SearchBox/SearchBox";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import LinkList from "../LinkList/LinkList";
import NavigationItems from "../NavigationItems/NavigationItems";
import { ComponentDataProps, ComponentProps } from "@/utils/lib/CommonProps";
import { Button } from "@mui/material";
import HumbargarBG from "../../public/menu-mobile.svg";
import { useState } from "react";
import Link from "next/link";

const HeaderComponents: Record<
  string,
  React.FC<{ data: ComponentProps }> | undefined
> = {
  componentNavigationItems: NavigationLinks,
  componentSearchBox: SearchBox,
  componentLanguageSelector: LanguageSelector,
  componentLinkList: LinkList,
};

const Header = ({ data }: ComponentDataProps) => {
  const [ActiveValue, setActiveValue] = useState(false);
  if (!data || !data.fields) return null; // Prevents errors if `data` is undefined

  const primarycomponents = data.fields.primaryNavigation ?? [];
  const secondarycomponents = data.fields.secondaryNavigation ?? [];
  const HumbargarOpen = () => {
    setActiveValue(true);
  };
  const HumbargarClose = () => {
    setActiveValue(false);
  };
  return (
    <div className="header-bg">
      <header className="pt-4 pl-2 pr-2 pb-2 container m-auto">
        {/* Right Section - Secondary Navigation & Language Selector */}
        <div className="flex justify-center lg:block">
          <div className="hidden lg:flex items-center lg:justify-end mb-1">
            <div className="flex items-center gap-6 header-menu-font-size">
              {secondarycomponents?.map(
                (component: ComponentProps, index: number) => {
                  if (!component?.sys?.contentType?.sys?.id) return null;
                  const Component =
                    HeaderComponents[component?.sys?.contentType?.sys?.id];
                  if (!Component) return null;
                  return <Component key={index} data={component} />;
                }
              )}
            </div>
          </div>
          {/* Left Section - Logo */}
          <div className="flex items-center justify-between">
            {data.fields.image?.fields?.file?.url && (
              <Link href="/" aria-label="Home">
                <Image
                  className="mr-4"
                  src={`https://${data.fields.image.fields.file.url}`}
                  width={100}
                  height={70}
                  alt={
                    data.fields.image.fields.alt ||
                    data.fields.image.fields.title ||
                    "Logo"
                  }
                  loading="eager"
                  priority={true}
                  sizes="(max-width: 768px) 80px, 100px"
                />
              </Link>
            )}
            {/* Center Section - Search Box & Navigation */}
            <div className="flex items-center justify-evenly gap-8">
              <SearchBox />
              <nav
                className={`hidden relative lg:block header-menu-font-size top-menu`}
              >
                <ul className={`flex [&_a]:px-6`}>
                  {primarycomponents?.map((component: ComponentProps) => {
                    if (!component?.sys?.contentType?.sys?.id) return null;
                    const ComponentType =
                      HeaderComponents[component?.sys?.contentType?.sys?.id];
                    if (!ComponentType) return null;
                    const dropdownActive = component?.fields?.subLinks
                      ? "hover:bg-white hover:text-gray-600"
                      : "";

                    return (
                      <li
                        className={`group cursor-pointer py-2 rounded-t-[5px] text-white ${dropdownActive}`}
                        key={component?.sys?.contentType?.sys?.id}
                      >
                        {component?.fields && (
                          <NavigationItems data={component} />
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>
              {/* Mobile Hamburger Menu */}
              <div className="flex lg:hidden relative">
                <Button onClick={HumbargarOpen} aria-label="Open menu">
                  <Image
                    src={HumbargarBG}
                    className="w-[20px] h-[20px]"
                    alt="Menu"
                  />
                </Button>
                {ActiveValue && (
                  <div className="bg-[var(--royalblue)] w-full h-full shadow fixed top-0 right-0 z-30 p-4 overflow-y-auto">
                    <div className="flex justify-end">
                      <Button onClick={HumbargarClose} aria-label="Close menu">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-8 h-8 text-white"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </Button>
                    </div>
                    <ul className="flex flex-col">
                      {primarycomponents?.map((component: ComponentProps) => {
                        if (!component?.sys?.contentType?.sys?.id) return null;
                        const ComponentType =
                          HeaderComponents[
                            component?.sys?.contentType?.sys?.id
                          ];
                        if (!ComponentType) return null;
                        return (
                          <li
                            className="cursor-pointer text-lg py-2 rounded-t-[5px] text-white"
                            key={component?.sys?.contentType?.sys?.id}
                          >
                            {component?.fields && (
                              <NavigationItems data={component} />
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
