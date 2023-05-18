import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Key from './index'

describe('<Key />', () => {
  it('should render one button', () => {
    const { container } = render(
      <Key
        exactMatch={false}
        keyType="1"
        looseMatch={false}
        noMatch={false}
      />
    )
    expect(container.getElementsByClassName('button').length).toBe(1)
  })

  it('should render exact-match class for an exact match', () => {
    const { container } = render(
      <Key
        exactMatch={true}
        keyType="1"
        looseMatch={false}
        noMatch={false}
      />
    )
    expect(container.getElementsByClassName('exact-match').length).toBe(1)
  })

  it('should render loose-match class for a loose match', () => {
    const { container } = render(
      <Key
        exactMatch={false}
        keyType="1"
        looseMatch={true}
        noMatch={false}
      />
    )
    expect(container.getElementsByClassName('loose-match').length).toBe(1)
  })

  it('should render no-match class for no match', () => {
    const { container } = render(
      <Key
        exactMatch={false}
        keyType="1"
        looseMatch={false}
        noMatch={true}
      />
    )
    expect(container.getElementsByClassName('no-match').length).toBe(1)
  })
})
