import { useGameContext } from "../../providers/game";
import Box from "../Box";

export default function Grid() {
  const [{ grid }] = useGameContext()

  return (
    <div className="grid-container">
      <div className="grid">
        {grid?.map((row, rowIndex) => {
          return row.map((key: string, colIndex: number) => {
            return (
              <Box key={`${rowIndex},${colIndex}`} columnIndex={colIndex} rowIndex={rowIndex} />
            );
          });
        })}
      </div>
    </div>
  );
}
