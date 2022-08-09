import React from "react";
import styled from "styled-components";

import { TimingsData, DriversFullNames } from "../helpers/types";

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
    <StyledComparisonOverlay>
      <StyledOverlayClose onClick={handleCloseComparisonOverlay}>
        X
      </StyledOverlayClose>
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
      <StyledRowsWrapper>
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
      </StyledRowsWrapper>
    </StyledComparisonOverlay>
  );
};

const StyledComparisonOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  text-align: center;
  flex-direction: column;
`;

const StyledOverlayClose = styled.span`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 30px;
  cursor: pointer;
`;

const StyledRowsWrapper = styled.div`
  margin: 0 30px;
`;

export default DriverComparison;
