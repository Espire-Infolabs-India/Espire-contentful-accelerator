import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { ComponentDataProps, ComponentProps } from "@/utils/lib/CommonProps";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const Map: React.FC<ComponentDataProps> = ({ data }) => {
  const marker = data?.fields?.marker?.fields?.file?.url;
  const locations =
    data?.fields?.addressCollection?.map(
      (addressItem: ComponentProps, index: number) => {
        return {
          id: index,
          lat: addressItem?.fields?.location?.lat,
          lon: addressItem?.fields?.location?.lon,
          title: addressItem?.fields?.title,
        };
      }
    ) || [];

  type location = {
    id: string;
    lat: number;
    lon: number;
    title: string;
  };

  const center = { lat: locations[0].lat, lng: locations[0].lon };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string,
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={18}>
      {locations.map((loc: location) => (
        <Marker
          key={loc.id}
          position={{ lat: loc.lat, lng: loc.lon }}
          title={loc.title}
          icon={{
            url: marker,
            scaledSize: new window.google.maps.Size(40, 40),
          }}
        />
      ))}
    </GoogleMap>
  );
};

export default Map;
