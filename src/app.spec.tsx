import { act, fireEvent, render } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";

jest.useFakeTimers();

it("should be able to recive the value as a prop", () => {
  let initial = "5";

  const { getByTestId } = render(<App initial={initial} />);
  let timerValue = getByTestId("timer-value");
  expect(timerValue).toHaveTextContent("5");
});

test("decrease value by time", async () => {
  let initialValue = "100";
  const renderApp = () => render(<App initial={initialValue} />);
  let { getByTestId } = renderApp();
  expect(getByTestId("timer-value")).toHaveTextContent("100");
  act(() => {
    jest.advanceTimersByTime(5000);
  });
  expect(getByTestId("timer-value")).toHaveTextContent("95");
});

test("timer stops at 0", async () => {
  let initialValue = "5";
  const renderApp = () => render(<App initial={initialValue} />);
  let { getByTestId } = renderApp();
  expect(getByTestId("timer-value")).toHaveTextContent("5");
  act(() => {
    jest.advanceTimersByTime(10000);
  });
  expect(getByTestId("timer-value")).toHaveTextContent("0");
});

test("stop timer button stops the timer", async () => {
  let initialValue = "20";
  const renderApp = () => render(<App initial={initialValue} />);
  let { getByTestId } = renderApp();
  let stopTimerButton = getByTestId("stop-button");
  expect(getByTestId("timer-value")).toHaveTextContent("20");
  act(() => {
    jest.advanceTimersByTime(10000);
  });
  expect(getByTestId("timer-value")).toHaveTextContent("10");
  fireEvent.click(stopTimerButton);
  expect(getByTestId("timer-value")).toHaveTextContent("10");
  act(() => {
    jest.advanceTimersByTime(10000);
  });
  expect(getByTestId("timer-value")).toHaveTextContent("10");
});
