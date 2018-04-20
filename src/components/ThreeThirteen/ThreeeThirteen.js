import React, { Component, Fragment } from 'react';
import { Prompt } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import InitModal from './InitModal';
import ScoresModal from './ScoresModal';

const initialState = {
  initialized: false,
  numRounds: 11,
  currentRound: 0,
  players: [],
  scores: [],
  initModalOpen: false,
  scoresModalOpen: false
}

export default class ThreeThirteen extends Component {
  constructor(props) {
    super(props);

    this.toggleInitModal = this.toggleInitModal.bind(this);
    this.toggleScoresModal = this.toggleScoresModal.bind(this);
    this.startGame = this.startGame.bind(this);
    this.makeGameGrid = this.makeGameGrid.bind(this);
    this.getTotalScores = this.getTotalScores.bind(this);
    
    this.state = initialState;
  }

  componentWillUnmount() {
    this.reset();
  }

  reset() {
    this.setState({...initialState});
  }

  toggleInitModal() {
    this.setState({ initModalOpen: !this.state.initModalOpen });
  }

  toggleScoresModal() {
    this.setState({ scoresModalOpen: !this.state.scoresModalOpen });
  }

  seedScores(players, numRounds) {
    let newScores = [];

    for (let rounds = 0; rounds < numRounds; ++rounds) {
      let round = [];
      for (let numPlayers = 0; numPlayers < players.length; ++numPlayers) {
        round.push(null);
      }
      newScores.push(round);
    }

    console.log(newScores);

    return newScores;
  }

  startGame(players) {
    this.setState({
      initModalOpen: false,
      initialized: true,
      players: players,
      scores: this.seedScores(players, this.state.numRounds)
    });
  }

  getRoundLabel(num) {
    if (num < 8 && num >= 0) return num + 3;
    if (num === 8) return 'J';
    if (num === 9) return 'Q';
    if (num === 10) return 'K';
  }

  makeGameGrid() {
    if (!this.state.initialized) return null;

    let { players, currentRound, scores } = this.state;

    let totalScores = this.getTotalScores();

    let gameGrid = (
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
                <th scope='row' className='text-center'>{`${this.getRoundLabel(roundNumber)} - ${players[roundNumber % players.length]}`}</th>
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

  getTotalScores() {
    let { scores } = this.state;

    let totalScores = [];

    scores.forEach((rounds, round) => {
      rounds.forEach((score, col) => {
        if (round === 0) totalScores.push(score);
        else totalScores[col] += score;
      });
    });

    console.log(totalScores);

    return totalScores;
  }

  render() {
    return (
      <div>
        <Prompt
          when={this.state.initialized}
          message={`Are you sure you want to go to leave this game?`}
        />
        <NavBar />
        <div className='container'>
          <h2>Three Thirteen{this.state.initialized && ` - Round: ${this.getRoundLabel(this.state.currentRound)}'s`}</h2>
          {!this.state.initialized && <button className='btn btn-primary' onClick={this.toggleInitModal}>Initialize Game</button>}
          { this.state.initialized && 
            <Fragment>
              {this.makeGameGrid()}
              <div className='row'>
                <div className='col'>
                  <button className='btn btn-primary btn-block' onClick={this.toggleScoresModal}>Enter Scores</button>
                </div>
                <div className='col'>
                  <button className='btn btn-danger btn-block' onClick={() => this.reset()}>Reset Game</button>
                </div>
              </div>
            </Fragment>
          }
        </div>
        <InitModal open={this.state.initModalOpen} toggle={this.toggleInitModal} startGame={this.startGame} />
        <ScoresModal
          open={this.state.scoresModalOpen}
          toggle={this.toggleScoresModal}
          round={this.getRoundLabel(this.state.currentRound)}
          players={this.state.players}
        />
      </div>
    );
  }
}
