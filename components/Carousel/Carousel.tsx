import React from "react";
import HeroBanner from "../HeroBanner/HeroBanner";
import { ComponentDataProps, ComponentProps } from "@/utils/lib/CommonProps";

const Carousel = ({ data }: ComponentDataProps) => {
  return (
    <>
      <h1>{data?.fields?.title}</h1>
      <div className="carousel">
        {data?.fields?.slides?.map((slide: ComponentProps, index: number) => {
          return <HeroBanner key={index} data={slide} />;
        })}
      </div>
    </>
  );
};

export default Carousel;
