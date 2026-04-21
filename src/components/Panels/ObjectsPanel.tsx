import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  startPlacingObject,
  cancelPlacingObject,
  clearError,
} from "../../store/slices/objectSlice";
import { saveObjects, removeObject } from "../../store/thunks/objectThunks";
import {
  SYMBOL_TYPES,
  SYMBOL_LABELS,
  type SymbolType,
} from "../../constants/symbolTypes";

const ObjectsPanel = () => {
  const dispatch = useAppDispatch();
  const { items, pendingObjects, selectedId, isPlacingObject, loading, error } = useAppSelector(
    (s) => s.objects
  );
  const [symbolType, setSymbolType] = useState<SymbolType>(SYMBOL_TYPES.MARKER);

  const locked = loading || !!error;

  const handleAdd = () => {
    if (isPlacingObject) {
      dispatch(cancelPlacingObject());
      return;
    }
    dispatch(
      startPlacingObject({
        name: `Object ${items.length + pendingObjects.length + 1}`,
        symbolType,
      })
    );
  };

  const handleSave = () => {
    if (pendingObjects.length === 0) return;
    dispatch(saveObjects(pendingObjects));
  };

  const handleDelete = () => {
    if (selectedId) dispatch(removeObject(selectedId));
  };

  return (
    <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
        Objects
      </Typography>
      <FormControl size="small" fullWidth sx={{ mb: 1 }}>
        <InputLabel>Object type</InputLabel>
        <Select
          value={symbolType}
          label="Object type"
          onChange={(e) => setSymbolType(e.target.value as SymbolType)}
        >
          {Object.values(SYMBOL_TYPES).map((type) => (
            <MenuItem key={type} value={type}>
              {SYMBOL_LABELS[type]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Stack direction="row" spacing={1}>
        <Button
          variant={isPlacingObject ? "contained" : "outlined"}
          color={isPlacingObject ? "warning" : "primary"}
          size="small"
          onClick={handleAdd}
          disabled={locked}
        >
          {isPlacingObject ? "Cancel" : "Add"}
        </Button>
        <Button
          variant="outlined"
          color="success"
          size="small"
          onClick={handleSave}
          disabled={pendingObjects.length === 0 || locked}
          startIcon={loading ? <CircularProgress size={12} /> : undefined}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={handleDelete}
          disabled={!selectedId || locked}
        >
          Delete
        </Button>
      </Stack>
      {isPlacingObject && !error && (
        <Typography variant="caption" color="warning.main" sx={{ mt: 1, display: "block" }}>
          Click map to place object
        </Typography>
      )}
      {pendingObjects.length > 0 && !error && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
          {pendingObjects.length} pending — click Save to persist
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

export default ObjectsPanel;
