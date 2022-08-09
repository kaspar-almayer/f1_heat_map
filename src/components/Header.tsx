import React from "react";
import styled from "styled-components";

import { Race } from "../helpers/types";

import RaceSelect from "./RaceSelect";

type HeaderProps = {
  race: Race | null;
  setRace: Function;
};

const Header = ({ race, setRace }: HeaderProps) => {
  return (
    <StyledHeader>
      <h1>🏁 Lap times heat map | {race?.race_name}</h1>
      <RaceSelect race={race} setRace={setRace} />
    </StyledHeader>
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

export default Header;
