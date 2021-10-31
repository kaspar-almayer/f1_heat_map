import React, { useState } from "react";
import "./App.css";
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
              backgroundColor: getHsl(getSeconds(lap), range),
            }}
          >
            {lap}
          </span>{" "}
          {/* <span>{getSeconds(lap.Timings[0].time)}</span> */}
        </p>
      ))}
    </div>
  );
};

export default Column;
