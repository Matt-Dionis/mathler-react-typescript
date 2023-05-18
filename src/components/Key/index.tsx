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
    if ((status?.complete) === false) {
      if (keyType === 'delete') {
        if (deleteLatestEntry != null) {
          deleteLatestEntry()
        }
      } else if (keyType === 'enter') {
        if (submitSolutionAttempt != null) {
          submitSolutionAttempt()
        }
      } else {
        if (handleValueOrOperatorClick != null) {
          handleValueOrOperatorClick(keyType)
        }
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
    <button onClick={onSelectKey} className={`button ${matchStatusClass}`}>{keyType}</button>
  )
}
