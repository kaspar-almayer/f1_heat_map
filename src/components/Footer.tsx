import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <StyledFooter>
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
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  border-top: 2px solid gray;
  padding: 10px 50px;
`;

export default Footer;
