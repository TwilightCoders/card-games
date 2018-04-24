import React, { Component, Fragment } from 'react';
import {
  ButtonGroup,
  Button,
  //Form,
  //FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

/*const defaultData = {
  possiblePlayers: 6,
  numPlayers: 2,
  names: ['', ''],
  validation: [false, false]
};*/

export default class InitModal extends Component {
  constructor(props) {
    super(props);

    // Global private vars:
    this.playerCountToggle = [];
    this.playerNameInputs = [];

    // Pull out the needed props
    const { possiblePlayers, name } = this.props.settings;

    // Seed a list of player names based on the amount of players passed in
    let playerNames = this.seedPlayerNames(possiblePlayers.min);

    // Set the player count selection to a class variable so it can be accessed multiple times without re-calculating it
    //this.playerCountSelection = this.seedPlayerCount(possiblePlayers.min, possiblePlayers.max);

    // Set the default state so that we can reset it every time we toggle the modal
    this.defaultState = {
      gameName: name,
      possiblePlayers: possiblePlayers,
      players: playerNames,
      numPlayers: possiblePlayers.min,
      validation: [false],
    };

    // Copy the default state, and assign that to state
    this.state = Object.assign({}, this.defaultState);

    // Bind 'this' to the needed methods
    this.toggle = this.toggle.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  // Use an internal toggle method to perform some cleanup, since hiding a modal is different than unmounting it
  toggle() {
    this.setState({ ...this.defaultState });
    this.props.toggle();
  }

  seedPlayerNames(maxPlayers) {
    let players = [];
    for (let player = 0; player < maxPlayers; ++player) {
      players.push('');
    }
    return players;
  }

  changeName(event, id) {
    let { players, validation } = this.state;
    let newName = event.target.value;
    players[id] = newName;
    validation[id] = newName !== '';

    this.setState({ players, validation });
  }

  checkValidation() {
    let validated = this.state.validation.reduce((accum, value) => {
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
    alert(this.checkValidation());
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
        numPlayersGroup.push(
          <Button
            key={`numPlayerSelect${i}`}
            onClick={() => this.togglePlayers(i + 1)}
            active={this.state.numPlayers === (i + 1)}
          >
            {i + 1}
          </Button>
        );
      }
      let id = `player${i + 1}name`;
      let playerName = (
        <Fragment key={`playerName${i}`}>
          <Label for={id}>Player {i + 1}</Label>
          <Input id={id} value={players[i]} onChange={(e) => this.changeName(e, i)} />
        </Fragment>
      );

      if (i < numPlayers) playerNames.push(playerName);
    }

    this.playerCountToggle = numPlayersGroup;
    this.playerNameInputs = playerNames;
  }


  render() {
    const { open } = this.props;

    this.renderPlayerInfo();

    return (
      <Modal isOpen={open} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Initialize Game!</ModalHeader>
        <ModalBody>
          <h3>Select the number of players:</h3>
          <ButtonGroup>
            {this.playerCountToggle}
          </ButtonGroup>
          <h3>Enter player names:</h3>
          {this.playerNameInputs}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.startGame}>Start Game</Button>{' '}
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }

  /*resetState() {
    this.setState({
      names: defaultData.names.slice(),
      numPlayers: defaultData.numPlayers,
      validation: defaultData.validation.slice()
    });
  }

  toggle() {
    this.resetState();
    this.props.toggle();
  }

  togglePlayers(num = 2) {
    if (num < 1 || num > defaultData.possiblePlayers) return;

    let names = [];
    let validation = [];

    for (let i = 0; i < num; ++i) {
      if (i < this.state.names.length) {
        names.push(this.state.names[i]);
        validation.push(true);
      } else {
        names.push('');
        validation.push(false);
      }
    }

    this.setState({
      numPlayers: num,
      names: names,
      validation: validation
    });
  }

  changeName(event, id) {
    let { names, validation } = this.state;
    let newName = event.target.value;
    names[id] = newName;
    validation[id] = newName !== '';

    //alert(`id: ${id} name: ${event.target.value}`);
    this.setState({ names, validation });
  }

  startGame() {
    let errors = this.state.validation.reduce((accum, value) => {
      return accum && value;
    });

    if (!errors) { return alert('Not all fields filled out!'); }

    this.props.startGame(this.state.names);

    this.resetState();
  }*/
}
