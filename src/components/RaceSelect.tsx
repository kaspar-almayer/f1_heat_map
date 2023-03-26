import React from "react";
import styled from "styled-components";

import { Race } from "../helpers/types";
import { getRace, RACE_LIST } from "../helpers/helpers";

type RaceSelectProps = {
  race: Race | null;
  setRace: Function;
};

function RaceSelect({ race, setRace }: RaceSelectProps) {

  const handleRaceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const getData = async () => {
      try {
        const raceData = await getRace(event?.currentTarget?.value);
        setRace(raceData);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  };

  return (
    <>
      <StyledRaceSelectLabel htmlFor="races">
        select race:
      </StyledRaceSelectLabel>
      <select
        name="races"
        id="races"
        value={race?.id}
        onChange={handleRaceChange}
      >
        {RACE_LIST.map((race) => (
          <option key={race.id} value={race.id}>
            {race.short_name}
          </option>
        ))}
      </select>
    </>
  );
}

const StyledRaceSelectLabel = styled.label`
  margin-right: 20px;
`;

export default RaceSelect;
