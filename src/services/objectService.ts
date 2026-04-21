import axios from "axios";
import { type MapObjectDto } from "../types";

const BASE_URL = "http://localhost:5092/api/objects";

export const objectService = {
  getAll: () => axios.get<MapObjectDto[]>(BASE_URL),
  createMany: (objects: MapObjectDto[]) =>
    axios.post<MapObjectDto[]>(BASE_URL, objects),
  deleteById: (id: string) => axios.delete<MapObjectDto[]>(`${BASE_URL}/${id}`),
};
