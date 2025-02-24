import { FooterComponentsProps, FooterDataProps } from "./FooterProps";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import RichtextRenderOptions from "@/common/RTE/RichTextRenderOptions";
import { Document } from "@contentful/rich-text-types";
import SocialMedia from "../SocialMedia/SocialMedia"; 
import LinkList from "../LinkList/LinkList"; 

const FooterComponents: Record<
  string,
  React.FC<{ data: FooterComponentsProps }>
> = { 
  componentSocialMedia: SocialMedia,
  componentLinkList: LinkList
};

const Footer = ({ data }: FooterDataProps) => {
  const components = data?.fields?.componentContainer ?? [];
  
  return (
    <footer className="bg-blue-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Logo & Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          {/* Logo */}
          <div className="mb-6 md:mb-0">
            <a href="/" title="Home">
              <img
                className="mb-5 h-12"
                src={`https://${data?.fields?.image?.fields?.file?.url}`}
                alt="logo"
                loading="lazy"
              />
            </a>
          </div>

          {/* Navigation Links */}
          <div className=" flex flex-col gap-12">
            {components.map((component, index) => {
              const Component = FooterComponents[component?.sys?.contentType?.sys?.id];
              return (
                <div className="px-4" key={index}>
                  <Component key={index} data={component} />
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

        {/* Copyright */}
        <p className="text-center text-sm border-t border-gray-500 mt-6 pt-4">
          {data?.fields?.copyrightText}
        </p>

      </div>
    </footer>
  );
};

export default Footer;
