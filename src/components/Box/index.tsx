import React from 'react'
import { useGameContext } from '../../providers/game'

interface BoxProps {
  columnIndex: number
  rowIndex: number
}

export default function Box ({ columnIndex, rowIndex }: BoxProps): JSX.Element {
  const [{
    currentRowIndex,
    grid,
    solution
  }] = useGameContext()

  const key = grid?.[rowIndex][columnIndex] ?? ''
  const exactMatch = solution?.[columnIndex] === key?.toString()
  const looseMatch =
    !exactMatch && key !== '' && solution?.includes(key)
  const keyState = (currentRowIndex != null) && currentRowIndex > rowIndex &&
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    (exactMatch ? 'exact-match' : (looseMatch ?? false) ? 'loose-match' : 'no-match')
  const activePopulatedClass = (rowIndex === currentRowIndex && key !== '') ? 'active-populated' : ''

  return (
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    <div className={`cell ${activePopulatedClass} ${keyState}`}>
      {key}
    </div>
  )
}
