import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MuiContainer from "@mui/material/Container"; // Renamed to avoid conflict
import { ComponentFactory } from "@/utils/lib/ComponentFactory";
import { ComponentDataProps, ComponentProps } from "@/utils/lib/CommonProps";

const Container = ({ data }: ComponentDataProps) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <MuiContainer className="container m-auto py-4 px-0">
        {data?.fields?.container?.map((item: ComponentProps, index: number) => {
          const componentType = item.sys.contentType.sys.id;
          const Component = ComponentFactory[
            componentType
          ] as unknown as React.ComponentType<{ data: typeof item }>;

          return (
            <div key={index} className="Container">
              {Component && <Component data={item} />}
            </div>
          );
        })}
      </MuiContainer>
     
    </React.Fragment>
  );
};

export default Container;
