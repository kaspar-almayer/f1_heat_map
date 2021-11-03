import React, { useState } from "react";
import "./App.css";
import us_data from "./us_gp.json";
import { getMean, getMedian, getRange, getHsl, getSeconds } from "./helpers";
import Column from "./Column";
import { Laps, RangeArray } from "./helpers";

type RaceData = {
  driver: string,
  timings: string[]
}[]

function App() {
  const [usData] = useState<RaceData>(us_data.data);
  const [range] = useState<RangeArray>(getRange(usData.map(el => el.timings).flat()));
  const [colors, setColors] = useState("150")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColors(event?.currentTarget?.value);
  }

  return (
    <div>
      <header>
        <h1>f1 heat map (2021 United States Grand Prix)</h1>
        <p>adjust colors:</p>
        <input type="range" id="points" name="points" min="0" max="300" value={colors} onChange={handleChange}></input>
      </header>
      <div className="columns-wrapper">
        {usData.map(el => <Column laps={el.timings} range={range} driver={el.driver} colors={colors}/>)}
      </div>
    </div>
  );
}

export default App;
