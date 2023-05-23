import keypadStyles from './index.module.css'

import React, { useCallback, useEffect } from 'react'

import Key from '../Key'
import { useGameContext } from '../../providers/game'

interface KeypadProps {
  actionButtons: string[]
  digitKeys: string[]
  operatorKeys: string[]
}

export default function Keypad ({
  actionButtons,
  digitKeys,
  operatorKeys
}: KeypadProps): JSX.Element {
  const [{
    currentColumnIndex,
    disabledKeys,
    exactMatches,
    looseMatches,
    status
  },
  {
    deleteLatestEntry,
    handleValueOrOperatorClick,
    submitSolutionAttempt
  }] = useGameContext()

  const handleKeyboardInput = useCallback(
    (event: KeyboardEvent) => {
      if (!status.complete) {
        if (event.key === 'Backspace') {
          deleteLatestEntry()
          return
        }
        if (event.key === 'Enter') {
          submitSolutionAttempt()
          return
        }

        const attemptkeys = [...digitKeys, ...operatorKeys]

        if (attemptkeys.includes(event.key)) {
          handleValueOrOperatorClick(event.key)
        }
      }
    },
    [currentColumnIndex, status.complete]
  )
  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardInput)

    return () => {
      document.removeEventListener('keydown', handleKeyboardInput)
    }
  }, [handleKeyboardInput])

  return (
    <>
      <div className={keypadStyles['button-container']}>
        {digitKeys.map((key, index) => (
          <Key
            exactMatch={exactMatches.includes(key)}
            key={index}
            keyType={key}
            looseMatch={looseMatches.includes(key)}
            noMatch={disabledKeys.includes(key)}
          />
        ))}
      </div>
      <div className={keypadStyles['button-container']}>
        {operatorKeys.map((key, index) => (
          <Key
            exactMatch={exactMatches.includes(key)}
            key={index}
            keyType={key}
            looseMatch={looseMatches.includes(key)}
            noMatch={disabledKeys.includes(key)}
          />
        ))}
      </div>
      <div className={keypadStyles['button-container']}>
        <Key
          keyType={actionButtons[0]}
        />
        <Key
          keyType={actionButtons[1]}
        />
      </div>
    </>
  )
}
