import { ComponentFactory } from "@/utils/lib/ComponentFactory";
import { ComponentDataProps, ComponentProps } from "@/utils/lib/CommonProps";

const Container = ({ data }: ComponentDataProps) => {
  return (
    <div>
      {data?.fields?.container?.map((data: ComponentProps, index: number) => {
        const componentType = data.sys.contentType.sys.id;
        const Component = ComponentFactory[
          componentType
        ] as unknown as React.ComponentType<{ data: typeof data }>;

        return (
          <div key={index} className="Container">
            {Component && <Component key={index} data={data} />}
          </div>
        );
      })}
    </div>
  );
};

export default Container;
