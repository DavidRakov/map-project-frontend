import { createAsyncThunk } from "@reduxjs/toolkit";
import { type PolygonDto } from "../../types";
import { polygonService } from "../../services/polygonService";

export const fetchPolygons = createAsyncThunk<PolygonDto[]>(
  "polygons/fetchAll",
  async () => {
    const res = await polygonService.getAll();
    return res.data;
  }
);

export const savePolygon = createAsyncThunk<PolygonDto[], PolygonDto>(
  "polygons/save",
  async (dto) => {
    const res = await polygonService.create(dto);
    return res.data;
  }
);

export const removePolygon = createAsyncThunk<PolygonDto[], string>(
  "polygons/remove",
  async (id) => {
    const res = await polygonService.deleteById(id);
    return res.data;
  }
);

export const removeAllPolygons = createAsyncThunk<PolygonDto[]>(
  "polygons/removeAll",
  async () => {
    await polygonService.deleteAll();
    return [];
  }
);
