import React from 'react'
import { type ReactNode, createContext, useContext } from 'react'

import useGame from '../hooks/useGame'
import { DEFAULT_GRID } from '../constants'

export interface StatusProp {
  complete: boolean
  success: boolean
}

export type GameContextType = [
  {
    currentColumnIndex: number
    currentRowIndex: number
    disabledKeys: string[]
    exactMatches: string[]
    grid: string[][]
    looseMatches: string[]
    solution: string[]
    status: StatusProp
    total: number
  },
  {
    deleteLatestEntry: () => void
    handleValueOrOperatorClick: (key: string) => void
    startRandomGame: () => void
    submitSolutionAttempt: () => void
  },
]

const GameContext = createContext<GameContextType>([
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
    startRandomGame: () => {},
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

export function useGameContext (): GameContextType {
  return useContext(GameContext)
}
