import {
  FooterComponentsProps,
  FooterDataProps,
  MiddleLayerFooterComponentsProps,
} from "./FooterProps";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import RichtextRenderOptions from "@/common/RTE/RichTextRenderOptions";
import { Document } from "@contentful/rich-text-types";
import SocialMedia from "../SocialMedia/SocialMedia";
import LinkList from "../LinkList/LinkList";
import Image from "next/image";
import Link from "next/link";

const FooterComponents: Record<
  string,
  React.FC<{ data: FooterComponentsProps }> | undefined
> = {
  componentLinkList: LinkList,
};

const MiddleLayerFooterComponents: Record<
  string,
  React.FC<{ data: MiddleLayerFooterComponentsProps }> | undefined
> = {
  componentSocialMedia: SocialMedia,
};

const Footer = ({ data }: FooterDataProps) => {
  if (!data || !data.fields) return null; // Prevents errors if `data` is undefined

  const toplayercomponents = data?.fields?.topLayerContainer ?? [];
  const middlelayercomponents = data?.fields?.middleLayerContainer ?? [];

  return (
    <footer className="bg-[#203b72] text-white py-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Logo & Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="mb-6 md:mb-0">
            {data.fields.image?.fields?.file?.url && (
              <Link href="/" title="Home">
                <Image
                  className="mb-5 w-24"
                  src={`https://${data?.fields?.image?.fields?.file?.url}`}
                  width={600}
                  height={400}
                  alt="logo"
                  loading="lazy"
                  unoptimized
                />
              </Link>
            )}
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-12">
            {toplayercomponents?.map((toplayercomponent, index) => {
              if (!toplayercomponent?.sys?.contentType?.sys?.id) return null;

              const Component =
                FooterComponents[toplayercomponent?.sys?.contentType?.sys?.id];
              if (!Component) return null;

              return (
                <div className="px-4" key={index}>
                  <Component key={index} data={toplayercomponent} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Address Section */}
        <div className="mt-6 flex justify-between md:text-left">
          <div className="text-sm text-gray-300">
            {data?.fields?.address &&
              documentToReactComponents(
                data?.fields?.address as unknown as Document,
                RichtextRenderOptions
              )}
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-12">
            {middlelayercomponents?.map((middlelayercomponent, index) => {
              if (!middlelayercomponent?.sys?.contentType?.sys?.id) return null;

              const MiddleLayersComponent =
                MiddleLayerFooterComponents[
                  middlelayercomponent?.sys?.contentType?.sys?.id
                ];
              if (!MiddleLayersComponent) return null;

              return (
                <div className="px-4" key={index}>
                  <MiddleLayersComponent
                    key={index}
                    data={middlelayercomponent}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Copyright */}
        {data?.fields?.copyrightText && (
          <p className="text-left text-sm border-t border-gray-500 mt-6 pt-4">
            {data?.fields?.copyrightText}
          </p>
        )}
      </div>
    </footer>
  );
};

export default Footer;
