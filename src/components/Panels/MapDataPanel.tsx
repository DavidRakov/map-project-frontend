import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setFlyTarget, setSelectedObject } from "../../store/slices/objectSlice";
import { setSelectedPolygon } from "../../store/slices/polygonSlice";
import { polygonCentroid } from "../../utils/geoUtils";

const MapDataPanel = () => {
  const dispatch = useAppDispatch();
  const objects = useAppSelector((s) => s.objects.items);
  const polygons = useAppSelector((s) => s.polygons.items);
  const selectedObjectId = useAppSelector((s) => s.objects.selectedId);
  const selectedPolygonId = useAppSelector((s) => s.polygons.selectedId);

  const rows = [
    ...polygons.map((p) => ({
      type: "polygon" as const,
      id: p.id!,
      name: p.name,
      coords: polygonCentroid(p.geometry.coordinates),
    })),
    ...objects.map((o) => ({
      type: "object" as const,
      id: o.id!,
      name: o.name,
      coords: [o.geometry.coordinates[1], o.geometry.coordinates[0]] as [number, number],
    })),
  ];

  const handleRowClick = (row: typeof rows[number]) => {
    dispatch(setFlyTarget(row.coords));
    if (row.type === "polygon") {
      dispatch(setSelectedPolygon(row.id));
      dispatch(setSelectedObject(null));
    } else {
      dispatch(setSelectedObject(row.id));
      dispatch(setSelectedPolygon(null));
    }
  };

  const isSelected = (row: typeof rows[number]) =>
    row.type === "polygon" ? row.id === selectedPolygonId : row.id === selectedObjectId;

  return (
    <Box sx={{ p: 2, flex: 1, overflow: "auto" }}>
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
        Map Data
      </Typography>
      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: "#f5f5f5" }}>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Lat</strong></TableCell>
              <TableCell><strong>Lon</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ color: "#aaa" }}>
                  No data
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow
                  key={`${row.type}-${row.id}`}
                  hover
                  selected={isSelected(row)}
                  onClick={() => handleRowClick(row)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <span style={{ fontSize: 11, opacity: 0.6 }}>
                        {row.type === "polygon" ? "▣" : "●"}
                      </span>
                      {row.name}
                    </Box>
                  </TableCell>
                  <TableCell>{row.coords[0].toFixed(4)}</TableCell>
                  <TableCell>{row.coords[1].toFixed(4)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MapDataPanel;
