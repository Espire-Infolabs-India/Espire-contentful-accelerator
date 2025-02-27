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
  React.FC<{ data: FooterComponentsProps }>
> = {
  componentLinkList: LinkList,
};

const MiddleLayerFooterComponents: Record<
  string,
  React.FC<{ data: MiddleLayerFooterComponentsProps }>
> = {
  componentSocialMedia: SocialMedia,
};

const Footer = ({ data }: FooterDataProps) => {
  const toplayercomponents = data?.fields?.topLayerContainer ?? [];
  const middlelayercomponents = data?.fields?.middleLayerContainer ?? [];

  return (
    <footer className="bg-blue-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Logo & Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="mb-6 md:mb-0">
          <Link href="/" title="Home">
            <Image
              className="mb-5 w-24"
              src={`https://${data?.fields?.image?.fields?.file?.url}`}
              width={600}
              height={400}
              alt="logo"
              loading="lazy"
            />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className=" flex flex-col gap-12">
            {toplayercomponents.map((toplayercomponent, index) => {
              const Component =
                FooterComponents[toplayercomponent?.sys?.contentType?.sys?.id];
              return (
                <div className="px-4" key={index}>
                  <Component key={index} data={toplayercomponent} />
                </div>
              );
            })}
          </div>

        
        </div>

        {/* Address Section */}
        <div className="mt-6 text-center md:text-left">
          <p className="text-sm text-gray-300">
            {documentToReactComponents(
              data?.fields?.address as unknown as Document,
              RichtextRenderOptions
            )}
          </p>
        </div>
          {/* Social Links */}
          <div className=" flex flex-col gap-12">
            {middlelayercomponents.map((middlelayercomponent, index) => {
              const MiddleLayersComponent =
                MiddleLayerFooterComponents[
                  middlelayercomponent?.sys?.contentType?.sys?.id
                ];
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

        {/* Copyright */}
        <p className="text-left text-sm border-t border-gray-500 mt-6 pt-4">
          {data?.fields?.copyrightText}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
