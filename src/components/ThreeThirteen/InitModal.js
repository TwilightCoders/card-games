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

const defaultData = {
  possiblePlayers: 6,
  numPlayers: 2,
  names: ['', ''],
  validation: [false, false]
};

export default class InitModal extends Component {
  constructor(props) {
    super(props);

    this.resetState = this.resetState.bind(this);
    this.togglePlayers = this.togglePlayers.bind(this);
    this.startGame = this.startGame.bind(this);
    this.toggle = this.toggle.bind(this);

    this.state = {
      names: defaultData.names.slice(),
      numPlayers: defaultData.numPlayers,
      validation: defaultData.validation.slice()
    };
  }

  resetState() {
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
  }

  render() {
    let { open } = this.props;
    let { numPlayers } = this.state;

    let numPlayersGroup = [];
    let playerNames = [];

    for (let i = 0; i < defaultData.possiblePlayers; ++i) {
      if (i > 0) numPlayersGroup.push(<Button key={`numPlayerSelect${i}`} onClick={() => this.togglePlayers(i + 1)} active={this.state.numPlayers === (i + 1)}>{i + 1}</Button>);
      let id = `player${i + 1}name`;
      let playerName = (
        <Fragment key={`playerName${i}`}>
          <Label for={id}>Player {i + 1}</Label>
          <Input id={id} value={this.state.names[i]} onChange={(e) => this.changeName(e, i)} />
        </Fragment>
      );

      if (i < numPlayers) playerNames.push(playerName);
    }

    return (
      <Modal isOpen={open} toggle={this.toggle}>
        <ModalHeader toggle={this.toggle}>Initialize Game!</ModalHeader>
        <ModalBody>
          <h3>Select the number of players:</h3>
          <ButtonGroup>
            {numPlayersGroup}
          </ButtonGroup>
          <h3>Enter player names:</h3>
          {playerNames}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.startGame}>Start Game</Button>{' '}
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}
