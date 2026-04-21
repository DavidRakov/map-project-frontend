import L from "leaflet";

export const createJeepIcon = (): L.DivIcon =>
  L.divIcon({
    html: "🚙",
    className: "",
    iconSize: [50, 50],
    iconAnchor: [25, 25],
  });

export const createDefaultIcon = (): L.Icon =>
  new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
