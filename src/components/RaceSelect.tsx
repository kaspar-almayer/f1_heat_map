import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { supabase } from "../helpers/supabaseClient";
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
        let { data, error } = await supabase
          .from("races")
          .select("id,short_name")
          .order("round", { ascending: false });

        if (data) {
          setRacesList(data);
        }

        if (error) {
          throw error;
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const handleRaceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const getData = async () => {
      try {
        let { data: races, error } = await supabase
          .from("races")
          .select("*")
          .eq("id", event?.currentTarget?.value);

        if (races) {
          setRace(races[0] as Race);
        }

        if (error) {
          throw error;
        }
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
