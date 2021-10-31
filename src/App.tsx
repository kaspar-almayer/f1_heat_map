import React, { useState } from "react";
import "./App.css";
import us_data from "./test.json";
import { getMean, getMedian, getRange, getHsl, getSeconds } from "./helpers";
import Column from "./Column";
import { Laps, RangeArray } from "./helpers";

interface Test {
  [index:string]: string[]
}

function App() {
  const [usData] = useState<Test>(us_data.data);
  const [range] = useState<RangeArray>(getRange(Object.values(usData).flat()));

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
        {Object.keys(usData).map(driver => <Column laps={usData[driver]} range={range} driver={driver} />)}
      </div>
    </div>
  );
}

export default App;
