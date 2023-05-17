import { useGameContext } from "../../providers/game";

type KeypadProps = {
  actionButtons: string[];
  digitButtons: string[];
  operatorButtons: string[];
};

export default function Keypad({
  actionButtons,
  digitButtons,
  operatorButtons,
}: KeypadProps) {
  const [
    {
      currentColumnIndex,
      currentRowIndex,
    },
    {
      deleteLatestEntry,
      handleValueOrOperatorClick = () => {},
      submitSolutionAttempt,
    }
  ] = useGameContext()

  return (
    <>
      <div className="button-container">
        {digitButtons.map((button, index) => (
          <button
            key={index}
            onClick={() => handleValueOrOperatorClick(button)}
            className="button"
          >
            {button}
          </button>
        ))}
      </div>
      <div className="button-container">
        {operatorButtons.map((button, index) => (
          <button
            key={index}
            onClick={() => handleValueOrOperatorClick(button)}
            className="button"
          >
            {button}
          </button>
        ))}
      </div>
      <div className="button-container">
        <button onClick={deleteLatestEntry} className="button">
          {actionButtons[0]}
        </button>
        <button onClick={submitSolutionAttempt} className="button">
          {actionButtons[1]}
        </button>
      </div>
    </>
  );
}
