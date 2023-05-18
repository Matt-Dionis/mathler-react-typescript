interface GameSettings {
  solution: string[]
  total: number
}

const games = [
  {
    solution: ['7', '*', '8', '-', '1', '2'],
    total: 44
  },
  {
    solution: ['9', '+', '5', '-', '1', '0'],
    total: 4
  },
  {
    solution: ['0', '*', '8', '-', '1', '2'],
    total: -12
  },
  {
    solution: ['3', '+', '4', '+', '9', '9'],
    total: 106
  },
  {
    solution: ['1', '6', '*', '2', '-', '8'],
    total: 24
  },
  {
    solution: ['9', '9', '-', '9', '/', '3'],
    total: 96
  }
]

export const fetchDailyGame = (): GameSettings => {
  return games[0]
}

export const fetchRandomGame = (): GameSettings => {
  const index = Math.floor(Math.random() * games.length)
  return games[index]
}
