export interface GeoJsonGeometry {
  type: "Polygon";
  coordinates: number[][][];
}

export interface GeoJsonPoint {
  type: "Point";
  coordinates: number[];
}

export interface PolygonDto {
  id?: string;
  name: string;
  geometry: GeoJsonGeometry;
}

export interface MapObjectDto {
  id?: string;
  name: string;
  symbolType: "marker" | "jeep";
  geometry: GeoJsonPoint;
}

export default {};
