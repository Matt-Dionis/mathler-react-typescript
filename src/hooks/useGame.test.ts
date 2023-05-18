import '@testing-library/jest-dom'
import { act, renderHook } from '@testing-library/react'
import useGame from './useGame'

describe('useGame hook', () => {
  const { result } = renderHook(() => useGame())

  it('has default data and mutations are properly handled', () => {
    expect(result.current[0].currentColumnIndex).toEqual(0)
    expect(result.current[0].currentRowIndex).toEqual(0)
    expect(result.current[0].disabledKeys?.length).toEqual(0)
    expect(result.current[0].exactMatches?.length).toEqual(0)
    expect(result.current[0].grid?.length).toEqual(6)
    expect(result.current[0].looseMatches?.length).toEqual(0)
    expect(result.current[0].solution).toEqual(['7', '*', '8', '-', '1', '2'])
    expect(result.current[0].status?.complete).toEqual(false)
    expect(result.current[0].status?.success).toEqual(false)
    expect(result.current[0].total).toEqual(44)
    expect(result.current[1].deleteLatestEntry).toBeDefined()
    expect(result.current[1].handleValueOrOperatorClick).toBeDefined()
    expect(result.current[1].submitSolutionAttempt).toBeDefined()

    expect(result.current[0].grid[0][0]).toBe('')

    void act(() => { result.current[1].handleValueOrOperatorClick('7') })
    void act(() => { result.current[1].handleValueOrOperatorClick('*') })
    void act(() => { result.current[1].handleValueOrOperatorClick('8') })
    void act(() => { result.current[1].handleValueOrOperatorClick('-') })
    void act(() => { result.current[1].handleValueOrOperatorClick('1') })
    void act(() => { result.current[1].handleValueOrOperatorClick('1') })
    expect(result.current[0].grid[0][5]).toBe('1')
    jest.spyOn(window, 'alert').mockImplementation(() => {})
    void act(() => { result.current[1].submitSolutionAttempt() })
    expect(window.alert).toBeCalledWith(`Every guess must equal ${result.current[0].total}`)
    expect(result.current[0].status.complete).toBe(false)
    expect(result.current[0].status.success).toBe(false)

    void act(() => { result.current[1].deleteLatestEntry() })
    expect(result.current[0].grid[0][5]).toBe('')
    void act(() => { result.current[1].handleValueOrOperatorClick('2') })
    void act(() => { result.current[1].submitSolutionAttempt() })
    expect(result.current[0].status.complete).toBe(true)
    expect(result.current[0].status.success).toBe(true)
  })
})
