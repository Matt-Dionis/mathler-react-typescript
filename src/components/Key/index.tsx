import React from 'react'
import { useGameContext } from '../../providers/game'

interface KeyProps {
  exactMatch?: boolean
  keyType: string
  looseMatch?: boolean
  noMatch?: boolean
}

export default function Key ({ exactMatch, keyType, looseMatch, noMatch }: KeyProps): JSX.Element {
  const [{ status }, {
    deleteLatestEntry,
    handleValueOrOperatorClick,
    submitSolutionAttempt
  }] = useGameContext()

  const onSelectKey = (): void => {
    if (!status.complete) {
      if (keyType === 'delete') {
        deleteLatestEntry()
      } else if (keyType === 'enter') {
        submitSolutionAttempt()
      } else {
        handleValueOrOperatorClick(keyType)
      }
    }
  }

  const matchStatusClass = (exactMatch === true)
    ? 'exact-match'
    : (looseMatch === true)
        ? 'loose-match'
        : (noMatch === true)
            ? 'no-match'
            : ''

  return (
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    <button onClick={onSelectKey} className={`button ${matchStatusClass}`}>{keyType}</button>
  )
}
