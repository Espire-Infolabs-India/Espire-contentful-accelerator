import { FooterDataProps } from "./FooterProps";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import RichtextRenderOptions from "@/common/RTE/RichTextRenderOptions";
import { Document } from "@contentful/rich-text-types";
const Footer = ({ data }: FooterDataProps) => {
  return (
    <div>
      <div className="component-content">
        <Image
          className="mb-5"
          src={`https://${data?.fields?.image?.fields?.file?.url}`}
          width={600}
          height={400}
          alt={""}
        />
      </div>
      <div className="plain-text-reusable col-12 col-lg-5 d-none d-md-block ">
        <div>
          {documentToReactComponents(
            data.fields.address as unknown as Document,
            RichtextRenderOptions
          )}
        </div>
      </div>
      <div className="component container container-default col-12">
        <div className="component-content">
          <div className="row">
            <div className="component container container-default col-12">
              <div className="component-content">
                <div className="row">
                  <div className="component rich-text col-12 col-lg-12 col-xl-6">
                    <div className="component-content">
                      <p>{data?.fields?.copyrightText}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
