import React, { useState, useMemo } from "react";
import "./App.css";
import us_data from "./us_gp.json";
import turkish_data from "./turkish_gp.json";
import { getRange, getMedian, getSeconds } from "./helpers";
import Column from "./Column";
import { RangeArray } from "./helpers";

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
    name: "us_gp",
    fullName: "United States Grand Prix",
    data: us_data.data,
  },
  {
    name: "turkish_gp",
    fullName: "Turkish Grand Prix",
    data: turkish_data.data,
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColors(event?.currentTarget?.value);
  };
  const handleCutoutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //console.log(event?.currentTarget?.value);
    setCutout(event?.currentTarget?.value);
    setRange(
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

  return (
    <div>
      <header className="main-header">
        <h1>f1 heat map ({raceData.fullName})</h1>
        <div className="settings-input">
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
      <div className="settings-wrapper">
        <div className="settings-input">
          <label>adjust colors:</label>
          <input
            type="range"
            min="0"
            max="300"
            value={colors}
            onChange={handleChange}
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
      </div>
      <div className="columns-wrapper">
        {raceData.data.map((el, index) => (
          <Column
            key={index}
            laps={el.timings}
            range={range}
            driver={el.driver}
            colors={colors}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
