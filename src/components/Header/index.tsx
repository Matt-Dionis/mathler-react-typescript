import React from 'react'
import { useGameContext } from '../../providers/game'

export default function Header (): JSX.Element {
  const [{ total }] = useGameContext()

  return (
    <div className="header">
      <h1 className="title">Mathler</h1>
      <h3 className="description">
        Find the hidden calculation that equals {total}
      </h3>
    </div>
  )
}
