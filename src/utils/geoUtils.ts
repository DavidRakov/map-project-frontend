import { LatLng } from 'leaflet';

export const leafletLatLngsToGeoJson = (latLngs: LatLng[]): number[][][] => {
  const coords = latLngs.map((ll) => [ll.lng, ll.lat]);
  coords.push(coords[0]);
  return [coords];
};

export const geoJsonCoordsToLeaflet = (coordinates: number[][][]): [number, number][] => {
  return coordinates[0].map((c) => [c[1], c[0]]);
};

export const polygonCentroid = (coordinates: number[][][]): [number, number] => {
  const ring = coordinates[0];
  const lat = ring.reduce((s, c) => s + c[1], 0) / ring.length;
  const lng = ring.reduce((s, c) => s + c[0], 0) / ring.length;
  return [lat, lng];
};
