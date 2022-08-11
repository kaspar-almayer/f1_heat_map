import React, { useMemo } from "react";
import styled from "styled-components";

import { getSeconds, formatTime } from "../helpers/helpers";

type StintDetailsProps = {
  selectedIndexes: number[];
  timings: string[];
};

const StintDetails = ({ selectedIndexes, timings }: StintDetailsProps) => {
  const stintTime = useMemo(
    () =>
      timings
        .filter((_, index) => selectedIndexes.indexOf(index) != -1)
        .map((lap) => getSeconds(lap))
        .reduce((sum, num) => sum + num, 0),
    [selectedIndexes]
  );

  const avgTime = useMemo(
    () =>
      timings
        .filter((_, index) => selectedIndexes.indexOf(index) != -1)
        .map((lap) => getSeconds(lap))
        .reduce((sum, num) => sum + num, 0) / selectedIndexes.length,
    [selectedIndexes]
  );
  const lapDiff = useMemo(
    () =>
      timings
        .filter((_, index) => selectedIndexes.indexOf(index) != -1)
        .map((lap) => getSeconds(lap))
        .map((lap, index, timings) => lap - timings[index + 1])
        .filter((lap) => Boolean(lap)),
    [selectedIndexes]
  );

  const avgLapDiff = useMemo(
    () =>
      timings
        .filter((_, index) => selectedIndexes.indexOf(index) != -1)
        .map((lap) => getSeconds(lap))
        .map((lap, index, timings) => lap - timings[index + 1])
        .filter((lap) => Boolean(lap))
        .reduce((sum, num) => sum + num, 0) / selectedIndexes.length,
    [selectedIndexes]
  );

  return (
    <div>
      <p>selected laps:</p>
      {selectedIndexes.map((el) => (
        <span>{el} |</span>
      ))}
      <p>lap times:</p>
      {timings
        .filter((_, index) => selectedIndexes.indexOf(index) != -1)
        .map((lap) => (
          <span>{lap} #</span>
        ))}
      <p>stint time:</p>
      <span>{formatTime(stintTime)}</span>
      <p>avg lap time:</p>
      <span>{formatTime(avgTime)}</span>
      <p>lapDiff</p>
      {lapDiff.map((diff) => (
        <span>{diff} |</span>
      ))}
      <p>avg lapDiff</p>
      <span>{avgLapDiff.toFixed(3)}</span>
    </div>
  );
};

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  border-bottom: 2px solid gray;
  padding: 10px 50px;
  h1 {
    margin-right: 30px;
  }
`;

export default StintDetails;
