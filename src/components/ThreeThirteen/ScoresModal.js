import React, { Component } from 'react';
import {
  //ButtonGroup,
  Button,
  //Form,
  //FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';


export default class ScoresModal extends Component {
  constructor(props) {
    super(props);

    let scores = [];

    this.props.players.forEach(player => {scores.push('')});

    this.state = {
      scores: scores
    }
  }

  updateScore(e, index) {
    let scores = this.state.scores.splice();

    scores[index] = e.target.value;

    this.setState({scores});
  }

  render() {
    let { open, toggle, round, players } = this.props;

    return (
      <Modal isOpen={open} toggle={toggle}>
        <ModalHeader toggle={toggle}>Submit scores for round {round}</ModalHeader>
        <ModalBody>
          {players.map((player, index) => {
            return (
              <p key={`playerScore${index}`}>
                <InputGroup>
                  <InputGroupAddon addonType='prepend'>{`${player}'s Score:`}</InputGroupAddon>
                  <Input value={this.state.scores[index]} onChange={(e) => this.updateScore(e, index)} />
                </InputGroup>
              </p>
            )
          })}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Submit Scores</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}
