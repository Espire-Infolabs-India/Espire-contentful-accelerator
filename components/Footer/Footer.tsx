import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import RichtextRenderOptions from "@/common/RTE/RichTextRenderOptions";
import { Document } from "@contentful/rich-text-types";
import SocialMedia from "../SocialMedia/SocialMedia";
import LinkList from "../LinkList/LinkList";
import Image from "next/image";
import Link from "next/link";
import { ComponentDataProps, ComponentProps } from "@/utils/lib/CommonProps";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

const FooterComponents: Record<
  string,
  React.FC<{ data: ComponentProps }> | undefined
> = {
  componentLinkList: LinkList,
};

const MiddleLayerFooterComponents: Record<
  string,
  React.FC<{ data: ComponentProps }> | undefined
> = {
  componentSocialMedia: SocialMedia,
};

const Footer = ({ data }: ComponentDataProps) => {
  if (!data || !data.fields) return null; // Prevents errors if `data` is undefined

  const toplayercomponents = data?.fields?.topLayerContainer ?? [];
  const middlelayercomponents = data?.fields?.middleLayerContainer ?? [];

  // Function to dynamically generate alt text for images
  const generateAltText = (imageData: any, defaultText: string) => {
    if (imageData?.fields?.title) {
      return imageData?.fields?.title; // Use title if available
    }
    return defaultText; // Default alt text if no title is found
  };

  return (
    <footer className="bg-[var(--royalblue)] text-white pt-[20px] pb-[80px]">
      <div className="container mx-auto px-6">
        {/* Logo & Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="mb-6 md:mb-0">
            {data.fields.image?.fields?.file?.url && (
              <Link href="/" title="Home">
                <Image
                  className="w-24"
                  src={`https://${data?.fields?.image?.fields?.file?.url}`}
                  width={90}
                  height={69}
                  alt={generateAltText(data.fields.image, "Footer Logo")} // Dynamic alt text
                  loading="lazy"
                  unoptimized
                />
              </Link>
            )}
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col lg:flex-row items-center gap-12 text-[16px]">
            {toplayercomponents?.map(
              (toplayercomponent: ComponentProps, index: number) => {
                if (!toplayercomponent?.sys?.contentType?.sys?.id) return null;

                const Component =
                  FooterComponents[
                    toplayercomponent?.sys?.contentType?.sys?.id
                  ];
                if (!Component) return null;

                return (
                  <div className="px-4" key={index}>
                    <Component key={index} data={toplayercomponent} />
                  </div>
                );
              }
            )}
            <span className="hidden lg:block">
              <IconButton size="large">
                <SearchIcon className="text-white" />
              </IconButton>
            </span>
          </div>
        </div>

        {/* Address Section */}
        <div className="mt-12 flex flex-col lg:flex-row justify-between md:text-left t">
          <div className="text-sm text-white text-center lg:text-left mb-5 lg:mb-0">
            {data?.fields?.address &&
              documentToReactComponents(
                data?.fields?.address as unknown as Document,
                RichtextRenderOptions
              )}
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-12 mb-5 lg:mb-0">
            {middlelayercomponents?.map(
              (middlelayercomponent: ComponentProps, index: number) => {
                if (!middlelayercomponent?.sys?.contentType?.sys?.id)
                  return null;
                const MiddleLayersComponent =
                  MiddleLayerFooterComponents[
                    middlelayercomponent?.sys?.contentType?.sys?.id
                  ];
                if (!MiddleLayersComponent) return null;

                return (
                  <div key={index}>
                    <MiddleLayersComponent
                      key={index}
                      data={middlelayercomponent}
                    />
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* Copyright */}
        {data?.fields?.copyrightText && (
          <p className="text-center lg:text-left text-sm border-t border-gray-500 mt-4 pt-2">
            {data?.fields?.copyrightText}
          </p>
        )}
      </div>
    </footer>
  );
};

export default Footer;
