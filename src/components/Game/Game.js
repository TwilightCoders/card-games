import React, { Component, Fragment } from 'react';
import { Prompt, withRouter } from 'react-router-dom';
//import { donut as game } from '../../games';
import uuidv1 from 'uuid/v1';
import NavBar from '../NavBar/NavBar';
import InitModal from './InitModal';
import ScoresModal from './ScoresModal';
import ConfirmModal from './ConfirmModal';

// Generate UUID, and append that UUID to the game once initialized so that we can use this
// functionality to make a multi-user game possible

const defaultProps = {
  confirmDialog: {
    open: false,
    question: '',
    action: () => { return false },
  },
  initialized: false,
  started: false,
  currentRound: 0,
  scores: [],
  players: [],
  initModalOpen: false,
  scoresModalOpen: false,
};

class Game extends Component {
  constructor(props) {
    super(props);

    this.defaultGame = Object.assign(defaultProps, this.props.game);

    let newGame = Object.assign({}, this.defaultGame);
    newGame.id = uuidv1();

    this.state = newGame;

    this.toggleInitModal = this.toggleInitModal.bind(this);
    this.toggleScoresModal = this.toggleScoresModal.bind(this);
    this.confirmDialog = this.confirmDialog.bind(this);
    this.startGame = this.startGame.bind(this);
    this.makeGameGrid = this.makeGameGrid.bind(this);
    this.isGameOver = this.isGameOver.bind(this);
  }

  // Based on a number of players, and rounds provided, return an empty 2d array with all the rows & cols for the game set to null
  seedScores(numPlayers, numRounds) {
    let scores = [];
    
    for (let roundNumber = 0; roundNumber < numRounds; ++roundNumber) {
      let round = []; // Push each player onto this array, which itself will be pushed onto the scores array
      for (let player = 0; player < numPlayers; ++player) {
        round.push(null);
      }
      scores.push(round);
    }
    // Return the formatted scores (this might also be applied to state directly in the future)
    return scores;
  }

  getTotalScores(scores = this.state.scores) {
    let { gameplay } = this.state;

    let totalScores = [];

    const multiplier = gameplay.scoreTypes.indexOf('positive') < 0 ? -1 : 1;

    scores.forEach((rounds, round) => {
      rounds.forEach((score, col) => {
        if (score === 'Pass') score = 0;
        if (score === 'Whammie') score = gameplay.whammieScore;
        else score *= multiplier;
        if (round === 0) totalScores.push(score + gameplay.startScore);
        else totalScores[col] += score;
      });
    });

    //console.log(totalScores);

    return totalScores;
  }

  startGame(players) {
    const { gameplay } = this.state;

    const numRounds = gameplay.preRenderScoreboard ? gameplay.fixedRounds : 1;

    this.setState({
      players: players,
      initialized: true,
      started: true,
      scores: this.seedScores(players.length, numRounds)
    })
  }

  updateScores(newScores = []) {
    if (newScores.length !== this.state.players.length) return;

    const { scores, currentRound } = this.state;

    scores[currentRound] = newScores;

    const isGameOver = this.isGameOver(this.getTotalScores(scores));

    // Eventually replace this with a call to 'completeRound' which will check if there is a
    // winner, and if not, initialze everything for the next round - this will move to be
    // last within this function
    if (!this.state.gameplay.preRenderScoreboard && !isGameOver)
      scores.push(this.seedScores(this.state.players.length, 1)[0]);

    const modifier = isGameOver ? 0 : 1;

    this.setState({
      scores: scores,
      currentRound: currentRound + modifier,
    });
  }

  makeGameGrid() {
    if (!this.state.initialized) return null;

    const { players, currentRound, scores, gameplay } = this.state;

    let totalScores = this.getTotalScores();

    const gameGrid = (
      <table className='table table-bordered table-hover'>
        <thead>
          <tr>
            <th scope='row' className='col-sm-3 col-md-2 text-center'>Round - (Dealer)</th>
            {players.map((name, index) => {
              return <th scope='row' key={`nameHeading${index}`} className='text-center'>{name}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {scores.map((round, roundNumber) => {
            let activeRow = (roundNumber === currentRound) ? 'table-primary' : '';
            return (
              <tr key={`round${roundNumber}`} className={activeRow}>
                <th scope='row' className='text-center'>{`${gameplay.levelLabels(roundNumber)} - ${players[roundNumber % players.length]}`}</th>
                {round.map((playerScore, scoreCol) => {
                  return <td key={`round${roundNumber}col${scoreCol}`} className='text-center'>{playerScore}</td>;
                })}
              </tr>
            );
          })}
          <tr>
            <th scope='row' className='text-center'>Total Scores:</th>
            {totalScores.map((score, index) => {
              return <td key={`totalScores${index}`} className='text-center'>{score}</td>
            })}
          </tr>
        </tbody>
      </table>
    );

    return gameGrid;
  }

  isGameOver(totalScores = this.getTotalScores()) {
    const { gameplay, currentRound, started } = this.state;

    if (!started) return true;

    const over = (
      (
        gameplay.preRenderScoreboard &&
        gameplay.fixedRounds <= currentRound
      ) || (
        gameplay.winScore !== null &&
        (
          totalScores.reduce((prevVal, curVal) => {
            if (prevVal > curVal) return curVal;
            return prevVal;
          }) <= gameplay.winScore
        )
      )
    );

    return over;
  }

  toggleInitModal() {
    this.setState({ initModalOpen: !this.state.initModalOpen });
  }

  toggleScoresModal() {
    this.setState({ scoresModalOpen: !this.state.scoresModalOpen });
  }

  confirmDialog(question, action) {
    this.setState({
      confirmDialog: {
        open: true,
        question: question,
        action: action,
      }
    });
  }

  render() {
    const isGameOver = this.isGameOver();

    return (
      <div>
        <Prompt
          when={this.state.initialized}
          message={
            location => {
              // TODO: Get this function to proprly allow navigation changes once the action is clicked on
              this.confirmDialog(
                'Are you sure you want to leave this game?',
                () => {
                  this.setState({ initialized: false, started: false });
                }
              );
              return false; // This might be a problem - but return to this later
            }
          }
        />
        <NavBar />
        <div className="container">
          <h2>{this.state.settings.name}</h2>
          {!this.state.initialized &&
            <button
              className='btn btn-primary'
              onClick={this.toggleInitModal}
            >Initialize Game</button>
          }
          {this.state.initialized &&
            <Fragment>
              {this.makeGameGrid()}
              <div className='row'>
                {!isGameOver &&
                  <div className='col'>
                    <button className='btn btn-primary btn-block' onClick={this.toggleScoresModal}>Enter Scores</button>
                  </div>
                }
                <div className='col'>
                  <button
                    className='btn btn-danger btn-block'
                    onClick={() => this.confirmDialog(
                      'Are you sure you want to reset the game?',
                      () => this.setState({initialized: false})
                    )}
                  >Reset Game</button>
                </div>
              </div>
            </Fragment>
          }
        </div>
        <ConfirmModal
          question={this.state.confirmDialog.question}
          action={this.state.confirmDialog.action}
          open={this.state.confirmDialog.open}
          toggle={() => this.setState({ confirmDialog: { open: !this.state.confirmDialog.open } })}
        />
        <InitModal
          open={this.state.initModalOpen}
          toggle={() => this.toggleInitModal()}
          settings={this.state.settings}
          startGame={this.startGame} />
        {this.state.initialized && !isGameOver &&
          <ScoresModal
            open={this.state.scoresModalOpen}
            toggle={() => this.toggleScoresModal()}
            settings={this.state.settings}
            gameplay={this.state.gameplay}
            players={this.state.players}
            round={this.state.currentRound}
            updateScores={this.updateScores.bind(this)}
            />
        }
      </div>
    );
  }
}

export default withRouter(Game);
