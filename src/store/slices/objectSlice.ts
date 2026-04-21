import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MapObjectDto } from "../../types";
import {
  fetchObjects,
  saveObjects,
  removeObject,
} from "../thunks/objectThunks";

interface ObjectState {
  items: MapObjectDto[];
  pendingObjects: MapObjectDto[];
  selectedId: string | null;
  loading: boolean;
  error: string | null;
  isPlacingObject: boolean;
  placingTemplate: { name: string; symbolType: "marker" | "jeep" } | null;
  flyTarget: [number, number] | null;
}

const initialState: ObjectState = {
  items: [],
  pendingObjects: [],
  selectedId: null,
  loading: false,
  error: null,
  isPlacingObject: false,
  placingTemplate: null,
  flyTarget: null,
};

const objectSlice = createSlice({
  name: "objects",
  initialState,
  reducers: {
    addPendingObject: (state, action: PayloadAction<MapObjectDto>) => {
      state.pendingObjects.push(action.payload);
    },
    setSelectedObject: (state, action: PayloadAction<string | null>) => {
      state.selectedId = action.payload;
    },
    clearPending: (state) => {
      state.pendingObjects = [];
    },
    clearError: (state) => {
      state.error = null;
    },
    startPlacingObject: (state, action: PayloadAction<{ name: string; symbolType: "marker" | "jeep" }>) => {
      state.isPlacingObject = true;
      state.placingTemplate = action.payload;
    },
    cancelPlacingObject: (state) => {
      state.isPlacingObject = false;
      state.placingTemplate = null;
    },
    setFlyTarget: (state, action: PayloadAction<[number, number]>) => {
      state.flyTarget = action.payload;
    },
    clearFlyTarget: (state) => {
      state.flyTarget = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchObjects.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchObjects.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchObjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to load objects";
      })
      .addCase(saveObjects.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(saveObjects.fulfilled, (state, action) => {
        state.items = action.payload;
        state.pendingObjects = [];
        state.loading = false;
      })
      .addCase(saveObjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to save objects";
      })
      .addCase(removeObject.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(removeObject.fulfilled, (state, action) => {
        state.items = action.payload;
        state.selectedId = null;
        state.loading = false;
      })
      .addCase(removeObject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to delete object";
      });
  },
});

export const {
  addPendingObject,
  setSelectedObject,
  clearPending,
  startPlacingObject,
  cancelPlacingObject,
  clearError,
  setFlyTarget,
  clearFlyTarget,
} = objectSlice.actions;
export default objectSlice.reducer;
