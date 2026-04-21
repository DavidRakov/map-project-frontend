export type Coordinates = [number, number];

export interface GeoJsonGeometry {
  type: "Polygon";
  coordinates: Coordinates[][];
}

export interface GeoJsonPoint {
  type: "Point";
  coordinates: Coordinates;
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
