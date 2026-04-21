import { Polygon, Polyline, CircleMarker } from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setSelectedPolygon } from "../../store/slices/polygonSlice";
import { geoJsonCoordsToLeaflet } from "../../utils/geoUtils";
import { markLayerClick } from "../../utils/layerClickGuard";

const PolygonLayer = () => {
  const dispatch = useAppDispatch();
  const { items, pendingCoordinates, selectedId } = useAppSelector(
    (s) => s.polygons
  );

  return (
    <>
      {items.map((polygon) => (
        <Polygon
          key={polygon.id}
          positions={geoJsonCoordsToLeaflet(polygon.geometry.coordinates)}
          pathOptions={{
            color: selectedId === polygon.id ? "#ff4444" : "#3388ff",
            weight: selectedId === polygon.id ? 3 : 2,
          }}
          eventHandlers={{
            click: () => {
              markLayerClick();
              dispatch(setSelectedPolygon(polygon.id ?? null));
            },
          }}
        />
      ))}

      {pendingCoordinates.length > 1 && (
        <Polyline
          positions={pendingCoordinates}
          pathOptions={{ color: "#ff9800", dashArray: "6" }}
        />
      )}
      {pendingCoordinates.map((coord) => (
        <CircleMarker
          key={`${coord[0]}-${coord[1]}`}
          center={coord}
          radius={5}
          pathOptions={{ color: "#ff9800" }}
        />
      ))}
    </>
  );
};

export default PolygonLayer;
