export type RangeArray = Array<number>;

export type Laps = Array<string>




export const getSeconds = (time: String): number => {
  console.log("get seconds");
  const splitSeconds = time.split(":");
  const splitMiliseconds = splitSeconds[1].split(".");

  const sec = Number(splitSeconds[0]) * 60 + Number(splitMiliseconds[0]);
  return Number(`${sec}.${splitMiliseconds[1]}`);
};

export const getHsl = (value: number, range: RangeArray) => {
  if (value < range[0] || value > range[1]) {
    return `hsl(0, 0%, 50%)`;
  }
  const hue = ((value - range[0]) * 150) / (range[1] - range[0]);
  return `hsl(${hue}, 100%, 50%)`;
};

export const getMean = (laps: Array<number>) => {
  return laps.reduce((a, b) => a + b, 0) / laps.length;
};

export const getMedian = (laps: Array<number>): number => {
  laps.sort((a, b) => a - b);
  if (laps.length % 2 == 0) {
    const middle = laps.length / 2;
    return (laps[middle - 1] + laps[middle]) / 2;
  } else {
    return laps.length / 2;
  }
};

export const getRange = (laps: Array<string>): RangeArray => {
  const timses = laps
    .map((lap) => getSeconds(lap))
    .filter((time) => time < 100 + 10);
  console.log([Math.min(...timses), Math.max(...timses)]);
  return [Math.min(...timses), Math.max(...timses)];
};

