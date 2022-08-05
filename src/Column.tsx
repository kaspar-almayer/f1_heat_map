import React from "react";
import "./App.css";
import { getHsl, getSeconds } from "./helpers";
import { TimingsData } from "./types";

type ColumnProps = {
  timingsData: TimingsData;
  range: Array<number>;
  colors: string;
  fontSize: string;
  fastestLap: number;
  isFirst: boolean;
  setSelectedDrivers: Function;
  selectedDrivers: TimingsData[];
};

const Column = ({
  range,
  timingsData,
  colors,
  fontSize,
  fastestLap,
  isFirst,
  setSelectedDrivers,
  selectedDrivers,
}: ColumnProps) => {
  const color = (lap: string, fastestLap: number) =>
    getSeconds(lap) === fastestLap
      ? "magenta"
      : getHsl(getSeconds(lap), range, colors);

  const handleDriverSelect = () => {
    console.log("driver selected");
    setSelectedDrivers([...selectedDrivers, timingsData]);
  };
  return (
    <div className="column">
      <div className="lap-numbers">
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
      </div>
      <div
        className={
          selectedDrivers[0]?.driver === timingsData.driver
            ? "column-selected"
            : ""
        }
      >
        <p className="driver-name" onClick={handleDriverSelect}>
          {timingsData.driver}
        </p>
        {timingsData.timings.map((lap, index) => (
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
    </div>
  );
};

export default Column;
