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
  if (!data || !data.fields) return null;
  const toplayercomponents = data.fields.topLayerContainer ?? [];
  const middlelayercomponents = data.fields.middleLayerContainer ?? [];
  return (
    <footer className="bg-[var(--royalblue)] text-white pt-[20px] pb-[80px]">
      <div className="container mx-auto px-6">
        {/* Logo & Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="mb-6 md:mb-0">
            {data.fields.image?.fields?.file?.url && (
              <Link href="/" aria-label="Home">
                <Image
                  className="w-24"
                  src={`https://${data?.fields?.image?.fields?.file?.url}`}
                  width={90}
                  height={69}
                  alt={
                    data?.fields?.image?.fields?.title ||
                    data?.fields?.image?.fields?.description ||
                    "Logo"
                  }
                  loading="lazy"
                />
              </Link>
            )}
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-12 text-[16px]">
            {toplayercomponents.map(
              (toplayercomponent: ComponentProps, index: number) => {
                if (!toplayercomponent?.sys?.contentType?.sys?.id) return null;
                const Component =
                  FooterComponents[toplayercomponent.sys.contentType.sys.id];
                if (!Component) return null;
                return (
                  <div className="px-4" key={index}>
                    <Component data={toplayercomponent} />
                  </div>
                );
              }
            )}
            <span className="hidden lg:block">
              <IconButton size="large" aria-label="Search">
                <SearchIcon className="text-white" />
              </IconButton>
            </span>
          </div>
        </div>
        <div className="mt-12 flex flex-col lg:flex-row justify-between md:text-left">
          <div className="text-sm text-white text-center lg:text-left mb-5 lg:mb-0">
            {data.fields.address &&
              documentToReactComponents(
                data?.fields?.address as unknown as Document,
                RichtextRenderOptions
              )}
          </div>
          <div className="flex flex-col gap-12 mb-5 lg:mb-0">
            {middlelayercomponents.map(
              (middlelayercomponent: ComponentProps, index: number) => {
                if (!middlelayercomponent?.sys?.contentType?.sys?.id)
                  return null;

                const MiddleLayersComponent =
                  MiddleLayerFooterComponents[
                    middlelayercomponent?.sys?.contentType?.sys?.id
                  ];
                if (!MiddleLayersComponent) return null;

                return (
                  <MiddleLayersComponent
                    key={index}
                    data={middlelayercomponent}
                  />
                );
              }
            )}
          </div>
        </div>
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
