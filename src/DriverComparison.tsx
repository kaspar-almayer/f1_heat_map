import React from "react";
import "./App.css";
import { TimingsData, DriversFullNames } from "./types";

import Row from "./Row";

type DriverComparisonProps = {
  setSelectedDrivers: Function;
  selectedDrivers: TimingsData[];
  range: Array<number>;
  colors: string;
  fontSize: string;
  fastestLap: number;
};

const DriverComparison = ({
  setSelectedDrivers,
  selectedDrivers,
  range,
  colors,
  fontSize,
  fastestLap,
}: DriverComparisonProps) => {
  const handleCloseComparisonOverlay = () => setSelectedDrivers([]);

  return (
    <div className="comparison-overlay">
      <span
        className="comparison-overlay__close"
        onClick={handleCloseComparisonOverlay}
      >
        X
      </span>
      <h2>
        {
          DriversFullNames[
            selectedDrivers[0].driver as keyof typeof DriversFullNames
          ]
        }{" "}
        vs.{" "}
        {
          DriversFullNames[
            selectedDrivers[1].driver as keyof typeof DriversFullNames
          ]
        }
      </h2>
      <div className="rows-wrapper">
        {selectedDrivers.map(
          (data, index) =>
            data.timings && (
              <Row
                key={index}
                timingsData={data}
                range={range}
                colors={colors}
                fontSize={fontSize}
                fastestLap={fastestLap}
                isLast={index === 1}
              />
            )
        )}
      </div>
    </div>
  );
};

export default DriverComparison;
