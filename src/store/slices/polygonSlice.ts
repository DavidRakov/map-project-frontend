import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type PolygonDto } from "../../types";
import {
  fetchPolygons,
  savePolygon,
  removePolygon,
  removeAllPolygons,
} from "../thunks/polygonThunks";

interface PolygonState {
  items: PolygonDto[];
  isDrawing: boolean;
  pendingCoordinates: [number, number][];
  selectedId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: PolygonState = {
  items: [],
  isDrawing: false,
  pendingCoordinates: [],
  selectedId: null,
  loading: false,
  error: null,
};

const polygonSlice = createSlice({
  name: "polygons",
  initialState,
  reducers: {
    setDrawing: (state, action: PayloadAction<boolean>) => {
      state.isDrawing = action.payload;
    },
    addPendingCoordinate: (state, action: PayloadAction<[number, number]>) => {
      state.pendingCoordinates.push(action.payload);
    },
    setSelectedPolygon: (state, action: PayloadAction<string | null>) => {
      state.selectedId = action.payload;
    },
    clearPending: (state) => {
      state.pendingCoordinates = [];
      state.isDrawing = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPolygons.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchPolygons.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchPolygons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to load polygons";
      })
      .addCase(savePolygon.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(savePolygon.fulfilled, (state, action) => {
        state.items = action.payload;
        state.pendingCoordinates = [];
        state.isDrawing = false;
        state.loading = false;
      })
      .addCase(savePolygon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to save polygon";
      })
      .addCase(removePolygon.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(removePolygon.fulfilled, (state, action) => {
        state.items = action.payload;
        state.selectedId = null;
        state.loading = false;
      })
      .addCase(removePolygon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to delete polygon";
      })
      .addCase(removeAllPolygons.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(removeAllPolygons.fulfilled, (state) => {
        state.items = [];
        state.selectedId = null;
        state.loading = false;
      })
      .addCase(removeAllPolygons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to delete polygons";
      });
  },
});

export const {
  setDrawing,
  addPendingCoordinate,
  setSelectedPolygon,
  clearPending,
  clearError,
} = polygonSlice.actions;
export default polygonSlice.reducer;
