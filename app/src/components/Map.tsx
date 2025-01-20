import { useEffect, useRef } from "react";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import { openDTK } from "../styles/openDTK";

import { TopoScale } from "../TopoScale/topoScale";
import "../TopoScale/style.css";

export function MapC() {
  const map = useRef<maplibregl.Map | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!map || !mapRef || !mapRef.current) return undefined;
    if (map.current) return undefined;

    map.current = new maplibregl.Map({
      container: mapRef.current,
      style: openDTK,
      center: [13.733635, 45.842433],
      zoom: 14,
      maplibreLogo: true,
    });

    const topoScale = new TopoScale();
    map.current.addControl(topoScale);

    topoScale.goToScale(map.current, 25000)
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
