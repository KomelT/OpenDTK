import { useControl } from "react-map-gl/maplibre";

export type ButtonControlProps = {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  action: () => void;
};

export function ButtonControl(props: ButtonControlProps) {
  useControl(
    () => ({
      onAdd: () => {
        const container = document.createElement("div");
        container.id = "button-control";
        container.className = "maplibregl-ctrl maplibregl-ctrl-group";
        container.innerHTML = `
          <button class="maplibregl-ctrl-icon" style="background-color: white; color: black;" title="Open / close second map">↔️</button>
        `;
        container.onclick = props.action;
        return container;
      },
      onRemove: () => {
        const control = document.getElementById("button-control");
        if (control) {
          control.remove();
        }
      },
    }),
    { position: props.position },
  );

  return null;
}
