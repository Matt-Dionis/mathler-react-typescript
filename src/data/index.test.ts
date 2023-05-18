import { fetchDailyGame, fetchRandomGame } from '.'

describe('fetchDailyGame', () => {
  it('should return the game at the 0 index', () => {
    const { solution, total } = fetchDailyGame()
    expect(solution).toStrictEqual(['7', '*', '8', '-', '1', '2'])
    expect(total).toBe(44)
  })
})

describe('fetchRandomGame', () => {
  it('should return the game at the 0 index', () => {
    const { solution, total } = fetchRandomGame()
    expect(solution.length).toBe(6)
    expect(total).toBeDefined()
  })
})
