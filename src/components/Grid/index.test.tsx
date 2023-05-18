import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Grid from './index'
import GameProvider from '../../providers/game'

describe('<Grid />', () => {
  it('should render a grid-container', () => {
    const { container } = render(<Grid />)
    expect(container.getElementsByClassName('grid-container').length).toBe(1)
  })

  it('should render a grid', () => {
    const { container } = render(<Grid />)
    expect(container.getElementsByClassName('grid').length).toBe(1)
  })

  it('should render boxes based on context', () => {
    const { container } = render(
        <GameProvider>
          <Grid />
        </GameProvider>
    )
    expect(container.getElementsByClassName('cell').length).toBe(36)
  })
})
