import { useCallback, useState } from "react";

import { ACTIONS, DEFAULT_GRID, DIGITS, OPERATORS } from "./constants";
import Header from "./components/Header";
import Grid from "./components/Grid";
import Keypad from "./components/Keypad";

import "./styles.css";

export type StatusProp = {
  complete: boolean,
  success: boolean,
}

export default function App() {
  const [currentColumnIndex, setCurrentColumnIndex] = useState<number>(0);
  const [currentRowIndex, setCurrentRowIndex] = useState<number>(0);
  const [grid, setGrid] = useState<string[][]>(DEFAULT_GRID);
  const [total, setTotal] = useState<number>(0);
  const [solution, setSolution] = useState<string[]>(["", "", "", "", "", ""]);
  const [status, setStatus] = useState<StatusProp>({ complete: false, success: false });

  const submitSolutionAttempt = useCallback(() => {
    if (!status.complete) {
      const attemptHasNecessaryLength = currentColumnIndex === solution.length
      const attemptIsCorrect = grid[currentRowIndex].toString() === solution.toString()
      const finalAttempt = currentRowIndex === grid.length - 1

      if (attemptHasNecessaryLength) {
        if (attemptIsCorrect) {
          setStatus({ complete: true, success: true });
        }

        if (!finalAttempt) {
          setCurrentRowIndex((prev) => prev + 1);
          setCurrentColumnIndex(0)
        }

        if (finalAttempt && !attemptIsCorrect) {
          setStatus({ complete: true, success: false })
        }
      }
    }
  }, [currentColumnIndex, currentRowIndex, solution]);

  const deleteLatestEntry = useCallback(() => {
    if (!status.complete) {
      let newGrid = [...grid];
      newGrid[currentRowIndex][currentColumnIndex - 1] = "";
      setGrid(newGrid);
      setCurrentColumnIndex((prev) => Math.max(0, prev - 1));
    }
  }, [currentColumnIndex, currentRowIndex, grid, status]);

  const handleValueOrOperatorClick = useCallback(
    (button: string, currentRowIndex: number, currentColumnIndex: number) => {
      if (!status.complete && currentColumnIndex < solution.length) {
        let newGrid = [...grid];
        newGrid[currentRowIndex][currentColumnIndex] = button;
        setGrid(newGrid);
        setCurrentColumnIndex((prev) => prev + 1);
      }
    },
    [grid, solution.length]
  );

  return (
    <div className="game-container">
      <Header status={status} total={total} />
      <Grid grid={grid} />
      <Keypad
        actionButtons={ACTIONS}
        currentColumnIndex={currentColumnIndex}
        currentRowIndex={currentRowIndex}
        deleteLatestEntry={deleteLatestEntry}
        digitButtons={DIGITS}
        handleValueOrOperatorClick={handleValueOrOperatorClick}
        operatorButtons={OPERATORS}
        submitSolutionAttempt={submitSolutionAttempt}
      />
    </div>
  );
}
