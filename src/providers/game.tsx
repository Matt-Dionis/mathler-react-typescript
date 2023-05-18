import React from 'react'
import { type ReactNode, createContext, useContext } from 'react'

import useGame from '../hooks/useGame'
import { DEFAULT_GRID } from '../constants'

const GameContext = createContext([
  {
    currentColumnIndex: 0,
    currentRowIndex: 0,
    disabledKeys: [] as string[],
    exactMatches: [] as string[],
    grid: DEFAULT_GRID,
    looseMatches: [] as string[],
    solution: [] as string[],
    status: { complete: false, success: false },
    total: 0
  },
  {
    deleteLatestEntry: () => {},
    handleValueOrOperatorClick: (key: string) => {},
    submitSolutionAttempt: () => {}
  }
])

export default function GameProvider ({ children }: { children: ReactNode }): JSX.Element {
  const gameData = useGame()

  return (
    <GameContext.Provider value={gameData}>
      {children}
    </GameContext.Provider>
  )
}

export function useGameContext (): any {
  return useContext(GameContext)
}
