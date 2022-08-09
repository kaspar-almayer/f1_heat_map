import React from "react";
import styled from "styled-components";

import { getHsl, getSeconds } from "./helpers";
import { TimingsData } from "./types";

type RowProps = {
  timingsData: TimingsData;
  range: Array<number>;
  colors: string;
  fontSize: string;
  fastestLap: number;
  isLast: boolean;
};

const Row = ({
  range,
  timingsData,
  colors,
  fontSize,
  fastestLap,
  isLast,
}: RowProps) => {
  const color = (lap: string, fastestLap: number) =>
    getSeconds(lap) === fastestLap
      ? "magenta"
      : getHsl(getSeconds(lap), range, colors);

  return (
    <StyledRow>
      {!isLast && <StyledDriverName>{timingsData.driver}</StyledDriverName>}
      <StyledTimingsWrapper>
        {timingsData.timings.map((lap, index) => (
          <StyledRowCell
            className="row-cell"
            key={index}
            style={{
              backgroundColor: `${color(lap, fastestLap)}`,
              fontSize: `${fontSize}px`,
            }}
          >
            <span>{lap}</span>
          </StyledRowCell>
        ))}
      </StyledTimingsWrapper>
      {isLast && <StyledDriverName>{timingsData.driver}</StyledDriverName>}
    </StyledRow>
  );
};

const StyledRow = styled.div``;

const StyledTimingsWrapper = styled.div`
  display: flex;
`;

const StyledRowCell = styled.p`
  width: 2em;
  height: 65px;
  position: relative;
  span {
    transform: rotate(-90deg);
    position: absolute;
    z-index: 1;
    top: 2em;
    right: -1em;
  }
`;

const StyledDriverName = styled.p`
  font-weight: bold;
  text-align: left;
  margin: 0;
`;

export default Row;
