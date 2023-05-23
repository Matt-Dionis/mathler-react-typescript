import gridStyles from './index.module.css'

import React from 'react'
import { useGameContext } from '../../providers/game'
import Box from '../Box'

export default function Grid (): JSX.Element {
  const [{ grid }] = useGameContext()

  return (
    <div className={gridStyles['grid-container']}>
      <div className={gridStyles.grid}>
        {grid.map((row: string[], rowIndex: number) => {
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
