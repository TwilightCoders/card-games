import React, { Component, Fragment } from 'react';
import { Prompt } from 'react-router-dom';
import uuidv1 from 'uuid/v1';
import NavBar from '../NavBar/NavBar';
import InitModal from './InitModal';
import ScoresModal from './ScoresModal';
import ConfirmModal from './ConfirmModal';

// Generate UUID, and append that UUID to the game once initialized so that we can use this
// functionality to make a multi-user game possible

// Note - this paradigm should be able to be created per type of game, and when supplied to this
// game component, should render that game correctly
// eslint-disable-next-line
const threeThirteen = {
  id: null,
  settings: { // These settings define how to initialize the game
    name: 'Three Thirteen',             // Name of the game
    possiblePlayers: {min: 2, max: 6},  // Min & Max
  },
  gameplay: {  // These settings govern how the game should be played, after it has been initiated
    scoreTypes: ['positive'], // This should define what type of scores will be calculated ([positive], [negative])
    startScore: 0,            // The score every player will start with
    whammies: false,          // Defines whether or not a game contains "whammies" (aka, donuts, or something else)
    whammieScore: null,       // What is the value of a whammie? (Number)
    whammieStyle: null,       // What type of css style will be applied to the whammie when rendered on the scoreboard? ([circled], [blockout])
    whammieName: null,        // What is the name of the whammie?
    passesAllowed: false,     // Defines if a player can pass a turn, or if they have to play every turn
    fixedRounds: 11,          // Defines if there should be a fixed number of rounds to the game
    winType: 'score',         // ['rounds', 'score']
    winCondition: 'low',      // if 'rounds', then number of rounds completed. If score, then will high or low score win ('rounds', 'low', 'high')
    winScore: null,           // 
    tieBreaker: null,         // if the game can be a tie when the finished condition is met, then what will break the tie? Same options as win condition
    dealerRotates: true,      // If the dealer of the game rotates, then the game will be set up that way - if false, then none of the players will be identified as a dealer
    preRenderScoreboard: true,// If the scoreboard should be pre-rendered, then indicate so
    levelLabels: (num) => {   // A function that will define what the label should be for a given level
      if (num < 0 || num > 10) return;
      num += 3;

      // Catch the levels that should be named according to their card's face value, instead of numeric value
      num = (num === 11) ? 'J' : num;
      num = (num === 12) ? 'Q' : num;
      num = (num === 13) ? 'K' : num;

      return num + '\'s';
    },
  },
  description: '',            // A description of the game, which can be called ondemand by the app user - formatted with markdown
  initialized: false,
  started: false,
  currentRound: 0,
  scores: [],
  players: [],
  initModalOpen: false,
  scoresModalOpen: false,
  confirmDialog: {
    open: false,
    question: '',
    action: () => { return false },
  }
};

// eslint-disable-next-line
const donut = {
  id: null,
  settings: { // These settings define how to initialize the game
    name: 'Donut',             // Name of the game
    possiblePlayers: { min: 3, max: 6 },  // Min & Max
  },
  gameplay: {  // These settings govern how the game should be played, after it has been initiated
    scoreTypes: ['negative'],   // This should define what type of scores will be calculated ([positive], [negative])
    startScore: 21,             // The score every player will start with
    whammies: true,             // Defines whether or not a game contains "whammies" (aka, donuts, or something else)
    whammieScore: +5,           // What is the value of a whammie? (Number)
    whammieStyle: 'circled',    // What type of css style will be applied to the whammie when rendered on the scoreboard? ([circled], [blockout])
    whammieName: 'Donut',       // What is the name of the whammie?
    passesAllowed: true,        // Defines if a player can pass a turn, or if they have to play every turn
    fixedRounds: false,         // Defines if there should be a fixed number of rounds to the game [false, Number]
    winType: 'score',           // ['rounds', 'score']
    winCondition: 'low',        // if 'rounds', then number of rounds completed. If score, then will high or low score win ('rounds', 'low', 'high')
    winScore: 0,                // What score creates a winner?
    tieBreaker: null,           // if the game can be a tie when the finished condition is met, then what will break the tie?
    dealerRotates: true,        // If the dealer of the game rotates, then the game will be set up that way - if false, then none of the players will be identified as a dealer
    preRenderScoreboard: false, // If the scoreboard should be pre-rendered, then indicate so (showing all fixed rounds)
    levelLabels: (num) => {     // A function that will define what the label should be for a given level
      return num + 1;
    },
  },
  description: '',            // A description of the game, which can be called ondemand by the app user - formatted with markdown
  initialized: false,
  started: false,
  currentRound: 0,
  scores: [],
  players: [],
  initModalOpen: false,
  scoresModalOpen: false,
  confirmDialog: {
    open: false,
    question: '',
    action: () => { return false },
  }
};

export default class Game extends Component {
  constructor(props) {
    super(props);

    let newGame = Object.assign({}, donut);
    newGame.id = uuidv1();

    this.state = newGame;

    this.toggleInitModal = this.toggleInitModal.bind(this);
    this.toggleScoresModal = this.toggleScoresModal.bind(this);
    this.confirmDialog = this.confirmDialog.bind(this);
    this.startGame = this.startGame.bind(this);
    this.makeGameGrid = this.makeGameGrid.bind(this);
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

  getTotalScores() {
    let { scores, gameplay } = this.state;

    let totalScores = [];

    const multiplier = gameplay.scoreTypes.indexOf('positive') < 0 ? -1 : 1;

    scores.forEach((rounds, round) => {
      rounds.forEach((score, col) => {
        score *= multiplier;
        if (round === 0) totalScores.push(score + gameplay.startScore);
        else totalScores[col] += score;
      });
    });

    //console.log(totalScores);

    return totalScores;
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

  startGame(players) {
    const { gameplay } = this.state;

    const numRounds = gameplay.preRenderScoreboard ? gameplay.fixedRounds : 1;

    this.setState({
      players: players,
      initialized: true,
      scores: this.seedScores(players.length, numRounds)
    })
  }

  updateScores(newScores = []) {
    if (newScores.length !== this.state.players.length) return;

    const { scores, currentRound } = this.state;

    scores[currentRound] = newScores;

    // Eventually replace this with a call to 'completeRound' which will check if there is a
    // winner, and if not, initialze everything for the next round - this will move to be
    // last within this function
    if (!this.state.gameplay.preRenderScoreboard)
      scores.push(this.seedScores(this.state.players.length, 1)[0]);

    //alert(currentRound);

    this.setState({
      scores: scores,
      currentRound: currentRound + 1,
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

  render() {
    return (
      <div>
        <Prompt
          when={this.state.initialized}
          message={() => {this.confirmDialog(
            'Are you sure you want to leave this game?',
            () => this.setState({ initialized: false })
          ); return false;}
          }
        />
        <NavBar />
        <div className="container">
          {!this.state.initialized &&
            <button
              className='btn btn-primary'
              onClick={this.toggleInitModal}
            >Initialize Game</button>
          }
          {this.state.initialized &&
            <Fragment>
              <h2>{`Game: ${this.state.settings.name}`}</h2>
              {this.makeGameGrid()}
              <div className='row'>
                <div className='col'>
                  <button className='btn btn-primary btn-block' onClick={this.toggleScoresModal}>Enter Scores</button>
                </div>
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
        {this.state.initialized &&
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