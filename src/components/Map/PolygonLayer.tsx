import { Polygon, Polyline, CircleMarker } from "react-leaflet";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setSelectedPolygon } from "../../store/slices/polygonSlice";
import { geoJsonCoordsToLeaflet } from "../../utils/geoUtils";

const PolygonLayer = () => {
  const dispatch = useAppDispatch();
  const { items, pendingCoordinates, selectedId } = useAppSelector(
    (s) => s.polygons
  );

  return (
    <>
      {/* פוליגונים שמורים */}
      {items.map((polygon) => (
        <Polygon
          key={polygon.id}
          positions={geoJsonCoordsToLeaflet(polygon.geometry.coordinates)}
          pathOptions={{
            color: selectedId === polygon.id ? "#ff4444" : "#3388ff",
            weight: selectedId === polygon.id ? 3 : 2,
          }}
          eventHandlers={{
            click: () => dispatch(setSelectedPolygon(polygon.id ?? null)),
          }}
        />
      ))}

      {/* פוליגון בציור */}
      {pendingCoordinates.length > 1 && (
        <Polyline
          positions={pendingCoordinates}
          pathOptions={{ color: "#ff9800", dashArray: "6" }}
        />
      )}
      {pendingCoordinates.map((coord, i) => (
        <CircleMarker
          key={i}
          center={coord}
          radius={5}
          pathOptions={{ color: "#ff9800" }}
        />
      ))}
    </>
  );
};

export default PolygonLayer;
