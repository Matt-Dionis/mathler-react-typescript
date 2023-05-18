import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Box from './index'
import GameProvider from '../../providers/game'

describe('<Box />', () => {
  it('should render a cell', () => {
    const { container } = render(<Box columnIndex={0} rowIndex={0} />)
    expect(container.getElementsByClassName('cell').length).toBe(1)
  })

  it('should render classes based on context', () => {
    const { container } = render(
      <GameProvider>
        <Box
          columnIndex={0}
          rowIndex={0}
        />
      </GameProvider>
    )
    expect(container.getElementsByClassName('active-populated').length).toBe(0)
    expect(container.getElementsByClassName('exact-match').length).toBe(0)
    expect(container.getElementsByClassName('loose-match').length).toBe(0)
    expect(container.getElementsByClassName('no-match').length).toBe(0)
  })
})
