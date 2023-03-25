import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Race, RacesList } from "../helpers/types";

type RaceSelectProps = {
  race: Race | null;
  setRace: Function;
};

function RaceSelect({ race, setRace }: RaceSelectProps) {
  const [racesList, setRacesList] = useState<RacesList>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        setRacesList([
          {id: 1, short_name: "Bahrain GP"},
          {id: 2, short_name: "Saudi Arabian GP"}
        ])
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const handleRaceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const getData = async () => {
      try {
        const response = await fetch(`https://kaspar-almayer.github.io/f1_data/${event?.currentTarget?.value}.json`);
        const jsonData = await response.json()
        console.log(jsonData)
        setRace(jsonData as Race);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  };

  return (
    <>
      {racesList.length ? (
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
            {racesList.map((race) => (
              <option key={race.id} value={race.id}>
                {race.short_name}
              </option>
            ))}
          </select>
        </>
      ) : null}
    </>
  );
}

const StyledRaceSelectLabel = styled.label`
  margin-right: 20px;
`;

export default RaceSelect;
