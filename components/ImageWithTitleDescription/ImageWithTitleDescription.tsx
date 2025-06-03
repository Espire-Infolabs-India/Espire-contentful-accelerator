import React from "react";
import Default from "./Variants/Default";
import RightSideImage from "./Variants/RightSideImage";
import LeftSideImage from "./Variants/LeftSideImage";
import { ComponentDataProps, ComponentProps } from "@/utils/lib/CommonProps";

const VARIANTS: Record<
  string,
  React.FC<{ data: ComponentProps }>
> = {
  "Left Image": LeftSideImage,
  "Right Image": RightSideImage,
};

const ImageWithTitleDescription = ({
  data,
}: ComponentDataProps) => {
  const variant = data?.fields?.variants?.[0];
  const Component = VARIANTS[variant] || Default;

  return <div className="container m-auto"><Component data={data} /></div>;
};

export default ImageWithTitleDescription;
