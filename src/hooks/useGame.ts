import { useCallback, useEffect, useState } from 'react'

import { fetchDailyGame, fetchRandomGame } from '../data'
import type { GameContextType, StatusProp } from '../providers/game'

export default function useGame (): GameContextType {
  const currentColumnIndexInProgress = JSON.parse(localStorage.getItem('currentColumnIndex') ?? '0')
  const currentRowIndexInProgress = JSON.parse(localStorage.getItem('currentRowIndex') ?? '0')
  const disabledKeysInProgress = JSON.parse(localStorage.getItem('disabledKeys') ?? '[]')
  const exactMatchesInProgress = JSON.parse(localStorage.getItem('exactMatches') ?? '[]')
  const gridInProgress = JSON.parse(localStorage.getItem('grid') ?? `[
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""]
  ]`)
  const looseMatchesInProgress = JSON.parse(localStorage.getItem('looseMatches') ?? '[]')
  const solutionInProgress = JSON.parse(localStorage.getItem('solution') ?? '[]')
  const statusInProgress = JSON.parse(localStorage.getItem('status') ?? '0')
  const totalInProgress = JSON.parse(localStorage.getItem('total') ?? '0')

  const [currentColumnIndex, setCurrentColumnIndex] = useState<number>(currentColumnIndexInProgress)
  const [currentRowIndex, setCurrentRowIndex] = useState<number>(currentRowIndexInProgress)
  const [disabledKeys, setDisabledKeys] = useState<string[]>(disabledKeysInProgress)
  const [exactMatches, setExactMatches] = useState<string[]>(exactMatchesInProgress)
  const [grid, setGrid] = useState<string[][]>(gridInProgress)
  const [looseMatches, setLooseMatches] = useState<string[]>(looseMatchesInProgress)
  const [solution, setSolution] = useState<string[]>(solutionInProgress)
  const [status, setStatus] = useState<StatusProp>(statusInProgress)
  const [total, setTotal] = useState<number>(totalInProgress)

  useEffect(() => {
    if (grid[0][0] === '') {
      const { solution: gameSolution, total: gameTotal } = fetchDailyGame()
      setSolution(gameSolution)
      setTotal(gameTotal)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('currentColumnIndex', JSON.stringify(currentColumnIndex))
  }, [currentColumnIndex])

  useEffect(() => {
    localStorage.setItem('currentRowIndex', JSON.stringify(currentRowIndex))
  }, [currentRowIndex])

  useEffect(() => {
    localStorage.setItem('disabledKeys', JSON.stringify(disabledKeys))
  }, [disabledKeys])

  useEffect(() => {
    localStorage.setItem('exactMatches', JSON.stringify(exactMatches))
  }, [exactMatches])

  useEffect(() => {
    localStorage.setItem('grid', JSON.stringify(grid))
  }, [grid])

  useEffect(() => {
    localStorage.setItem('looseMatches', JSON.stringify(looseMatches))
  }, [looseMatches])

  useEffect(() => {
    localStorage.setItem('solution', JSON.stringify(solution))
  }, [solution])

  useEffect(() => {
    if (status.complete) {
      localStorage.clear()
    } else {
      localStorage.setItem('status', JSON.stringify(status))
    }
  }, [status.complete])

  useEffect(() => {
    localStorage.setItem('total', JSON.stringify(total))
  }, [total])

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
        try {
          let calculatedTotal = 0
          const latestAttemptString = latestAttempt.join('')
          const validInput = /^[0-9+\-*/]{6}$/
          const isValidInput = validInput.test(latestAttemptString)

          if (isValidInput) {
            // eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
            calculatedTotal = Function(`return (${latestAttempt.join('')})`)()
          }

          if (!isValidInput || (calculatedTotal !== total)) {
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
