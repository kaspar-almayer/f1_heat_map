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
  setSelectedDrivers: Function;
  selectedDrivers: TimingsData[];
};

const Column = ({
  range,
  timingsData,
  colors,
  fontSize,
  fastestLap,
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
    <StyledColumn
      isSelected={selectedDrivers[0]?.driver === timingsData.driver}
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
    </StyledColumn>
  );
};

interface StyledColumnProps {
  readonly isSelected: boolean;
}

const StyledColumn = styled.div<StyledColumnProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  p {
    margin: 0;
    padding: 0.2em;
  }
  border-right: ${(props) => (props.isSelected ? "2px solid black" : "none")};
  border-left: ${(props) => (props.isSelected ? "2px solid black" : "none")};
  box-shadow: ${(props) =>
    props.isSelected ? "inset 0px 4px 0px -2px black" : "none"};
`;

const StyledDriverName = styled.div`
  font-weight: bold;
  text-align: center;
  cursor: pointer;
`;

export default Column;
