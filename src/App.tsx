import React, { useState } from "react";
import "./App.css";
import us_data from "./us_gp.json";
import { getRange } from "./helpers";
import Column from "./Column";
import { RangeArray } from "./helpers";

type RaceData = {
  driver: string;
  timings: string[];
}[];

function App() {
  const [cutout, setCutout] = useState("7");
  const [usData] = useState<RaceData>(us_data.data);
  const [range, setRange] = useState<RangeArray>(
    getRange(usData.map((el) => el.timings).flat(), Number(cutout))
  );
  const [colors, setColors] = useState("150");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColors(event?.currentTarget?.value);
  };
  const handleCutoutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //console.log(event?.currentTarget?.value);
    setCutout(event?.currentTarget?.value);
    setRange(getRange(usData.map((el) => el.timings).flat(), Number(cutout)));
  };

  return (
    <div>
      <header>
        <h1>f1 heat map (2021 United States Grand Prix)</h1>
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
          <label>adjust cutout time:</label>
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
        {usData.map((el, index) => (
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
