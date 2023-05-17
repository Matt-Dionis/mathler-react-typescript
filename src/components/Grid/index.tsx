type GridProps = {
  grid: string[][];
};

export default function Grid({ grid }: GridProps) {
  return (
    <div className="grid-container">
      <div className="grid">
        {grid.map((row, rowIndex) => {
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
