import React, { useState } from "react";
import "./App.css";
import max_data from "./max.json";
import lh_data from "./hamilton.json";
import { getMean, getMedian, getRange, getHsl, getSeconds } from "./helpers";
import Column from "./Column";
import { Laps, RangeArray } from "./helpers";

function App() {
  const [maxLaps] = useState<Laps>(max_data.MRData.RaceTable.Races[0].Laps);
  const [maxRange] = useState<RangeArray>(getRange(maxLaps));

  const [lhLaps] = useState<Laps>(lh_data.MRData.RaceTable.Races[0].Laps);
  const [lhRange] = useState<RangeArray>(getRange(lhLaps));

  return (
    <div>
      <header>
        <h1>f1 matrix</h1>
        {/* <h3>
          mean: {getMean(maxLaps.map((lap) => getSeconds(lap.Timings[0].time)))}
        </h3>
        <h3>
          median:{" "}
          {getMedian(maxLaps.map((lap) => getSeconds(lap.Timings[0].time)))}
        </h3> */}
      </header>
      <div className="columns-wrapper">
        <Column laps={maxLaps} range={maxRange} driver={"MAX"} />
        <Column laps={lhLaps} range={lhRange} driver={"HAM"} />
      </div>
    </div>
  );
}

export default App;
