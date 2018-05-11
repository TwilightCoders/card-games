import React, { Component, Fragment } from 'react';
import {
  //ButtonGroup,
  Button,
  //Form,
  //FormGroup,
  //Input,
  //Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

export default class ScoresModal extends Component {
  constructor(props) {
    super(props);

    // Global vars - used to influence how the scoreboard is rendered
    this.allPositives = this.props.gameplay.scoreTypes.indexOf('negative') >= 0 && this.props.gameplay.scoreTypes.indexOf('positive') >= 0;

    this.state = this.seedState(this.props.players.length);

    this.scoreFields = this.scoreFields.bind(this);
    this.updateScores = this.updateScores.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(this.seedState(this.props.players.length));
    this.props.toggle();
  }

  enterScore(event, index) {
    let { scores, validation } = this.state;
    const pattern = new RegExp('^' + event.target.pattern + '$', 'u');//  /^[0-9]{0,5}$/
    const newScore = event.target.value;
    const testResult = pattern.test(newScore);

    validation[index] = testResult;

    //alert(testResult);

    if (testResult) {
      scores[index] = newScore;
    }

    this.setState({
      scores: scores,
      validation: validation,
    })
  }

  updateScores() {
    this.props.updateScores(this.state.scores);
    this.toggle();
  }

  scoreFields() {
    const { players, gameplay } = this.props;

    const negatives = (
      gameplay.scoreTypes.indexOf('positive') >= 0 &&
      gameplay.scoreTypes.indexOf('negative') >= 0
    );

    const whammies = gameplay.whammies;

    const passes = gameplay.passesAllowed;

    return players.map((player, index) => {
      return (
        <Fragment id={`scoreFields${index}`}>
          <div className='form-group'>
            <label for={`player${index}Score`}>{player}:</label>
            <div className='input-group mb-3'>
              {negatives && 
                <div className='input-group-prepend'>
                  <span className='input-group-text'>
                    <input type='checkbox' className='mr-2' />
                    Negative
                  </span>
                </div>
              }
              <input
                type='text'
                id={`player${index}Score`}
                className='form-control'
                pattern='[0-9]{1,5}'
                onChange={(event) => this.enterScore(event, index)}
                value={this.state.scores[index] || ''}
              />
              {(whammies || passes) && 
                <div className='input-group-append'>
                  {whammies && <button className='btn btn-outline-secondary'>{gameplay.whammieName}!</button>}
                  {passes && <button className='btn btn-outline-secondary'>Pass!</button>}
                </div>
              }
            </div>
          </div>
        </Fragment>
      );
    });
  }

  seedState(numPlayers) {
    if (numPlayers < 1) return;

    const scores = [];
    const validation = [];

    for (let i = 0; i < numPlayers; ++i) {
      validation.push(false);
      scores.push(null);
    }

    return { validation, scores };
  }

  render() {
    const { open, round, gameplay } = this.props;
    const toggle = this.toggle;

    // By default, assume positive and negative numbers are ok
    let scoreHeader = 'Enter scores using positive numbers';

    // If only one type of score is possible, instruct the user to enter positive numbers, and select the minus option
    // next to the score field to treat the number as negative
    if (this.allPositives) {
      scoreHeader += '. If a negative score is desired select the \'negative\' option next to the score field';
    }

    return (
      <Modal isOpen={open} toggle={toggle}>
        <ModalHeader toggle={toggle}>Enter Scores for Round {gameplay.levelLabels(round)}</ModalHeader>
        <ModalBody>
          <p>{scoreHeader}</p>
          {this.scoreFields()}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateScores}>Start Game</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}