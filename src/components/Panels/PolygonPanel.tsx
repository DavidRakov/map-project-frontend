import {
  Box,
  Button,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setDrawing, clearPending, clearError } from "../../store/slices/polygonSlice";
import {
  savePolygon,
  removePolygon,
  removeAllPolygons,
} from "../../store/thunks/polygonThunks";
import { leafletLatLngsToGeoJson } from "../../utils/geoUtils";
import { LatLng } from "leaflet";

const PolygonPanel = () => {
  const dispatch = useAppDispatch();
  const { isDrawing, pendingCoordinates, selectedId, items, loading, error } = useAppSelector(
    (s) => s.polygons
  );

  const locked = loading || !!error;

  const handleAdd = () => dispatch(setDrawing(true));
  const handleCancel = () => dispatch(clearPending());

  const handleSave = () => {
    if (pendingCoordinates.length < 3) return;
    const latLngs = pendingCoordinates.map(([lat, lng]) => new LatLng(lat, lng));
    dispatch(
      savePolygon({
        name: `Polygon ${items.length + 1}`,
        geometry: {
          type: "Polygon",
          coordinates: leafletLatLngsToGeoJson(latLngs),
        },
      })
    );
  };

  const handleDelete = () => {
    if (selectedId) dispatch(removePolygon(selectedId));
    else dispatch(removeAllPolygons());
  };

  return (
    <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
        Polygons
      </Typography>
      <Stack direction="row" spacing={1}>
        {!isDrawing ? (
          <Button variant="outlined" color="primary" size="small" onClick={handleAdd} disabled={locked}>
            Add
          </Button>
        ) : (
          <Button variant="outlined" color="warning" size="small" onClick={handleCancel}>
            Cancel
          </Button>
        )}
        <Button
          variant="outlined"
          color="success"
          size="small"
          onClick={handleSave}
          disabled={pendingCoordinates.length < 3 || locked}
          startIcon={loading ? <CircularProgress size={12} /> : undefined}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={handleDelete}
          disabled={items.length === 0 || locked}
        >
          {selectedId ? "Delete" : "Delete All"}
        </Button>
      </Stack>
      {isDrawing && !error && (
        <Typography variant="caption" color="primary" sx={{ mt: 1, display: "block" }}>
          Click map to add points ({pendingCoordinates.length} points)
        </Typography>
      )}
      {error && (
        <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="caption" color="error">
            {error}
          </Typography>
          <Typography
            variant="caption"
            color="error"
            sx={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => dispatch(clearError())}
          >
            Dismiss
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PolygonPanel;
