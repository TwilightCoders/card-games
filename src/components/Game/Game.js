import React, { Component, Fragment } from 'react';
import { Prompt, withRouter } from 'react-router-dom';
//import { donut as game } from '../../games';
import uuidv1 from 'uuid/v1';
import NavBar from '../NavBar/NavBar';
import Scoreboard from './Scoreboard';
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
    //this.makeGameGrid = this.makeGameGrid.bind(this);
    this.isGameOver = this.isGameOver.bind(this);
    this.scoreLabel = this.scoreLabel.bind(this);
  }

  // Based on a given value, return what the label for that value should be. This ensures passes and whammie
  // names are displayed correctly without having to hard code that logic into the render function
  scoreLabel(val) {
    //if (Number.isInteger(val)) return val;
    if (val === 'pass') return 'Pass';
    if (val === 'whammie') return this.state.gameplay.whammieName;
    return val;
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

  // Based on a given 2d array of scores, total each column and return the totals in a new array
  getTotalScores(scores = this.state.scores) {
    let { gameplay } = this.state;

    let totalScores = [];

    const multiplier = gameplay.scoreTypes.indexOf('positive') < 0 ? -1 : 1;

    scores.forEach((rounds, round) => {
      rounds.forEach((score, col) => {
        if (score === 'pass') score = 0;
        if (score === 'whammie') score = gameplay.whammieScore;
        else score *= multiplier;

        if (round === 0) totalScores.push(score + gameplay.startScore);
        else totalScores[col] += score;
      });
    });

    return totalScores;
  }

  // This function will update state to match the conditions needed to start the game. The provided array of players will be set
  // to the game, and the scoreboard will be initialized based on whether it has predefined rounds or not. Finally initialized
  // and started variables within state will be set to true
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

  // This function will get passed as a prop to the scores modal, which will enable the scores modal to update the scores of the current round
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


  // This function will check all the possible reasons for the game to be over, and return a boolean indicating if the game is over or not
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

  // Very simple function that will toggle the state responsible for showing or hiding the initialization modal
  toggleInitModal() {
    this.setState({ initModalOpen: !this.state.initModalOpen });
  }

  // Very simple function that will toggle the state responsible for showing or hiding the scores modal
  toggleScoresModal() {
    this.setState({ scoresModalOpen: !this.state.scoresModalOpen });
  }

  // This function will be provided with a question (a simple string) and an action (a function) that when the user selects
  // "yes" on the confirm dialog, will be performed. This will also set the necessary state variable to true to actually
  // display the confirm modal
  confirmDialog(question, action) {
    this.setState({
      confirmDialog: {
        open: true,
        question: question,
        action: action,
      }
    });
  }

  // Will render the game if it is initialized, or offer the option to start the game if not.
  render() {
    // Save this value to a variable to avoid calculating it multiple times per render
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
          {!this.state.initialized && // If this game is not initialized, then render a button that allows you to initialize it
            <button
              className='btn btn-primary'
              onClick={this.toggleInitModal}
            >Initialize Game</button>
          }
          {this.state.initialized &&  // If the game is initialized, then render it!
            <Fragment>
              <Scoreboard
                players={this.state.players}
                currentRound={this.state.currentRound}
                scores={this.state.scores}
                gameplay={this.state.gameplay}
                totalScores={this.getTotalScores()}
                scoreLabel={(score) => this.scoreLabel(score)}
              />
              {/* render the buttons to add a score, or reset the game */}
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
            scoreLabel={this.scoreLabel}
            />
        }
      </div>
    );
  }
}

export default withRouter(Game);
