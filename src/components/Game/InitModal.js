import React, { Component } from 'react';

import {
  //ButtonGroup,
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'mdbreact';

const defaultAvatar = require('../../avatars/default.svg');

export default class InitModal extends Component {
  constructor(props) {
    super(props);

    // Bind 'this' to the needed methods
    this.toggle = this.toggle.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
    this.startGame = this.startGame.bind(this);

    // Global private vars:
    this.playerCountToggle = [];
    this.playerNameInputs = [];

    // Pull out the needed props
    const { possiblePlayers, name } = this.props.settings;

    // Set the default players to something
    const defaultPlayers = possiblePlayers.min;

    // Seed a list of player names based on the amount of players passed in
    let playerNames = this.seedPlayerNames(defaultPlayers);

    // Seed the validation array as well
    let validation = this.seedValidation(defaultPlayers);

    // Set the player count selection to a class variable so it can be accessed multiple times without re-calculating it
    //this.playerCountSelection = this.seedPlayerCount(possiblePlayers.min, possiblePlayers.max);

    // Set the default state so that we can reset it every time we toggle the modal
    this.defaultState = {
      gameName: name,
      possiblePlayers: possiblePlayers,
      players: playerNames,
      numPlayers: possiblePlayers.min,
      validation: validation,
    };

    // Copy the default state, and assign that to state
    this.state = this.getDefaultState();
  }

  // Use an internal toggle method to perform some cleanup, since hiding a modal is different than unmounting it
  toggle() {
    this.setState(this.getDefaultState());
    this.props.toggle();
  }

  getDefaultState() {
    const state = this.defaultState;

    state.players = state.players.splice();

    return state;
  }

  seedPlayerNames(maxPlayers) {
    let players = [];
    for (let player = 0; player < maxPlayers; ++player) {
      players.push('');
    }
    return players;
  }

  seedValidation(maxPlayers) {
    let validation = [];
    for (let player = 0; player < maxPlayers; ++player) {
      validation.push(false);
    }
    return validation;
  }

  changeName(event, id) {
    let { players, validation } = this.state;
    let newName = event.target.value;
    players[id] = newName;
    validation[id] = newName !== '';

    this.setState({ players, validation });
  }

  checkValidation() {
    let { validation } = this.state;

    if (validation.length === 1) return validation[0];

    let validated = validation.reduce((accum, value) => {
      return accum && value;
    });

    return validated;
  }


  togglePlayers(num = 2) {
    if (num < this.state.possiblePlayers.min || num > this.state.possiblePlayers.max) return;

    let newNames = [];
    let newValidation = [];

    for (let i = 0; i < num; ++i) {
      if (i < this.state.players.length) {
        newNames.push(this.state.players[i]);
        newValidation.push(true);
      } else {
        newNames.push('');
        newValidation.push(false);
      }
    }

    this.setState({
      numPlayers: num,
      players: newNames,
      validation: newValidation
    });
  }


  startGame() {
    const answer = this.checkValidation() ? 'yes' : 'no';

    if (!answer) return alert('Player names not set up correctly!');

    this.props.startGame(this.state.players.slice());
    this.toggle();
  }

  renderPlayerInfo() {
    let numPlayersGroup = [];
    let playerNames = [];

    const {
      //gameName,
      possiblePlayers,
      players,
      numPlayers
    } = this.state;

    for (let i = 0; i < possiblePlayers.max; ++i) {
      if (i >= (possiblePlayers.min - 1)) {
        let active = this.state.numPlayers === (i + 1);
        numPlayersGroup.push(
          <Button
            {...(!active ? {outline: true} : null)}
            key={`numPlayerSelect${i}`}
            onClick={() => this.togglePlayers(i + 1)}
            active={active}
            color="primary"
            light
            className='z-depth-0'
          >
            {i + 1}
          </Button>
        );
      }
      let id = `player${i + 1}name`;
      
      let playerEdit = (
        <div className='col-12 col-md-6 col-lg-4 mb-3' key={`playerName${i}`}>
          <Card className='text-center'>
            <CardBody>
              <div className='row'>
                <div className='col-4'>
                  <img src={defaultAvatar} alt='defaultAvatar' className='rounded-circle z-depth-1 m-3 indigo d-inline img-fluid' />
                </div>
                <div className='col'>
                  <CardTitle>{`Player ${i + 1}`}</CardTitle>
                  <CardText><Input id={id} label='Name' value={players[i]} onChange={(e) => this.changeName(e, i)} /></CardText>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      );

      if (i < numPlayers) playerNames.push(playerEdit);
    }

    this.playerCountToggle = numPlayersGroup;
    this.playerNameInputs = playerNames;
  }


  render() {
    const { open, settings } = this.props;

    this.renderPlayerInfo();

    return (
      <Modal isOpen={open} toggle={this.toggle} size='lg'>
        <ModalHeader toggle={this.toggle}>Initialize {settings.name}!</ModalHeader>
        <ModalBody>
          <h3>Select the number of players:</h3>
          {this.playerCountToggle}
          <h3>Configure Players</h3>
          <div className='row'>
            {this.playerNameInputs}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button outline color='danger' onClick={this.toggle}>Cancel</Button>{' '}
          <Button color="primary" onClick={this.startGame}>Start Game</Button>
        </ModalFooter>
      </Modal>
    );
  }

  /*

  startGame() {
    let errors = this.state.validation.reduce((accum, value) => {
      return accum && value;
    });

    if (!errors) { return alert('Not all fields filled out!'); }

    this.props.startGame(this.state.names);

    this.resetState();
  }*/
}
