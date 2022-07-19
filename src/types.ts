export type TimingsData = {
  driver: string;
  driverId: string;
  timings: string[];
}[];

export type Race = {
  created_at: string;
  id: number;
  race_name: string;
  round: number;
  short_name: string;
  data: TimingsData;
};

export type RacesList = {
  id: number;
  short_name: string;
}[];
