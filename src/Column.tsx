import React, { useState } from "react";
import "./App.css";
import max_data from "./max.json";
import { getHsl, getSeconds } from "./helpers";
import { Laps } from "./helpers";

type ColumnProps = {
  laps: Laps;
  range: Array<number>;
  driver: string;
};

const Column = ({ laps, range, driver }: ColumnProps) => {
  return (
    <div className="column">
      <p className="driver-name">{driver}</p>
      {laps.map((lap) => (
        <p>
          <span
            style={{
              backgroundColor: getHsl(getSeconds(lap.Timings[0].time), range),
            }}
          >
            {lap.Timings[0].time}
          </span>{" "}
          {/* <span>{getSeconds(lap.Timings[0].time)}</span> */}
        </p>
      ))}
    </div>
  );
};

export default Column;
