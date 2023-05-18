import headerStyles from './index.module.css'

import React from 'react'
import { useGameContext } from '../../providers/game'
import type { StatusProp } from '../../hooks/useGame'

export default function Header (): JSX.Element {
  const [{ status, total }, { startRandomGame }]: [{ status: StatusProp, total: number }, { startRandomGame: () => void }] = useGameContext()

  return (
    <div className={headerStyles.header}>
      <h1 className={headerStyles.title}>Mathler</h1>
      {status.complete && status.success && (
        <>
          <h3 className={headerStyles.description}>
            Congratulations!!!
          </h3>
          <button onClick={startRandomGame}>Start new game</button>
        </>
      )}
      {status.complete && !status.success && (
        <>
          <h3 className={headerStyles.description}>
            Try again with a new challenge?
          </h3>
          <button onClick={startRandomGame}>Start new game</button>
        </>
      )}
      {status.complete && status.success && (
        <>
          <h3 className={headerStyles.description}>
            Congratulations!!!
          </h3>
          <button></button>
        </>
      )}
      {!status.complete && (
        <h3 className={headerStyles.description}>
          Find the hidden calculation that equals {total}
        </h3>
      )}
    </div>
  )
}
