import React, { Component, Fragment } from 'react';
import {
  //ButtonGroup,
  Button,
  Card,
  CardBody,
  //CardText,
  CardTitle,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'mdbreact';

import AvatarSelect from '../AvatarSelect';

//import { PlayersContext, AvatarContext } from '../Players';

export default class InitModal extends Component {
  constructor(props) {
    super(props);

    // Global private vars:
    this.playerCountToggle = [];
    this.playerNameInputs = [];

    // Pull out the needed props
    const { possiblePlayers, name } = this.props.settings;

    // Set the default players to something
    const defaultPlayers = possiblePlayers.min;

    // Seed a list of player names based on the amount of players passed in
    let players = this.seedPlayers(defaultPlayers);

    // Seed the validation array as well
    let validation = this.seedValidation(defaultPlayers);

    // Set the default state so that we can reset it every time we toggle the modal
    this.defaultState = {
      gameName: name,
      possiblePlayers: possiblePlayers,
      players: players,
      numPlayers: possiblePlayers.min,
      validation: validation,
      editingPlayer: null,
      avatarSelect: false,
      alertOpen: false,
      alertMessage: '',
    };

    // Copy the default state, and assign that to state
    this.state = this.getDefaultState();
  }

  alertToggle = (message = '') => {
    this.setState(state => {
      const alertMessage = (message !== '') ? message : this.state.alertMessage;
      return {
        alertOpen: !state.alertOpen,
        alertMessage: alertMessage,
      }
    });
  }

  // Use an internal toggle method to perform some cleanup, since hiding a modal is different than unmounting it
  toggle = () => {
    this.setState(this.getDefaultState());
    this.props.toggle();
  }

  getDefaultState = () => {
    return Object.assign({}, this.defaultState);
  }
  
  getDefaultPlayer = () => {
    return {color: null, name: '', avatar: this.props.defaultAvatar};
  }

  seedPlayers = (maxPlayers) => {
    let players = [];
    for (let player = 0; player < maxPlayers; ++player) {
      players.push(this.getDefaultPlayer());
    }
    return players;
  }

  seedValidation = (maxPlayers) => {
    let validation = [];
    for (let player = 0; player < maxPlayers; ++player) {
      validation.push(false);
    }
    return validation;
  }

  changeName = (event, id) => {
    let { players, validation } = this.state;
    let newName = event.target.value;
    players[id].name = newName;
    validation[id] = newName !== '';

    this.setState({ players, validation });
  }

  checkValidation = () => {
    let { validation } = this.state;

    if (validation.length === 1) return validation[0];

    let validated = validation.reduce((accum, value) => {
      return accum && value;
    });

    return validated;
  }

  togglePlayers = (num = 2) => {
    if (num < this.state.possiblePlayers.min || num > this.state.possiblePlayers.max) return;

    let newNames = [];
    let newValidation = [];

    for (let i = 0; i < num; ++i) {
      if (i < this.state.players.length) {
        newNames.push(this.state.players[i]);
        newValidation.push(true);
      } else {
        newNames.push(this.getDefaultPlayer());
        newValidation.push(false);
      }
    }

    this.setState({
      numPlayers: num,
      players: newNames,
      validation: newValidation
    });
  }
  
  applyAvatar = (avatar, color, playerIndex) => {
    this.setState(state => {
      const players = state.players;
      
      players[playerIndex].avatar = avatar;
      players[playerIndex].color = color;
      return {
        players: players
      };
    })
  }
  
  getAvatar = (playerIndex) => {
    this.setState(state => ({
      avatarSelect: true,
      editingPlayer: {index: playerIndex, color: state.players[playerIndex].color, avatar: state.players[playerIndex].avatar},
    }));
  }

  startGame = () => {
    const answer = this.checkValidation();// ? 'yes' : 'no';
    
    // Figure out why I can't get alertToggle to work later
    if (!answer) return this.props.alertToggle('Player names not set up correctly!', false);

    this.props.startGame(this.state.players.slice());
    this.toggle();
  }

  renderPlayerInfo = () => {
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
            light='true'
            className='z-depth-0'
          >
            {i + 1}
          </Button>
        );
      }
      let id = `player${i + 1}name`;
      
      let playerEdit = (i >= numPlayers) ? null : (
        <div className='col-12 col-md-6 col-lg-4 mb-3' key={`playerName${i}`}>
          <Card className='text-center'>
            <CardBody>
              <div className='row no-gutters'>
                <div className='col-4'>
                  <img
                    src={players[i].avatar}
                    alt='player avatar'
                    className={`rounded-circle z-depth-1 mr-1 d-inline img-fluid ${players[i].color}`}
                    onClick={() => this.getAvatar(i)}
                  />
                </div>
                <div className='col'>
                  <CardTitle>{`Player ${i + 1}`}</CardTitle>
                </div>
              </div>
              <div className='row no-gutters'>
                <div className='col mt-2'>
                  <Button block onClick={() => this.getAvatar(i)} color='info' size='sm'>[ Change Avatar ]</Button>
                  <div className='card-text'><Input tabIndex={i + 1} id={id} label='Name' value={players[i].name} onChange={(e) => this.changeName(e, i)} /></div>
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
      <Fragment>
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
        <AvatarSelect
          open={this.state.avatarSelect}
          player={this.state.editingPlayer}
          assign={(avatar, color, player) => this.applyAvatar(avatar, color, player)}
          toggle={() => { this.setState(state => ({ avatarSelect: !state.avatarSelect }))}}
        />
      </Fragment>
    );
  }
}
