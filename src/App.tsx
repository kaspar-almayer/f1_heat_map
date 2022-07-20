import React, { useState, useMemo, useEffect } from "react";

import "./App.css";
import {
  getRange,
  getMedian,
  getSeconds,
  formatTime,
  flatLapTimes,
} from "./helpers";
import Column from "./Column";
import { supabase } from "./supabaseClient";
import { Race, RacesList } from "./types";

const calculateCutout = (laps: Array<string>, cutout: number) => {
  const timsesInSeconds = laps.map((lapTime) => getSeconds(lapTime));

  const median = Math.round(getMedian(timsesInSeconds));
  return median + cutout;
};

function App() {
  const [race, setRace] = useState<Race | null>(null);
  const [racesList, setRacesList] = useState<RacesList>([]);
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
          .eq("round", "11");

        let { data: allRaces, error: allRacesRrror } = await supabase
          .from("races")
          .select("id,short_name")
          .order("round", { ascending: false });

        if (races) {
          setRace(races[0] as Race);
          setLoading(false);
        }

        if (allRaces) {
          setRacesList(allRaces);
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
        <h1>Lap times heat map | {race?.race_name}</h1>
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
          <a href="http://ergast.com/mrd/">http://ergast.com/mrd/</a>
        </p>
        <p>
          inspiration:{" "}
          <a href="https://www.reddit.com/r/formula1/comments/tps40h/2022_saudi_arabian_grand_prix_lap_time_heat_map/">
            https://www.reddit.com/r/formula1/comments/tps40h/2022_saudi_arabian_grand_prix_lap_time_heat_map/
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
