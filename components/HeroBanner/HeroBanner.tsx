import { ComponentDataProps } from "@/utils/lib/CommonProps";
import { parseExperiences } from "@/utils/lib/personalization/MapExperiences";
import { Experience } from "@ninetailed/experience.js-next";
import HeroBannerComponent from "@/components/HeroBanner/HeroBannerComponent";

const HeroBanner = ({ data }: ComponentDataProps) => {
  const parsedExperiences = parseExperiences(data);
  return (
    <>
      <Experience
        id={data?.sys?.id}
        component={HeroBannerComponent}
        {...data}
        experiences={parsedExperiences}
      />
    </>
  );
};

export default HeroBanner;
