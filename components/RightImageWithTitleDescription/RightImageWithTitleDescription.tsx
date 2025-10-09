import React from "react";
import RightSideImage from "./Variants/RightSideImage";
import { ComponentDataProps, ComponentProps } from "@/utils/lib/CommonProps";

const VARIANTS: Record<
  string,
  React.FC<{ data: ComponentProps }>
> = {
  "Right Image": RightSideImage,
};

const RightImageWithTitleDescription = ({
  data,
}: ComponentDataProps) => {
  const variant = data?.fields?.variants?.[0];
  const Component = VARIANTS[variant];

  return <div className="container m-auto"><Component data={data} /></div>;
};

export default RightImageWithTitleDescription;
