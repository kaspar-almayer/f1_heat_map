import { render, screen } from "@testing-library/react";
import Column from "../components/Column";

test("display driver name and lap time", () => {
  render(
    <Column
      key={1}
      laps={["1:02:123", "1:12:123"]}
      range={[60.123, 72.123]}
      driver={"TEST"}
      colors={"150"}
      fontSize={"14"}
      fastestLap={62.123}
    />
  );
  expect(screen.getByText("TEST")).toBeInTheDocument();
  expect(screen.getByText("1:02:123")).toBeInTheDocument();
  expect(screen.getByText("1:12:123")).toBeInTheDocument();
  //test for lap number
  expect(screen.queryByText("1")).not.toBeInTheDocument();
});

test("display lap number", () => {
  render(
    <Column
      key={1}
      laps={["1:02:123", "1:12:123"]}
      range={[60.123, 72.123]}
      driver={"TEST"}
      colors={"150"}
      fontSize={"14"}
      fastestLap={62.123}
      isFirst={true}
    />
  );
  //test for lap number
  expect(screen.getByText("1")).toBeInTheDocument();
});
