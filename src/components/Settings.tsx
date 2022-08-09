import React from "react";
import styled from "styled-components";

import { formatTime } from "../helpers/helpers";

type SettingsProps = {
  colors: string;
  fontSize: string;
  cutout: string;
  excludedTimes: number;
  setColors: Function;
  setCutout: Function;
  setFontSize: Function;
};

const Settings = ({
  colors,
  fontSize,
  cutout,
  excludedTimes,
  setColors,
  setCutout,
  setFontSize,
}: SettingsProps) => {
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColors(event?.currentTarget?.value);
  };

  const handleCutoutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCutout(event?.currentTarget?.value);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(event?.currentTarget?.value);
  };
  return (
    <StyledSettingsWrapper>
      <StyledSettingsInput>
        <label>adjust colors:</label>
        <input
          type="range"
          min="0"
          max="300"
          value={colors}
          onChange={handleColorChange}
        ></input>
      </StyledSettingsInput>
      <StyledSettingsInput>
        <label>
          exclued times over: <br />
          <b>{formatTime(excludedTimes)}</b>
        </label>
        <input
          type="range"
          min="1"
          max="30"
          value={cutout}
          onChange={handleCutoutChange}
        ></input>
      </StyledSettingsInput>

      <StyledSettingsInput>
        <label>heat map size: {fontSize}</label>
        <input
          type="range"
          min="7"
          max="20"
          value={fontSize}
          onChange={handleSizeChange}
        ></input>
      </StyledSettingsInput>
      <StyledFastestLapLabel>fastest lap</StyledFastestLapLabel>
    </StyledSettingsWrapper>
  );
};

const StyledSettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  padding-top: 30px;
  align-items: flex-start;
  margin-bottom: 30px;
`;

const StyledSettingsInput = styled.div`
  margin-bottom: 30px;
  margin-right: 100px;
  label {
    display: block;
  }
`;

const StyledFastestLapLabel = styled.span`
  background-color: magenta;
  padding: 2px;
`;

export default Settings;
