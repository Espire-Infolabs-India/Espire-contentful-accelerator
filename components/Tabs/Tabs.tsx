import React from "react";
import { ComponentDataProps, ComponentProps } from "@/utils/lib/CommonProps";
import Horizontal from "./Variants/Horizontal";
import Vertical from "./Variants/Vertical";

const VARIANTS: Record<
  string,
  React.FC<{ data: ComponentProps }>
> = {
  "Horizontal": Horizontal,
  "Vertical": Vertical,
};

const Tabs = ({
  data,
}: ComponentDataProps) => {
  const variant = data?.fields?.variants?.[0];
  const Component = VARIANTS[variant];

  return <Component data={data} />;
};

export default Tabs;
