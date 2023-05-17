import { useCallback, useEffect, useState } from "react"

import { DEFAULT_GRID } from "../constants";
import fetchGame from "../data";

export type StatusProp = {
  complete: boolean,
  success: boolean,
}

export default function useGame() {
  const [currentColumnIndex, setCurrentColumnIndex] = useState<number>(0);
  const [currentRowIndex, setCurrentRowIndex] = useState<number>(0);
  const [grid, setGrid] = useState<string[][]>(DEFAULT_GRID);
  const [solution, setSolution] = useState<string[]>(["", "", "", "", "", ""]);
  const [status, setStatus] = useState<StatusProp>({ complete: false, success: false });
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const { solution: gameSolution, total: gameTotal } = fetchGame()
    setSolution(gameSolution)
    setTotal(gameTotal)
  }, [])

  const deleteLatestEntry = useCallback(() => {
    if (!status.complete) {
      let newGrid = [...grid];
      newGrid[currentRowIndex][currentColumnIndex - 1] = "";
      setGrid(newGrid);
      setCurrentColumnIndex((prev) => Math.max(0, prev - 1));
    }
  }, [currentColumnIndex, currentRowIndex, grid, status]);

  const handleValueOrOperatorClick = useCallback(() => {
      if (!status.complete && currentColumnIndex < solution.length) {
        let newGrid = [...grid];
        newGrid[currentRowIndex][currentColumnIndex] = "button";
        setGrid(newGrid);
        setCurrentColumnIndex((prev) => prev + 1);
      }
    },
    [currentColumnIndex, grid, solution.length]
  );

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
  }, [currentColumnIndex, currentRowIndex, grid, solution, status]);

  return [
    {
      currentColumnIndex,
      currentRowIndex,
      grid,
      solution,
      status,
      total,
    },
    {
      deleteLatestEntry,
      handleValueOrOperatorClick,
      submitSolutionAttempt,
    }
  ]
}
