export const UK_REGIONS = [
  "Scotland",
  "Wales",
  "Northern Ireland",
  "North East",
  "North West",
  "Yorkshire",
  "East Midlands",
  "West Midlands",
  "East of England",
  "London",
  "South East",
  "South West",
] as const;

export type UkRegion = (typeof UK_REGIONS)[number];

export const REGION_ROOMS: { title: string; region: string }[] = [
  { title: "GENERAL", region: "" },
  { title: "LONDON", region: "London" },
  { title: "SOUTH EAST", region: "South East" },
  { title: "SOUTH WEST", region: "South West" },
  { title: "MIDLANDS", region: "West Midlands" },
  { title: "NORTH", region: "North West" },
  { title: "SCOTLAND", region: "Scotland" },
  { title: "WALES", region: "Wales" },
];
