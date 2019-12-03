import React from 'react'
import {get} from 'lodash'
import MatchQrCode from './MatchQrCode'
import PlayerList from './PlayerList'
import globals from './styles/globals.css'

import styles from './styles/BeforeMatch.css'

class BeforeStart extends React.Component {
  handleStart = () => {
    this.props.onStart()
  }

  handleKickPlayer = playerId => {
    this.props.onKickPlayer(playerId)
  }

  render() {
    const {match} = this.props
    const {players, quiz} = match
    const hasQuestions = quiz.questions && get(quiz, 'questions', []).length > 0
    const hasPlayers = players.length !== 0
    return (
      <div className={styles.container}>
        <div className={styles.gridItem}>
          <div>
            <img src="/static/squizzy-mock.png" />
          </div>
          <h1 className={globals.heading}>Let's get Squizzy with it!</h1>
          <p className={globals.p}>{quiz.questions && <span>This quiz has {quiz.questions.length}</span>} questions. Are you ready?</p>
          <p className={globals.p}>Waiting for players...</p>
          { hasPlayers && <button className={globals.button} onClick={this.handleStart} disabled={!hasQuestions}>
            <div className={globals.inner}>Start Game</div>
          </button>}
        </div>

        <div className={styles.gridItem}>
          <MatchQrCode match={match} />
          <p className={globals.p}>Scan the QR code to get started!</p>
          <PlayerList match={match} onKickPlayer={this.handleKickPlayer} />
        </div>
      </div>
    )
  }
}

export default BeforeStart
