import { createAsyncThunk } from "@reduxjs/toolkit";
import { type MapObjectDto } from "../../types";
import { objectService } from "../../services/objectService";

export const fetchObjects = createAsyncThunk<MapObjectDto[]>(
  "objects/fetchAll",
  async () => {
    const res = await objectService.getAll();
    return res.data;
  }
);

export const saveObjects = createAsyncThunk<MapObjectDto[], MapObjectDto[]>(
  "objects/save",
  async (dtos) => {
    const res = await objectService.createMany(dtos);
    return res.data;
  }
);

export const removeObject = createAsyncThunk<MapObjectDto[], string>(
  "objects/remove",
  async (id) => {
    const res = await objectService.deleteById(id);
    return res.data;
  }
);
