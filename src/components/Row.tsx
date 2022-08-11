import React, { useState, useRef, useEffect, useMemo } from "react";
import styled from "styled-components";

import { getHsl, getSeconds, formatTime } from "../helpers/helpers";
import { TimingsData } from "../helpers/types";
import StintDetails from "./StintDetails";

import {
  Box,
  boxesIntersect,
  useSelectionContainer,
} from "@air/react-drag-to-select";

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

  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const selectableItems = useRef<Box[]>([]);
  const elementsContainerRef = useRef<HTMLDivElement | null>(null);

  const { DragSelection } = useSelectionContainer({
    eventsElement: document.getElementById("root"),
    onSelectionChange: (box) => {
      //console.log(box);
      /**
       * Here we make sure to adjust the box's left and top with the scroll position of the window
       * @see https://github.com/AirLabsTeam/react-drag-to-select/#scrolling
       */
      const scrollAwareBox: Box = {
        ...box,
        top: box.top + window.scrollY,
        left: box.left + window.scrollX,
      };

      const indexesToSelect: number[] = [];
      selectableItems.current.forEach((item, index) => {
        if (boxesIntersect(scrollAwareBox, item)) {
          indexesToSelect.push(index);
        }
      });

      setSelectedIndexes(indexesToSelect);
      console.log({ indexesToSelect });
    },
    onSelectionStart: () => {
      console.log("OnSelectionStart");
    },
    onSelectionEnd: () => console.log("OnSelectionEnd"),
    selectionProps: {
      style: {
        position: `absolute`,
        zIndex: 99,
      },
    },

    isEnabled: true,
  });

  useEffect(() => {
    if (elementsContainerRef.current) {
      Array.from(elementsContainerRef.current.children).forEach((item) => {
        const { left, top, width, height } = item.getBoundingClientRect();
        selectableItems.current.push({
          left,
          top,
          width,
          height,
        });
      });
    }
  }, []);

  return (
    <StyledRow>
      {!isLast && <StyledDriverName>{timingsData.driver}</StyledDriverName>}
      <DragSelection />
      <StyledTimingsWrapper ref={elementsContainerRef}>
        {timingsData.timings.map((lap, index) => (
          <StyledRowCell
            className="row-cell"
            key={index}
            style={{
              backgroundColor: `${color(lap, fastestLap)}`,
              fontSize: `${fontSize}px`,
              border: `${
                selectedIndexes.includes(index) ? "3px solid navy" : "none"
              }`,
              //color: `${selectedIndexes.includes(index) ? "red" : ""}`,
            }}
          >
            <span>{lap}</span>
          </StyledRowCell>
        ))}
      </StyledTimingsWrapper>
      <StintDetails
        selectedIndexes={selectedIndexes}
        timings={timingsData.timings}
      />

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
