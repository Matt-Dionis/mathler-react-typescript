import { useGameContext } from "../../providers/game";

export default function Grid() {
  const [{ grid }] = useGameContext()

  return (
    <div className="grid-container">
      <div className="grid">
        {grid?.map((row, rowIndex) => {
          return row.map((button: string, colIndex: number) => {
            return (
              <div key={`${rowIndex},${colIndex}`} className="cell">
                {button}
              </div>
            );
          });
        })}
      </div>
    </div>
  );
}
