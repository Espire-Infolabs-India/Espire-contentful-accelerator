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
import '../Header/header.css'

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
              <Link href={"/"}>
                <Image
                  className="mr-4"
                  src={`https://${data?.fields?.image?.fields?.file?.url}`}
                  width={100}
                  height={70}
                  alt="Logo"
                  unoptimized
                />
              </Link>
            )}

            {/* Center Section - Search Box & Navigation */}
            <div className="flex items-center justify-evenly gap-8">
              <SearchBox />

              <nav className={`hidden relative lg:block header-menu-font-size`}>
                <ul className={`flex [&_a]:px-6`}>
                  {primarycomponents?.map((component: ComponentProps) => {
                    if (!component?.sys?.contentType?.sys?.id) return null;

                    const ComponentType =
                      HeaderComponents[component?.sys?.contentType?.sys?.id];

                    if (!ComponentType) return null;

                    return (
                      <li
                        className="group cursor-pointer py-2 rounded-t-[5px] hover:bg-white first:hover:bg-opacity-0 text-white first:hover:text-white hover:text-gray-600"
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

              <div className="flex lg:hidden relative">
                <Button onClick={HumbargarOpen}>
                  <Image src={HumbargarBG} className="w-[20] h-[20]" alt="" />
                </Button>
                {ActiveValue == true ? (
                  <div className="bg-[var(--royalblue)] w-full h-full shadow fixed top-0 right-0 z-30 p-4 overflow-y-auto">
                    <div className="flex justify-end">
                      <Button onClick={HumbargarClose}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="size-8 text-white"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18 18 6M6 6l12 12"
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
                            className="cursor-pointer text-1xl py-2 rounded-t-[5px] lg:hover:bg-white text-white "
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
                ) : (
                  ""
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
