import React from "react";
import "./App.css";
import { getHsl, getSeconds } from "./helpers";
import { TimingsData } from "./types";

type RowProps = {
  timingsData: TimingsData;
  range: Array<number>;
  colors: string;
  fontSize: string;
  fastestLap: number;
  isLast: boolean;
};

const Row = ({
  range,
  timingsData,
  colors,
  fontSize,
  fastestLap,
  isLast,
}: RowProps) => {
  const color = (lap: string, fastestLap: number) =>
    getSeconds(lap) === fastestLap
      ? "magenta"
      : getHsl(getSeconds(lap), range, colors);

  return (
    <div className="row">
      {!isLast && <p className="row-driver-name">{timingsData.driver}</p>}
      <div className="row-timings-wrapper">
        {timingsData.timings.map((lap, index) => (
          <p
            className="row-cell"
            key={index}
            style={{
              backgroundColor: `${color(lap, fastestLap)}`,
              fontSize: `${fontSize}px`,
            }}
          >
            <span>{lap}</span>
          </p>
        ))}
      </div>
      {isLast && <p className="row-driver-name">{timingsData.driver}</p>}
    </div>
  );
};

export default Row;
