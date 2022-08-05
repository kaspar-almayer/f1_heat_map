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
  isFirst: boolean;
  setSelectedDrivers: Function;
  selectedDrivers: TimingsData[];
};

const Row = ({
  range,
  timingsData,
  colors,
  fontSize,
  fastestLap,
  isFirst,
  setSelectedDrivers,
  selectedDrivers,
}: RowProps) => {
  const color = (lap: string, fastestLap: number) =>
    getSeconds(lap) === fastestLap
      ? "magenta"
      : getHsl(getSeconds(lap), range, colors);

  const handleDriverSelect = () => {
    console.log(timingsData);
    setSelectedDrivers([...selectedDrivers, timingsData]);
  };
  return (
    <div className="row">
      {/* <div className="lap-numbers">
        {isFirst
          ? timingsData.timings.map((lap, index) => (
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
      </div> */}
      <p className="driver-name" onClick={handleDriverSelect}>
        {timingsData.driver}
      </p>
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
    </div>
  );
};

export default Row;
