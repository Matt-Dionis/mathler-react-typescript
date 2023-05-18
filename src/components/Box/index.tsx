import { useGameContext } from '../../providers/game'

interface BoxProps {
  columnIndex: number
  rowIndex: number
}

export default function Box ({ columnIndex, rowIndex }: BoxProps) {
  const [{
    currentRowIndex,
    grid,
    solution
  }] = useGameContext()

  const key = grid?.[rowIndex][columnIndex] || ''
  const exactMatch = solution?.[columnIndex] === key?.toString()
  const looseMatch =
    !exactMatch && key !== '' && solution?.includes(key)
  const keyState =
  currentRowIndex && currentRowIndex > rowIndex &&
    (exactMatch ? 'exact-match' : looseMatch ? 'loose-match' : 'no-match')
  const activePopulatedClass = (rowIndex === currentRowIndex && key !== '') ? 'active-populated' : ''

  return (
    <div className={`cell ${activePopulatedClass} ${keyState}`}>
      {key}
    </div>
  )
}
