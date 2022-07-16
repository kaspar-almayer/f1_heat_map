import React from "react";
import "./App.css";
import { getHsl, getSeconds } from "./helpers";

type ColumnProps = {
  laps: string[];
  range: Array<number>;
  driver: string;
  colors: string;
  fontSize: string;
};

const Column = ({ laps, range, driver, colors, fontSize }: ColumnProps) => {
  return (
    <div className="column">
      <p className="driver-name">{driver}</p>
      {laps.map((lap, index) => (
        <p
          key={index}
          style={{
            backgroundColor: getHsl(getSeconds(lap), range, colors),
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
