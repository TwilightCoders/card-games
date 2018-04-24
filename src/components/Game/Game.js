import React, { Component } from 'react';
import { Prompt } from 'react-router-dom';
import uuidv1 from 'uuid/v1';
import NavBar from '../NavBar/NavBar';
import InitModal from './InitModal';

// Generate UUID, and append that UUID to the game once initialized so that we can use this
// functionality to make a multi-user game possible

// Note - this paradigm should be able to be created per type of game, and when supplied to this
// game component, should render that game correctly
const defaultGame = {
  id: null,
  settings: { // These settings define how to initialize the game
    name: 'Three Thirteen',             // Name of the game
    possiblePlayers: {min: 2, max: 6},  // Min & Max
  },
  gameplay: {  // These settings govern how the game should be played, after it has been initiated
    scoreTypes: ['positive'], // This should define what type of scores will be calculated ([positive], [negative])
    whammies: false,          // Defines whether or not a game contains "whammies" (aka, donuts, or something else)
    whammieScore: null,       // What is the value of a whammie? (Number)
    whammieStyle: null,       // What type of css style will be applied to the whammie when rendered on the scoreboard? ([circled], [blockout])
    passesAllowed: false,     // Defines if a player can pass a turn, or if they have to play every turn
    fixedRounds: 11,          // Defines if there should be a fixed number of rounds to the game
    winType: 'score',         // ['rounds', 'score']
    winValue: 'low',          // if 'rounds', then number of rounds completed. If score, then will high or low score win ('rounds', 'low', 'high')
    tieBreaker: null,         // if the game can be a tie when the finished condition is met, then what will break the tie?
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
};

export default class Game extends Component {
  constructor(props) {
    super(props);

    let newGame = Object.assign({}, defaultGame);
    newGame.id = uuidv1();

    this.state = newGame;

    this.toggleInitModal = this.toggleInitModal.bind(this);
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

  toggleInitModal() {
    this.setState({ initModalOpen: !this.state.initModalOpen });
  }

  render() {
    return (
      <div>
        <Prompt
          when={this.state.initialized}
          message={`Are you sure you want to go to leave this game?`}
        />
        <NavBar />
        <div className="container">
          {!this.state.initialized &&
            <button
              className='btn btn-primary'
              onClick={this.toggleInitModal}
            >Initialize Game</button>
          }
        </div>
        <InitModal open={this.state.initModalOpen} toggle={() => this.toggleInitModal()} settings={this.state.settings} />
      </div>
    );
  }
}