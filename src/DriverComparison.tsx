import React from "react";
import "./App.css";
import { TimingsData } from "./types";

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
  const handleCloseComparisonOverlay = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => setSelectedDrivers([]);

  return (
    <div className="comparison-overlay">
      <span
        className="comparison-overlay__close"
        onClick={handleCloseComparisonOverlay}
      >
        X
      </span>
      <h2>
        {selectedDrivers[0].driverId} vs. {selectedDrivers[1].driverId}
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
                isFirst={index === 0}
                setSelectedDrivers={setSelectedDrivers}
                selectedDrivers={selectedDrivers}
              />
            )
        )}
      </div>
    </div>
  );
};

export default DriverComparison;
