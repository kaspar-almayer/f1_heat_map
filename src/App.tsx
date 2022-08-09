import React, { useState, useMemo, useEffect } from "react";
import styled from "styled-components";

import {
  getRange,
  getMedian,
  getSeconds,
  flatLapTimes,
} from "./helpers/helpers";
import { supabase } from "./helpers/supabaseClient";
import { Race, TimingsData } from "./helpers/types";

import Column from "./components/Column";
import DriverComparison from "./components/DriverComparison";
import Footer from "./components/Footer";
import Settings from "./components/Settings";
import Header from "./components/Header";

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
  const [selectedDrivers, setSelectedDrivers] = useState<TimingsData[]>([]);

  const [colors, setColors] = useState("150");
  const [cutout, setCutout] = useState("7");
  const [fontSize, setFontSize] = useState("14");

  useEffect(() => {
    const getData = async () => {
      try {
        let { data: races, error } = await supabase
          .from("races")
          .select("*")
          .eq("round", "13");

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

  const fastestLap = useMemo(
    () =>
      race
        ? Math.min(...flatLapTimes(race).map((lapTime) => getSeconds(lapTime)))
        : 0,
    [race]
  );

  const showComparison = useMemo(
    () => selectedDrivers.length === 2,
    [selectedDrivers]
  );

  useEffect(() => {
    if (selectedDrivers.length === 2) {
      document.body.classList.add("overflow");
    } else {
      document.body.classList.remove("overflow");
    }
  }, [selectedDrivers]);

  return (
    <>
      <Header race={race} setRace={setRace} />
      <StyledMain>
        <Settings
          colors={colors}
          cutout={cutout}
          fontSize={fontSize}
          setColors={setColors}
          setCutout={setCutout}
          setFontSize={setFontSize}
          excludedTimes={excludedTimes}
        />
        {loading ? <p>loading...</p> : null}
        {error ? (
          <p>There was a problem with data, please try again later.</p>
        ) : null}

        {race ? (
          <StyledHeatMapWrapper>
            <StyledLapNumbersWrapper>
              {race.data[0].timings.map((lap, index) => (
                <StyledLapNumber key={index} fontSize={fontSize}>
                  {index + 1}
                </StyledLapNumber>
              ))}
            </StyledLapNumbersWrapper>
            {race.data.map(
              (data, index) =>
                data.timings && (
                  <Column
                    key={index}
                    timingsData={data}
                    range={range}
                    colors={colors}
                    fontSize={fontSize}
                    fastestLap={fastestLap}
                    setSelectedDrivers={setSelectedDrivers}
                    selectedDrivers={selectedDrivers}
                  />
                )
            )}
          </StyledHeatMapWrapper>
        ) : null}

        {showComparison ? (
          <DriverComparison
            setSelectedDrivers={setSelectedDrivers}
            selectedDrivers={selectedDrivers}
            range={range}
            colors={colors}
            fontSize={"12"}
            fastestLap={fastestLap}
          />
        ) : null}
      </StyledMain>
      <Footer />
    </>
  );
}

interface StyledLapNumberProps {
  readonly fontSize: string;
}

const StyledMain = styled.main`
  display: flex;
  margin-top: 30px;
`;

const StyledHeatMapWrapper = styled.div`
  display: flex;
  margin-bottom: 50px;
  position: relative;
`;

const StyledLapNumbersWrapper = styled.div`
  position: absolute;
  top: 1.3em;
  right: 100%;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  p {
    padding: 0.2em 0.4em;
    margin: 0;
  }
`;

const StyledLapNumber = styled.p<StyledLapNumberProps>`
  font-size: ${(props) => `${props.fontSize}px`};
`;

export default App;
