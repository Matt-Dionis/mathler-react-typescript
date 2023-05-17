import { useGameContext } from "../../providers/game";

type KeyProps = {
  exactMatch?: boolean,
  keyType: string,
  looseMatch?: boolean,
  noMatch?: boolean,
}

export default function Key({ exactMatch, keyType, looseMatch, noMatch }: KeyProps) {
  const [{ status }, {
    deleteLatestEntry,
    handleValueOrOperatorClick,
    submitSolutionAttempt,
  }] = useGameContext()

  const onSelectKey = () => {
    if (!status?.complete) {
      if (keyType === "delete") {
        if (deleteLatestEntry) {
          deleteLatestEntry();
        }
      } else if (keyType === "enter") {
        if (submitSolutionAttempt) {
          submitSolutionAttempt();
        }
      } else {
        if (handleValueOrOperatorClick) {
          handleValueOrOperatorClick(keyType);
        }
      }
    }
  };

  const matchStatusClass = exactMatch ? "exact-match"
    : looseMatch ? "loose-match"
    : noMatch ? "no-match"
    : ""

  return (
    <button onClick={onSelectKey} className={`button ${matchStatusClass}`}>{keyType}</button>
  );
}
