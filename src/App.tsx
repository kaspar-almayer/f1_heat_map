import React, { useState, useMemo } from "react";
import "./App.css";
import { getRange, getMedian, getSeconds } from "./helpers";
import Column from "./Column";
import { RangeArray } from "./helpers";
//import { supabase } from "./supabaseClient";

import data_8 from "./race_data/8.json";
import data_9 from "./race_data/9.json";

type RaceData = {
  driver: string;
  timings: string[];
}[];

type Race = {
  name: string;
  fullName: string;
  data: RaceData;
};

const races = [
  {
    name: "Azerbaijan GP",
    fullName: data_8.raceName,
    data: data_8.data,
  },
  {
    name: "Canada GP",
    fullName: data_9.raceName,
    data: data_9.data,
  },
];

const calculateCutout = (laps: Array<string>, cutout: number) => {
  console.log("get range");
  const timsesInSeconds = laps.map((lap) => getSeconds(lap));

  const median = getMedian(timsesInSeconds);
  console.log(median);
  return median + cutout;
};

function App() {
  const [cutout, setCutout] = useState("7");
  const [raceData, setRaceData] = useState<Race>(races[0]);
  const [range, setRange] = useState<RangeArray>(
    getRange(raceData.data.map((el) => el.timings).flat(), Number(cutout))
  );
  const [colors, setColors] = useState("150");
  const [fontSize, setFontSize] = useState("14");

  // useEffect(() => {
  //   console.log("effect");
  //   const getData = async () => {
  //     try {
  //       let { data: races, error } = await supabase.from("races").select("*");
  //       console.log({ races });
  //       setRaces(races);
  //       setRaceData(races[0]);
  //     } catch (error) {}
  //   };

  //   getData();
  // }, []);

  // useEffect(() => {
  //   raceData &&
  //     getRange(raceData.data.map((el) => el.timings).flat(), Number(cutout));
  // }, [raceData]);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColors(event?.currentTarget?.value);
  };
  const handleCutoutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //console.log(event?.currentTarget?.value);
    setCutout(event?.currentTarget?.value);
    setRange(
      raceData &&
        getRange(raceData.data.map((el) => el.timings).flat(), Number(cutout))
    );
  };

  const handleRaceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event?.currentTarget?.value);
    const selectedRace = races.find(
      (race) => race.name === event?.currentTarget?.value
    ) || { name: "", fullName: "", data: [] };
    setRaceData(selectedRace);
  };

  const excludedTimes = useMemo(
    () =>
      calculateCutout(
        raceData.data.map((el) => el.timings).flat(),
        Number(cutout)
      ),
    [raceData, cutout]
  );

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(event?.currentTarget?.value);
  };

  return (
    <div className="app-wrapper">
      <header className="main-header">
        <h1>f1 heat map ({raceData.fullName})</h1>
        <div className="race-input">
          <label htmlFor="races">select race:</label>
          <select
            name="races"
            id="races"
            value={raceData.name}
            onChange={handleRaceChange}
          >
            {races.map((race) => (
              <option value={race.name}>{race.name}</option>
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
        <div className="columns-wrapper">
          {raceData.data.map((el, index) => (
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
      </main>
    </div>
  );
}

export default App;
