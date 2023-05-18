import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Keypad from './index'
import { ACTIONS, DIGITS, OPERATORS } from '../../constants'

describe('<Keypad />', () => {
  it('should render three button-containers', () => {
    const { container } = render(
          <Keypad
            actionButtons={ACTIONS}
            digitKeys={DIGITS}
            operatorKeys={OPERATORS}
          />)
    expect(container.getElementsByClassName('button-container').length).toBe(3)
  })
})
