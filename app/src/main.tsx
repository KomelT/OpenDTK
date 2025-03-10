import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { MapC } from "./components/Map";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MapC />
  </StrictMode>
);
