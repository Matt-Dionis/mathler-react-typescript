import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Header from './index'
import GameProvider from '../../providers/game'

describe('<Header />', () => {
  it('should render a header', () => {
    const { container } = render(<Header />)
    expect(container.getElementsByClassName('header').length).toBe(1)
  })

  it('should render a title', () => {
    render(<Header />)
    expect(screen.getByText(/Mathler/)).toBeInTheDocument()
  })

  it('should render a description with a total based on context', () => {
    render(
        <GameProvider>
          <Header />
        </GameProvider>
    )
    expect(screen.getByText(/Find the hidden calculation that equals 44/)).toBeInTheDocument()
  })
})
