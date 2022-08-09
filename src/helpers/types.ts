export type TimingsData = {
  driver: string;
  driverId: string;
  timings: string[];
};

export type Race = {
  created_at: string;
  id: number;
  race_name: string;
  round: number;
  short_name: string;
  data: TimingsData[];
};

export type RacesList = {
  id: number;
  short_name: string;
}[];

export enum DriversFullNames {
  AIT = "Jack Aitken",
  ALB = "Alexander Albon",
  ALO = "Fernando Alonso",
  BOT = "Valtteri Bottas",
  FIT = "Pietro Fittipaldi",
  GAS = "Pierre Gasly",
  GIO = "Antonio Giovinazzi",
  GRO = "Romain Grosjean",
  HAM = "Lewis Hamilton",
  HUL = "Nico Hülkenberg",
  KUB = "Robert Kubica",
  KVY = "Daniil Kvyat",
  LAT = "Nicholas Latifi",
  LEC = "Charles Leclerc",
  MAG = "Kevin Magnussen",
  MAZ = "Nikita Mazepin",
  NOR = "Lando Norris",
  OCO = "Esteban Ocon",
  PER = "Sergio Pérez",
  RIC = "Daniel Ricciardo",
  RUS = "George Russell",
  SAI = "Carlos Sainz Jr.",
  SCH = "Mick Schumacher",
  STR = "Lance Stroll",
  TSU = "Yuki Tsunoda",
  VER = "Max Verstappen",
  VET = "Sebastian Vettel",
  ZHO = "Guanyu Zhou",
}
