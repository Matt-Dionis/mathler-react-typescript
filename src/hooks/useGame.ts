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
  const [disabledKeys, setDisabledKeys] = useState<string[]>([])
  const [exactMatches, setExactMatches] = useState<string[]>([])
  const [grid, setGrid] = useState<string[][]>(DEFAULT_GRID);
  const [looseMatches, setLooseMatches] = useState<string[]>([])
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

  const handleValueOrOperatorClick = useCallback((key: string) => {
      if (!status.complete && currentColumnIndex < solution.length) {
        let newGrid = [...grid];
        newGrid[currentRowIndex][currentColumnIndex] = key;
        setGrid(newGrid);
        setCurrentColumnIndex((prev) => prev + 1);
      }
    },
    [currentColumnIndex, grid, solution.length]
  );

  const submitSolutionAttempt = useCallback(() => {
    if (!status.complete) {
      const latestAttempt = grid[currentRowIndex]
      const attemptHasNecessaryLength = currentColumnIndex === solution.length
      const attemptIsCorrect = latestAttempt.toString() === solution.toString()
      const finalAttempt = currentRowIndex === grid.length - 1

      if (attemptHasNecessaryLength) {
        let calculatedTotal = 0
        try {
          calculatedTotal = Function(`return (${latestAttempt.join("")})`)()

          if (calculatedTotal !== total) {
            alert(`Every guess must equal ${total}`)
            return
          }
        } catch (err) {
          alert(`Every guess must equal ${total}`)
          return
        }
        for (let i = 0; i < latestAttempt.length; i++) {
          if (latestAttempt[i] === solution[i]) {
            setExactMatches((prev) => [ ...prev, latestAttempt[i]])
          } else if (solution.includes(latestAttempt[i])) {
            setLooseMatches((prev) => [ ...prev, latestAttempt[i]])
          } else {
            setDisabledKeys((prev) => [ ...prev, latestAttempt[i]])
          }
        }

        if (attemptIsCorrect) {
          setStatus({ complete: true, success: true });
        }

        if (finalAttempt && !attemptIsCorrect) {
          setStatus({ complete: true, success: false })
        }

        setCurrentRowIndex((prev) => prev + 1);
        setCurrentColumnIndex(0)
      }
    }
  }, [currentColumnIndex, currentRowIndex, grid, solution, status]);

  return [
    {
      currentColumnIndex,
      currentRowIndex,
      disabledKeys,
      exactMatches,
      grid,
      looseMatches,
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
