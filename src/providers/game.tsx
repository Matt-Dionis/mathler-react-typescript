import { ReactNode, createContext, useContext } from "react"

import useGame from "../hooks/useGame"
import { DEFAULT_GRID } from "../constants";
import type { StatusProp } from "../hooks/useGame";

const GameContext = createContext([
  {
    currentColumnIndex: 0,
    currentRowIndex: 0,
    grid: DEFAULT_GRID,
    solution: ["", "", "", "", "", ""],
    status: { complete: false, success: false },
    total: 0,
  },
  {
    deleteLatestEntry: () => {},
    handleValueOrOperatorClick: (key: string) => {},
    submitSolutionAttempt: () => {},
  }
])

export default function GameProvider({ children }: { children: ReactNode }) {
  const gameData = useGame()

  return (
    <GameContext.Provider value={gameData}>
      {children}
    </GameContext.Provider>
  )
}

export function useGameContext() {
  return useContext(GameContext)
}
