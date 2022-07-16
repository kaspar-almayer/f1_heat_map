import React, { useState, useMemo, useEffect } from "react";
import "./App.css";
import { getRange, getMedian, getSeconds } from "./helpers";
import Column from "./Column";
import { supabase } from "./supabaseClient";

type TimingsData = {
  driver: string;
  driverId: string;
  timings: string[];
}[];

type Race = {
  created_at: string;
  id: number;
  race_name: string;
  round: number;
  short_name: string;
  data: TimingsData;
};

type RacesList = {
  id: number;
  short_name: string;
}[];

const calculateCutout = (laps: Array<string>, cutout: number) => {
  console.log("get range");
  const timsesInSeconds = laps.map((lap) => getSeconds(lap));

  const median = getMedian(timsesInSeconds);
  console.log(median);
  return median + cutout;
};

function App() {
  const [race, setRace] = useState<Race | null>(null);
  const [racesList, setRacesList] = useState<RacesList>([]);
  const [range, setRange] = useState<number[]>([]);

  const [colors, setColors] = useState("150");
  const [cutout, setCutout] = useState("7");
  const [fontSize, setFontSize] = useState("14");

  useEffect(() => {
    console.log("effect");
    const getData = async () => {
      try {
        let { data: races, error } = await supabase
          .from("races")
          .select("*")
          .eq("round", "8");

        let { data: allRaces, error: allRacesRrror } = await supabase
          .from("races")
          .select("id,short_name");

        console.log({ races });
        console.log({ allRaces });
        if (races) {
          setRace(races[0] as Race);
        }

        if (allRaces) {
          setRacesList(allRaces);
        }
      } catch (error) {}
    };

    getData();
  }, []);

  useEffect(() => {
    if (race) {
      setRange(
        getRange(race.data.map((el) => el.timings).flat(), Number(cutout))
      );
    }
  }, [race, cutout]);

  const excludedTimes = useMemo(
    () =>
      race
        ? calculateCutout(
            race.data.map((el) => el.timings).flat(),
            Number(cutout)
          )
        : "",
    [race, cutout]
  );

  const handleRaceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event?.currentTarget?.value);
    const getData = async () => {
      try {
        let { data: races, error } = await supabase
          .from("races")
          .select("*")
          .eq("id", event?.currentTarget?.value);

        console.log({ races });

        if (races) {
          setRace(races[0] as Race);
        }
      } catch (error) {}
    };

    getData();
  };

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
    <div className="app-wrapper">
      <header className="main-header">
        <h1>f1 heat map ({race?.race_name})</h1>
        <div className="race-input">
          <label htmlFor="races">select race:</label>
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
        </div>
      </header>
      <main>
        <div className="settings-wrapper">
          <div className="settings-input">
            <label>adjust colors:</label>
            <input
              type="range"
              min="0"
              max="300"
              value={colors}
              onChange={handleColorChange}
            ></input>
          </div>
          <div className="settings-input">
            <label>exclued times over: {excludedTimes}</label>
            <input
              type="range"
              min="1"
              max="30"
              value={cutout}
              onChange={handleCutoutChange}
            ></input>
          </div>

          <div className="settings-input">
            <label>heat map size: {fontSize}</label>
            <input
              type="range"
              min="7"
              max="20"
              value={fontSize}
              onChange={handleSizeChange}
            ></input>
          </div>
        </div>
        {race ? (
          <div className="columns-wrapper">
            {race.data.map((el, index) => (
              <Column
                key={index}
                laps={el.timings}
                range={range}
                driver={el.driver}
                colors={colors}
                fontSize={fontSize}
              />
            ))}
          </div>
        ) : null}
      </main>
    </div>
  );
}

export default App;
