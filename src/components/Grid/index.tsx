import React from 'react'
import { useGameContext } from '../../providers/game'
import Box from '../Box'

export default function Grid (): JSX.Element {
  const [{ grid }] = useGameContext()

  return (
    <div className="grid-container">
      <div className="grid">
        {grid?.map((row: string[], rowIndex: number) => {
          return row.map((key: string, colIndex: number) => {
            return (
              <Box key={`${rowIndex},${colIndex}`} columnIndex={colIndex} rowIndex={rowIndex} />
            )
          })
        })}
      </div>
    </div>
  )
}
