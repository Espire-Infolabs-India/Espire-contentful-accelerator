import React from "react";
import {
  TabsDataProps,
  TabsProps,
} from "./TabsProps";
import Horizontal from "./Variants/Horizontal";
import Vertical from "./Variants/Vertical";

const VARIANTS: Record<
  string,
  React.FC<{ data: TabsProps }>
> = {
  "Horizontal": Horizontal,
  "Vertical": Vertical,
};

const Tabs = ({
  data,
}: TabsDataProps) => {
  const variant = data?.fields?.variants?.[0];
  const Component = VARIANTS[variant];

  return <Component data={data} />;
};

export default Tabs;
