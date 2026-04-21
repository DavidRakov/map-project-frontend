import { useEffect } from "react";
import { MapContainer, TileLayer, useMapEvents, useMap } from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addPendingCoordinate } from "../../store/slices/polygonSlice";
import {
  addPendingObject,
  cancelPlacingObject,
  clearFlyTarget,
} from "../../store/slices/objectSlice";
import PolygonLayer from "./PolygonLayer";
import ObjectLayer from "./ObjectLayer";
import "leaflet/dist/leaflet.css";

const CENTER: [number, number] = [32.0853, 34.7818];

const GeolocateUser = () => {
  const map = useMap();

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        map.setView([latitude, longitude], 14);
      },
      () => {
        console.warn("לא ניתן לקבל מיקום, משתמשים בברירת מחדל");
      }
    );
  }, [map]);

  return null;
};

const FlyToHandler = () => {
  const dispatch = useAppDispatch();
  const map = useMap();
  const flyTarget = useAppSelector((s) => s.objects.flyTarget);

  useEffect(() => {
    if (!flyTarget) return;
    map.flyTo(flyTarget, Math.max(map.getZoom(), 15));
    dispatch(clearFlyTarget());
  }, [flyTarget, map, dispatch]);

  return null;
};

const DrawingHandler = () => {
  const dispatch = useAppDispatch();
  const isDrawing = useAppSelector((s) => s.polygons.isDrawing);
  const { isPlacingObject, placingTemplate } = useAppSelector((s) => s.objects);

  useMapEvents({
    click(e) {
      if (isPlacingObject && placingTemplate) {
        dispatch(
          addPendingObject({
            name: placingTemplate.name,
            symbolType: placingTemplate.symbolType,
            geometry: {
              type: "Point",
              coordinates: [e.latlng.lng, e.latlng.lat],
            },
          })
        );
        dispatch(cancelPlacingObject());
        return;
      }
      if (!isDrawing) return;
      dispatch(addPendingCoordinate([e.latlng.lat, e.latlng.lng]));
    },
  });

  return null;
};

const MapView = () => {
  return (
    <MapContainer
      center={CENTER}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeolocateUser />
      <FlyToHandler />
      <DrawingHandler />
      <PolygonLayer />
      <ObjectLayer />
    </MapContainer>
  );
};

export default MapView;
