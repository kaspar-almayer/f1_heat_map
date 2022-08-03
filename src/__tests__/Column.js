import { render, screen } from "@testing-library/react";
import Column from "../Column";

test("has correct welcome text", () => {
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
});
