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
      if ((status?.complete) === false) {
        if (event.key === 'Backspace') {
          if (deleteLatestEntry != null) {
            deleteLatestEntry()
          }
          return
        }
        if (event.key === 'Enter') {
          if (submitSolutionAttempt != null) {
            submitSolutionAttempt()
          }
          return
        }

        const attemptkeys = [...digitKeys, ...operatorKeys]

        if (attemptkeys.includes(event.key)) {
          if (handleValueOrOperatorClick != null) {
            handleValueOrOperatorClick(event.key)
          }
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
            exactMatch={((exactMatches?.includes(key)) === true) || false}
            key={index}
            keyType={key}
            looseMatch={((looseMatches?.includes(key)) === true) || false}
            noMatch={((disabledKeys?.includes(key)) === true) || false}
          />
        ))}
      </div>
      <div className={keypadStyles['button-container']}>
        {operatorKeys.map((key, index) => (
          <Key
            exactMatch={((exactMatches?.includes(key)) === true) || false}
            key={index}
            keyType={key}
            looseMatch={((looseMatches?.includes(key)) === true) || false}
            noMatch={((disabledKeys?.includes(key)) === true) || false}
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
