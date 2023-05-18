import { useGameContext } from '../../providers/game'

interface KeyProps {
  exactMatch?: boolean
  keyType: string
  looseMatch?: boolean
  noMatch?: boolean
}

export default function Key ({ exactMatch, keyType, looseMatch, noMatch }: KeyProps) {
  const [{ status }, {
    deleteLatestEntry,
    handleValueOrOperatorClick,
    submitSolutionAttempt
  }] = useGameContext()

  const onSelectKey = () => {
    if (!status?.complete) {
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

  const matchStatusClass = exactMatch
    ? 'exact-match'
    : looseMatch
      ? 'loose-match'
      : noMatch
        ? 'no-match'
        : ''

  return (
    <button onClick={onSelectKey} className={`button ${matchStatusClass}`}>{keyType}</button>
  )
}
