import axios from "axios";
import type { PolygonDto } from "../types";

const BASE_URL = "http://localhost:5092/api/polygons";

export const polygonService = {
  getAll: () => axios.get<PolygonDto[]>(BASE_URL),
  create: (polygon: PolygonDto) => axios.post<PolygonDto[]>(BASE_URL, polygon),
  deleteById: (id: string) => axios.delete<PolygonDto[]>(`${BASE_URL}/${id}`),
  deleteAll: () => axios.delete(BASE_URL),
};
