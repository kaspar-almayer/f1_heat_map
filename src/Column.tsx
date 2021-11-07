import React from "react";
import "./App.css";
import { getHsl, getSeconds } from "./helpers";
import { Laps } from "./helpers";

type ColumnProps = {
  laps: Laps;
  range: Array<number>;
  driver: string;
  colors: string;
};

const Column = ({ laps, range, driver, colors }: ColumnProps) => {
  return (
    <div className="column">
      <p className="driver-name">{driver}</p>
      {laps.map((lap, index) => (
        <p key={index}>
          <span
            style={{
              backgroundColor: getHsl(getSeconds(lap), range, colors),
            }}
          >
            {lap}
          </span>{" "}
        </p>
      ))}
    </div>
  );
};

export default Column;
