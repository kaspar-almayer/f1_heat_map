import React from "react";
import styled from "styled-components";

import { getHsl, getSeconds } from "../helpers/helpers";
import { TimingsData } from "../helpers/types";

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
    setSelectedDrivers([...selectedDrivers, timingsData]);
  };
  return (
    <StyledColumn>
      <StyledLapNumbers>
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
      </StyledLapNumbers>
      <div
        className={
          selectedDrivers[0]?.driver === timingsData.driver
            ? "column-selected"
            : ""
        }
      >
        <StyledDriverName onClick={handleDriverSelect}>
          {timingsData.driver}
        </StyledDriverName>
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
    </StyledColumn>
  );
};

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  p {
    margin: 0;
    padding: 0.2em;
  }
`;

const StyledLapNumbers = styled.div`
  position: absolute;
  top: 1.8em;
  right: 100%;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  p {
    padding: 0.2em 0.4em;
  }
`;

const StyledDriverName = styled.div`
  font-weight: bold;
  text-align: center;
  cursor: pointer;
`;

export default Column;
