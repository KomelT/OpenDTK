import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import { useEffect, useRef } from "react";

import { openDtkStyle } from "../MapLibreStyle";

export function MapC() {
  const map = useRef<maplibregl.Map | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!map || !mapRef || !mapRef.current) return undefined;
    if (map.current) return undefined;

    map.current = new maplibregl.Map({
      container: mapRef.current,
      style: openDtkStyle,
      center: [13.733635, 45.842433],
      zoom: 14,
      maplibreLogo: true,
    });
  });

  return (
    <>
      <div
        id="map-container"
        ref={mapRef}
        style={{ height: "100vh", width: "100vw" }}
      />
    </>
  );
}