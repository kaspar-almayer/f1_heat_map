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
  isFirst: boolean;
};

const Column = ({
  laps,
  range,
  driver,
  colors,
  fontSize,
  fastestLap,
  isFirst,
}: ColumnProps) => {
  const color = (lap: string, fastestLap: number) =>
    getSeconds(lap) === fastestLap
      ? "magenta"
      : getHsl(getSeconds(lap), range, colors);
  return (
    <div className="column">
      <div className="lap-numbers">
        {isFirst
          ? laps.map((lap, index) => (
              <p
                key={index}
                style={{
                  fontSize: `${fontSize}px`,
                }}
              >
                {index + 1}
              </p>
            ))
          : null}
      </div>
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
