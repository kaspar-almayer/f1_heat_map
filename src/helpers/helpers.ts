import { Race } from "./types";

export const getSeconds = (lapTime: String): number => {
  const splitSeconds = lapTime.split(":");
  const splitMiliseconds = splitSeconds[1].split(".");

  const sec = Number(splitSeconds[0]) * 60 + Number(splitMiliseconds[0]);
  return Number(`${sec}.${splitMiliseconds[1]}`);
};

export const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = String((timeInSeconds % 60).toFixed(3)).padStart(6, "0");
  return `${minutes}:${seconds}`;
};

export const getHsl = (value: number, range: number[], colors: string) => {
  if (value < range[0] || value > range[1]) {
    return `hsl(0, 0%, 50%)`;
  }
  const hue = ((value - range[0]) * Number(colors)) / (range[1] - range[0]);
  return `hsl(${hue}, 100%, 50%)`;
};

export const getMean = (laps: Array<number>) => {
  return laps.reduce((a, b) => a + b, 0) / laps.length;
};

export const getMedian = (laps: Array<number>): number => {
  laps.sort((a, b) => a - b);
  if (laps.length % 2 === 0) {
    const middle = laps.length / 2;
    return (laps[middle - 1] + laps[middle]) / 2;
  } else {
    return laps[Math.round(laps.length / 2)];
  }
};

export const getRange = (laps: Array<string>, cutout: number): number[] => {
  const timsesInSeconds = laps.map((lapTime) => getSeconds(lapTime));

  const median = Math.round(getMedian(timsesInSeconds));

  const timesWthoutPitstops = timsesInSeconds.filter(
    (time) => time < median + cutout
  );

  return [Math.min(...timesWthoutPitstops), Math.max(...timesWthoutPitstops)];
};

export const flatLapTimes = (race: Race): string[] => {
  return race.data
    .reduce((result, currentValue) => {
      if (currentValue.timings) {
        result.push(currentValue.timings as string[]);
      }
      return result;
    }, [] as string[][])
    .flat();
  //return race.data.map((el) => el.timings).flat()
};

export const getRace = async (id: string): Promise<Race> => {
  const response = await fetch(`https://kaspar-almayer.github.io/f1_data/${id}.json`);
  const jsonData = await response.json()
  return jsonData;
};

export const RACE_LIST = [
  {id: 1, short_name: "Bahrain GP"},
  {id: 2, short_name: "Saudi Arabian GP"}
]