import React from "react";
import {
  ImageWithTitleDescriptionDataProps,
  ImageWithTitleDescriptionProps,
} from "./ImageWithTitleDescriptionProps";
import Default from "./Variants/Default";
import RightSideImage from "./Variants/RightSideImage";
import LeftSideImage from "./Variants/LeftSideImage";

const VARIANTS: Record<
  string,
  React.FC<{ data: ImageWithTitleDescriptionProps }>
> = {
  "Left Image": LeftSideImage,
  "Right Image": RightSideImage,
};

const ImageWithTitleDescription = ({
  data,
}: ImageWithTitleDescriptionDataProps) => {
  const variant = data?.fields?.variants?.[0];
  const Component = VARIANTS[variant] || Default;

  return <Component data={data} />;
};

export default ImageWithTitleDescription;
