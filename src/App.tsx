import React, { useState, useMemo, useEffect } from "react";

import "./App.css";
import {
  getRange,
  getMedian,
  getSeconds,
  formatTime,
  flatLapTimes,
} from "./helpers";
import { supabase } from "./supabaseClient";
import { Race } from "./types";

import Column from "./Column";
import RaceSelect from "./RaceSelect";

const calculateCutout = (laps: Array<string>, cutout: number) => {
  const timsesInSeconds = laps.map((lapTime) => getSeconds(lapTime));

  const median = Math.round(getMedian(timsesInSeconds));
  return median + cutout;
};

function App() {
  const [race, setRace] = useState<Race | null>(null);
  const [range, setRange] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [colors, setColors] = useState("150");
  const [cutout, setCutout] = useState("7");
  const [fontSize, setFontSize] = useState("14");

  useEffect(() => {
    const getData = async () => {
      try {
        let { data: races, error } = await supabase
          .from("races")
          .select("*")
          .eq("round", "12");

        if (races) {
          setRace(races[0] as Race);
          setLoading(false);
        }

        if (error) {
          throw error;
        }
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (race) {
      setRange(getRange(flatLapTimes(race), Number(cutout)));
    }
  }, [race, cutout]);

  const excludedTimes = useMemo(
    () => (race ? calculateCutout(flatLapTimes(race), Number(cutout)) : 0),
    [race, cutout]
  );

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
        <h1>🏁 Lap times heat map | {race?.race_name}</h1>
        <RaceSelect race={race} setRace={setRace} />
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
            <label>
              exclued times over: <br />
              <b>{formatTime(excludedTimes)}</b>
            </label>
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
        {loading ? <p>loading...</p> : null}
        {error ? (
          <p>There was a problem with data, please try again later.</p>
        ) : null}

        {race ? (
          <div className="columns-wrapper">
            {race.data.map(
              (el, index) =>
                el.timings && (
                  <Column
                    key={index}
                    laps={el.timings}
                    range={range}
                    driver={el.driver}
                    colors={colors}
                    fontSize={fontSize}
                  />
                )
            )}
          </div>
        ) : null}
      </main>
      <footer>
        <p>
          lap times data:{" "}
          <a href="http://ergast.com/mrd/" target="_blank" rel="noreferrer">
            http://ergast.com/mrd/
          </a>
        </p>
        <p>
          inspiration:{" "}
          <a
            href="https://www.reddit.com/r/formula1/comments/tps40h/2022_saudi_arabian_grand_prix_lap_time_heat_map/"
            target="_blank"
            rel="noreferrer"
          >
            https://www.reddit.com/r/formula1/comments/tps40h/2022_saudi_arabian_grand_prix_lap_time_heat_map/
          </a>
        </p>
        <p>
          <b>made by:</b>{" "}
          <a
            href="https://twitter.com/kaspar_almayer"
            target="_blank"
            rel="noreferrer"
          >
            @kaspar_almayer
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
