import { useCallback, useEffect } from "react";

import Key from "../Key";
import { useGameContext } from "../../providers/game";

type KeypadProps = {
  actionButtons: string[];
  digitKeys: string[];
  operatorKeys: string[];
};

export default function Keypad({
  actionButtons,
  digitKeys,
  operatorKeys,
}: KeypadProps) {
  const [{
    currentColumnIndex,
    disabledKeys,
    exactMatches,
    looseMatches,
    status,
  },
  {
    deleteLatestEntry,
    handleValueOrOperatorClick,
    submitSolutionAttempt,
  }] = useGameContext()

  const handleKeyboardInput = useCallback(
    (event: KeyboardEvent) => {
      if (!status?.complete) {
        if (event.key === "Backspace") {
          if (deleteLatestEntry) {
            deleteLatestEntry();
          }
          return
        }
        if (event.key === "Enter") {
          if (submitSolutionAttempt) {
            submitSolutionAttempt();
          }
          return
        }
  
        const attemptkeys = [ ...digitKeys, ...operatorKeys ]
  
        if (attemptkeys.includes(event.key)) {
          if (handleValueOrOperatorClick) {
            handleValueOrOperatorClick(event.key)
          }
        }
      }
    },
    [currentColumnIndex]
  );
  useEffect(() => {
    document.addEventListener("keydown", handleKeyboardInput);

    return () => {
      document.removeEventListener("keydown", handleKeyboardInput);
    };
  }, [handleKeyboardInput]);

  return (
    <>
      <div className="button-container">
        {digitKeys.map((key, index) => (
          <Key
            exactMatch={exactMatches?.includes(key) || false}
            key={index}
            keyType={key}
            looseMatch={looseMatches?.includes(key) || false}
            noMatch={disabledKeys?.includes(key) || false}
          />
        ))}
      </div>
      <div className="button-container">
        {operatorKeys.map((key, index) => (
          <Key
            exactMatch={exactMatches?.includes(key) || false}
            key={index}
            keyType={key}
            looseMatch={looseMatches?.includes(key) || false}
            noMatch={disabledKeys?.includes(key) || false}
          />
        ))}
      </div>
      <div className="button-container">
        <Key
          keyType={actionButtons[0]}
        />
        <Key
          keyType={actionButtons[1]}
        />
      </div>
    </>
  );
}
