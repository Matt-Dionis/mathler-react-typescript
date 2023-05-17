type KeypadProps = {
  actionButtons: string[];
  currentColumnIndex: number;
  currentRowIndex: number;
  deleteLatestEntry: () => void;
  digitButtons: string[];
  handleValueOrOperatorClick: (
    button: string,
    currentRowIndex: number,
    currentColumnIndex: number
  ) => void;
  operatorButtons: string[];
  submitSolutionAttempt: () => void;
};

export default function Keypad({
  actionButtons,
  currentColumnIndex,
  currentRowIndex,
  deleteLatestEntry,
  digitButtons,
  handleValueOrOperatorClick,
  operatorButtons,
  submitSolutionAttempt
}: KeypadProps) {
  return (
    <>
      <div className="button-container">
        {digitButtons.map((button, index) => (
          <button
            key={index}
            onClick={() =>
              handleValueOrOperatorClick(button, currentRowIndex, currentColumnIndex)
            }
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
            onClick={() =>
              handleValueOrOperatorClick(button, currentRowIndex, currentColumnIndex)
            }
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
