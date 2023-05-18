import '@testing-library/jest-dom'
import { renderHook } from '@testing-library/react';
import useGame from './useGame';

describe('useGame hook', () => {
  it('has default data', () => {
    const { result: { current } } = renderHook(() => useGame());
    const [
      { 
        currentColumnIndex,
        currentRowIndex,
        disabledKeys,
        exactMatches,
        grid,
        looseMatches,
        solution,
        status,
        total,
      },
      {
        deleteLatestEntry,
        handleValueOrOperatorClick,
        submitSolutionAttempt
      }
    ] = current
    expect(currentColumnIndex).toEqual(0)
    expect(currentRowIndex).toEqual(0)
    expect(disabledKeys?.length).toEqual(0)
    expect(exactMatches?.length).toEqual(0)
    expect(grid?.length).toEqual(6)
    expect(looseMatches?.length).toEqual(0)
    expect(solution).toEqual(["7","*","8","-","1","2"])
    expect(status?.complete).toEqual(false)
    expect(status?.success).toEqual(false)
    expect(total).toEqual(44)
    expect(deleteLatestEntry).toBeDefined()
    expect(handleValueOrOperatorClick).toBeDefined()
    expect(submitSolutionAttempt).toBeDefined()
  })
});
