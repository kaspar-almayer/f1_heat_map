import React from "react";
import "./App.css";
import { getHsl, getSeconds } from "./helpers";

type ColumnProps = {
  laps: string[];
  range: Array<number>;
  driver: string;
  colors: string;
  fontSize: string;
  fastestLap: number;
};

const Column = ({
  laps,
  range,
  driver,
  colors,
  fontSize,
  fastestLap,
}: ColumnProps) => {
  const color = (lap: string, fastestLap: number) =>
    getSeconds(lap) === fastestLap
      ? "magenta"
      : getHsl(getSeconds(lap), range, colors);
  return (
    <div className="column">
      <p className="driver-name">{driver}</p>
      {laps.map((lap, index) => (
        <p
          key={index}
          style={{
            backgroundColor: `${color(lap, fastestLap)}`,
            fontSize: `${fontSize}px`,
          }}
        >
          {lap}
        </p>
      ))}
    </div>
  );
};

export default Column;
