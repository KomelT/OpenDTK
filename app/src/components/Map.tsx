import { useCallback, useEffect, useRef, useState } from 'react';

import MapLibre, { type MapRef, type ViewStateChangeEvent, NavigationControl, GeolocateControl } from 'react-map-gl/maplibre';

import { Popup } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import MaplibreInspect from '@maplibre/maplibre-gl-inspect';
import '@maplibre/maplibre-gl-inspect/dist/maplibre-gl-inspect.css';

import { ButtonControl } from "../ButtonControl";

import { openDTK } from "../styles/openDTK";

/*
import { TopoScale } from "../TopoScale/topoScale";
import "../TopoScale/style.css";
*/

// Maplibre example: https://github.com/visgl/react-map-gl/blob/master/examples/maplibre/side-by-side/src/app.tsx

export function MapC() {
  const [viewState, setViewState] = useState({
    longitude: 13.733635,
    latitude: 45.842433,
    zoom: 14,
  });

  const [tandem, setTandem] = useState(false);

  function buttonControlClick() {
    setTandem((prevTandem) => {
      return !prevTandem;
    });
  }

  const onMove = useCallback((evt: ViewStateChangeEvent) => setViewState(evt.viewState), []);

  const firstMap = useRef<MapRef | null>(null);
  const secondMap = useRef<MapRef | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (secondMap.current) {
      secondMap.current.addControl(new MaplibreInspect({
        popup: new Popup({ closeOnClick: false }),
        showInspectMap: true,
        showInspectButton: false,
      }));
    }
  }, [secondMap.current]);

  return (
    <div style={{ display: "flex", height: '100%' }}>
      <MapLibre
        ref={firstMap}
        {...viewState}
        onMove={onMove}
        style={{ width: tandem ? "50vw" : "100vw", height: "100vh" }}
        mapStyle={openDTK}
      >
        <ButtonControl action={buttonControlClick} />
        <NavigationControl />
        <GeolocateControl />
      </MapLibre>
      {tandem && (<MapLibre
        ref={secondMap}
        {...viewState}
        onMove={onMove}
        style={{ width: "50vw", height: "100vh" }}
        mapStyle={`${import.meta.env.VITE_TILEMAKER_SERVER_URL}/style.json`}
      >
        <NavigationControl />
        <GeolocateControl />
      </MapLibre>)}
    </div>
  );
}