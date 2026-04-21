export const SYMBOL_TYPES = {
  MARKER: 'marker',
  JEEP: 'jeep',
} as const;

export type SymbolType = typeof SYMBOL_TYPES[keyof typeof SYMBOL_TYPES];

export const SYMBOL_LABELS: Record<SymbolType, string> = {
  marker: 'Marker רגיל',
  jeep: "ג'יפ",
};
