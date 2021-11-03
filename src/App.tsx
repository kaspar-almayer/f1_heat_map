import React, { useState } from "react";
import "./App.css";
import us_data from "./turkish_gp.json";
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

  return (
    <div>
      <header>
        <h1>f1 heat map (2021 United States Grand Prix)</h1>
        {/* <h3>
          mean: {getMean(maxLaps.map((lap) => getSeconds(lap.Timings[0].time)))}
        </h3>
        <h3>
          median:{" "}
          {getMedian(maxLaps.map((lap) => getSeconds(lap.Timings[0].time)))}
        </h3> */}
      </header>
      <div className="columns-wrapper">
        {usData.map(el => <Column laps={el.timings} range={range} driver={el.driver} />)}
      </div>
    </div>
  );
}

export default App;
