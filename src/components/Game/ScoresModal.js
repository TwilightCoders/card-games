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
    this.applyWhammie = this.applyWhammie.bind(this);
    this.applyPass = this.applyPass.bind(this);
    this.validScores = this.validScores.bind(this);
    this.enterScore = this.enterScore.bind(this);
  }

  // This toggle function will call its siblings 'seedState' function in order to reset the
  // state of this modal every time it is closed/opened based on the props given to it
  //
  // It will then call the parent's toggle function in order to show/hide it
  toggle() {
    this.setState(this.seedState(this.props.players.length));
    this.props.toggle();
  }

  // This function will be called upon change to a text box. The event is passed in, as well as
  // the player index this is in reference to. This function will extract the target pattern
  // from the input text box, and test to make sure the entered data passes validation.
  //
  // Validation will be kept in state in an array for easy testing later
  enterScore(event, index) {
    let { scores, validation } = this.state;
    const newScore = event.target.value;

    validation[index] = event.target.validity.valid && event.target.value.length > 0;

    if (event.target.validity.valid) {
      scores[index] = newScore;
    }

    this.setState({
      scores: scores,
      validation: validation,
    })
  }

  // This function simply calls the updateScores function that was passed in via props, and also calls
  // the sibling 'toggle' function as outlined above (to close the modal, and reset it)
  updateScores() {
    this.props.updateScores(this.state.scores);
    this.toggle();
  }

  // This function replaces whatever is typed into the text box of a given player score with a whammie
  // (which is something that cannot be typed in manually)
  applyWhammie(index = null) {
    if (index === null) return false;

    const { scores } = this.state;
    scores[index] = 'whammie';
    this.setState({scores: scores});
  }

  // This function replaces whatever is typed into the text box of a given player score with a pass
  // (which is something that cannot be typed in manually)
  applyPass(index = null) {
    if (index === null) return false;

    const { scores } = this.state;
    scores[index] = 'pass';
    this.setState({ scores: scores });
  }

  // This function seeds state based on the number of players being used. This will just create a very
  // basic array with a length matching the number of players. It will also create a matching array
  // called 'validation' which can be used to store the status of each input regarding if the content
  // is valid or not. This function returns a simple object containing both arrays
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

  // This function renders the form & inputs for the modal based on the curret state of the modal
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
        <Fragment key={`scoreFields${index}`}>
          <div className='form-group'>
            <label htmlFor={`player${index}Score`}>{player}:</label>
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
                type='tel'
                id={`player${index}Score`}
                className='form-control'
                pattern='[0-9]{0,5}'
                onChange={(event) => this.enterScore(event, index)}
                value={this.props.scoreLabel(this.state.scores[index])}
                inputMode='numeric'
              />
              {(whammies || passes) &&
                <div className='input-group-append'>
                  {whammies && <button className='btn btn-outline-secondary' onClick={() => this.applyWhammie(index)}>{gameplay.whammieName}!</button>}
                  {passes && <button className='btn btn-outline-secondary' onClick={() => this.applyPass(index)}>Pass!</button>}
                </div>
              }
            </div>
          </div>
        </Fragment>
      );
    });
  }

  // This function will tell you if the current scores are all valid, or not
  validScores() {
    return this.state.validation.every(curVal => {
      return curVal === true;
    });
  }

  // Based on the current state of the app and modal, and using helper functions, the modal is rendered to the screen
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
          <Button color="primary" onClick={this.updateScores}>Enter Scores</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}