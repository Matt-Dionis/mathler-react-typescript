import { useCallback, useEffect, useState } from 'react'

import { DEFAULT_GRID } from '../constants'
import { fetchDailyGame, fetchRandomGame } from '../data'

export interface StatusProp {
  complete: boolean
  success: boolean
}

export type UseGameReturn = [
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

export default function useGame (): UseGameReturn {
  const [currentColumnIndex, setCurrentColumnIndex] = useState<number>(0)
  const [currentRowIndex, setCurrentRowIndex] = useState<number>(0)
  const [disabledKeys, setDisabledKeys] = useState<string[]>([])
  const [exactMatches, setExactMatches] = useState<string[]>([])
  const [grid, setGrid] = useState<string[][]>(DEFAULT_GRID)
  const [looseMatches, setLooseMatches] = useState<string[]>([])
  const [solution, setSolution] = useState<string[]>(['', '', '', '', '', ''])
  const [status, setStatus] = useState<StatusProp>({ complete: false, success: false })
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    const { solution: gameSolution, total: gameTotal } = fetchDailyGame()
    setSolution(gameSolution)
    setTotal(gameTotal)
  }, [])

  const deleteLatestEntry = useCallback(() => {
    if (!status.complete) {
      const newGrid = [...grid]
      newGrid[currentRowIndex][currentColumnIndex - 1] = ''
      setGrid(newGrid)
      setCurrentColumnIndex((prev) => Math.max(0, prev - 1))
    }
  }, [currentColumnIndex, currentRowIndex, grid, status])

  const handleValueOrOperatorClick = useCallback((key: string) => {
    if (!status.complete && currentColumnIndex < solution.length) {
      const newGrid = [...grid]
      newGrid[currentRowIndex][currentColumnIndex] = key
      setGrid(newGrid)
      setCurrentColumnIndex((prev) => prev + 1)
    }
  },
  [currentColumnIndex, grid, solution.length]
  )

  const startRandomGame = useCallback(() => {
    setGrid([
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', '']
    ])
    const { solution: gameSolution, total: gameTotal } = fetchRandomGame()
    setSolution(gameSolution)
    setTotal(gameTotal)
    setCurrentColumnIndex(0)
    setCurrentRowIndex(0)
    setDisabledKeys([])
    setExactMatches([])
    setLooseMatches([])
    setStatus({ complete: false, success: false })
  }, [])

  const submitSolutionAttempt = useCallback(() => {
    if (!status.complete) {
      const latestAttempt = grid[currentRowIndex]
      const attemptHasNecessaryLength = currentColumnIndex === solution.length
      const attemptIsCorrect = latestAttempt.toString() === solution.toString()
      const finalAttempt = currentRowIndex === grid.length - 1

      if (attemptHasNecessaryLength) {
        let calculatedTotal = 0
        try {
          // eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
          calculatedTotal = Function(`return (${latestAttempt.join('')})`)()

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
            setExactMatches((prev) => [...prev, latestAttempt[i]])
          } else if (solution.includes(latestAttempt[i])) {
            setLooseMatches((prev) => [...prev, latestAttempt[i]])
          } else {
            setDisabledKeys((prev) => [...prev, latestAttempt[i]])
          }
        }

        if (attemptIsCorrect) {
          setStatus({ complete: true, success: true })
        }

        if (finalAttempt && !attemptIsCorrect) {
          setStatus({ complete: true, success: false })
        }

        setCurrentRowIndex((prev) => prev + 1)
        setCurrentColumnIndex(0)
      }
    }
  }, [currentColumnIndex, currentRowIndex, grid, solution, status])

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
      total
    },
    {
      deleteLatestEntry,
      handleValueOrOperatorClick,
      startRandomGame,
      submitSolutionAttempt
    }
  ]
}
