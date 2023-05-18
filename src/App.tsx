import { ACTIONS, DIGITS, OPERATORS } from './constants'
import Header from './components/Header'
import Grid from './components/Grid'
import Keypad from './components/Keypad'
import GameProvider from './providers/game'

import './styles.css'

export default function App () {
  return (
    <div className="game-container">
      <GameProvider>
        <Header />
        <Grid />
        <Keypad
          actionButtons={ACTIONS}
          digitKeys={DIGITS}
          operatorKeys={OPERATORS}
        />
      </GameProvider>
    </div>
  )
}
