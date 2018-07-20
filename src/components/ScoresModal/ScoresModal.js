import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from 'mdbreact';

class ScoresModal extends Component {
  constructor(props) {
    super(props);

    this.whammie = 'whammie';
    this.pass = 'pass';

    // Global vars - used to influence how the scoreboard is rendered
    this.allPositives = this.props.gameplay.scoreTypes.indexOf('negative') >= 0 && this.props.gameplay.scoreTypes.indexOf('positive') >= 0;

    this.state = this.seedState(this.props.players.length);
  }

  // This toggle function will call its siblings 'seedState' function in order to reset the
  // state of this modal every time it is closed/opened based on the props given to it
  //
  // It will then call the parent's toggle function in order to show/hide it
  toggle = () => {
    this.setState(this.seedState(this.props.players.length));
    this.props.toggle();
  }

  // This function will be called upon change to a text box. The event is passed in, as well as
  // the player index this is in reference to. This function will extract the target pattern
  // from the input text box, and test to make sure the entered data passes validation.
  //
  // Validation will be kept in state in an array for easy testing later
  enterScore = (event, index) => {
    let newScore = event.target.value;
    const isValid = event.target.validity.valid && newScore.length > 0 && newScore !== '-';

    //console.log(newScore + ' : ' + event.target.pattern + ' : ' + isValid)

    this.setState(state => {
      let { scores, validation, negatives, negativesAllowed } = state;

      validation[index] = isValid

      if (isValid || (negativesAllowed && newScore === '-')) {
        scores[index] = newScore;
        if (negativesAllowed && negatives[index] && newScore.charAt(0) !== '-')
          scores[index] = '-' + newScore;
      } else if (newScore.length < 2) {
        scores[index] = '';
      }

      if (negativesAllowed && negatives[index] && scores[index] && scores[index].charAt(0) !== '-') negatives[index] = false;
      if (negativesAllowed && !negatives[index] && scores[index].charAt(0) === '-') negatives[index] = true;

      if (scores[index] === '') negatives[index] = false;

      return {
        scores: scores,
        validation: validation,
        negatives: negatives,
      };
    });
  }


  clearScore = (index) => {
    this.setState(state => {
      const scores = state.scores;
      scores[index] = '';

      return {scores: scores};
    });
  }

  // This function simply calls the updateScores function that was passed in via props, and also calls
  // the sibling 'toggle' function as outlined above (to close the modal, and reset it)
  updateScores = () => {
    if (!this.validScores()) {
      this.props.alertToggle('Not all scores are valid', false);
      return false;
    }
    this.props.updateScores(this.state.scores);
    this.toggle();
  }

  // This function replaces whatever is typed into the text box of a given player score with a whammie
  // (which is something that cannot be typed in manually)
  applyWhammie = (index = null) => {
    if (index === null) return false;

    const { scores, negatives, validation } = this.state;
    if (scores[index] === this.whammie) scores[index] = '';
    else scores[index] = this.whammie;

    negatives[index] = false;
    validation[index] = true;

    this.setState({scores, negatives, validation});
  }

  // This function replaces whatever is typed into the text box of a given player score with a pass
  // (which is something that cannot be typed in manually)
  applyPass = (index = null) => {
    if (index === null) return false;

    const { scores, negatives, validation } = this.state;
    if (scores[index] === this.pass) scores[index] = '';
    else scores[index] = this.pass;

    negatives[index] = false;
    validation[index] = true;

    this.setState({ scores, negatives, validation });
  }

  applyNegative = (index = null) => {
    this.setState(state => {
      const { negatives, scores } = state;

      if (index === null || !state.negativesAllowed || !this.isNumber(scores[index])) return false;

      negatives[index] = !negatives[index];
      if (negatives[index] && scores[index] && scores[index].charAt(0) !== '-') scores[index] = '-' + scores[index];
      if (!negatives[index] && scores[index] && scores[index].charAt(0) === '-') scores[index] = scores[index].substr(1);

      return { negatives, scores };
    });
    
  }

  // This function seeds state based on the number of players being used. This will just create a very
  // basic array with a length matching the number of players. It will also create a matching array
  // called 'validation' which can be used to store the status of each input regarding if the content
  // is valid or not. This function returns a simple object containing both arrays
  seedState = (numPlayers) => {
    if (numPlayers < 1) return;

    const scores = [];
    const validation = [];
    const negatives = [];
    const negativesAllowed = (
      this.props.gameplay.scoreTypes.indexOf('positive') >= 0 &&
      this.props.gameplay.scoreTypes.indexOf('negative') >= 0
    );

    for (let i = 0; i < numPlayers; ++i) {
      validation.push(false);
      negatives.push(false);
      scores.push(null);
    }

    return { validation, scores, negatives, negativesAllowed };
  }

  // This function renders the form & inputs for the modal based on the curret state of the modal
  scoreFields = () => {
    const { players, gameplay } = this.props;

    const negatives = this.state.negativesAllowed;

    const whammies = gameplay.whammies;

    const passes = gameplay.passesAllowed;

    const playerCards = players.map((player, index) => {
      const score = this.props.scoreLabel(this.state.scores[index]);
      return (
        <Fragment key={`scoreFields${index}`}>
            <div className='col-12 col-lg-6'>
              <Card className='text-center mb-3'>
                <CardBody>
                  <div className='row no-gutters'>
                    <div className='col-4'>
                      <img
                        src={player.avatar}
                        alt='player avatar'
                        className={`rounded-circle z-depth-1 mr-1 d-inline img-fluid ${player.color}`}
                      />
                    </div>
                    <div className='col'>
                      <CardTitle>{player.name}</CardTitle>
                      <Button color='danger' size='sm' onClick={() => this.clearScore(index)}>Clear Score</Button>
                    </div>
                  </div>
                  <div className='row no-gutters'>
                    <div className='col mt-2'>
                      <div className='card-text'>
                        <Input
                          tabIndex={index + 1}
                          label={`${player.name}:`}
                          type='tel'
                          id={`player${index}Score`}
                          className='form-control'
                          pattern={'(-?\\d{0,5}|' + this.props.scoreLabel(this.whammie) + '|' + this.props.scoreLabel(this.pass) + ')'}
                          onChange={(event) => this.enterScore(event, index)}
                          value={score}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    {(whammies || passes || negatives) &&
                      <div className='col'>
                        {negatives && <Button size='sm' color="info" {...(this.state.negatives[index] ? { active: true } : { outline: true })} onClick={() => this.applyNegative(index)}>Negative Score</Button>}
                        {whammies && <Button size='sm' color="info" {...(this.state.scores[index] === this.whammie ? { active: true } : {outline: true})} onClick={() => this.applyWhammie(index)}>{gameplay.whammieName}!</Button>}
                        {passes && <Button size='sm' color="info" {...(this.state.scores[index] === this.pass ? { active: true } : {outline: true})} onClick={() => this.applyPass(index)}>Pass!</Button>}
                      </div>
                    }
                  </div>
                </CardBody>
              </Card>
            </div>
            {/*<div className='col'>
              {negatives &&
                <div className='input-group-prepend'>
                  <span className='input-group-text'>
                    <input type='checkbox' className='mr-2' />
                    Negative
                  </span>
                </div>
              }
              <Input
                label={`${player.name}:`}
                type='tel'
                id={`player${index}Score`}
                className='form-control'
                pattern={'([0-9]{0,5}|' + this.props.scoreLabel(this.whammie) + '|' + this.props.scoreLabel(this.pass) + ')'}
                onChange={(event) => this.enterScore(event, index)}
                value={this.props.scoreLabel(this.state.scores[index])}
              />
            </div>
            {(whammies || passes) &&
              <div className='col'>
                {whammies && <Button outline color="info" {...(this.state.scores[index] === this.whammie ? {active: true} : null)} onClick={() => this.applyWhammie(index)}>{gameplay.whammieName}!</Button>}
                {passes && <Button outline color="info" {...(this.state.scores[index] === this.pass ? {active: true} : null)} onClick={() => this.applyPass(index)}>Pass!</Button>}
              </div>
            */}
        </Fragment>
      );
    });

    return <div className='row'>{playerCards}</div>;
  }

  // This function will tell you if the current scores are all valid, or not
  validScores = () => {
    return this.state.validation.every(curVal => {
      return curVal === true;
    });
  }

  isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
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
      <Modal isOpen={open} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Enter Scores for Round {gameplay.levelLabels(round)}</ModalHeader>
        <ModalBody>
          <p>{scoreHeader}</p>
          {this.scoreFields()}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" outline onClick={toggle}>Cancel</Button>{' '}
          <Button color="primary" onClick={this.updateScores}>Enter Scores</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

ScoresModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  gameplay: PropTypes.object.isRequired,
  round: PropTypes.number.isRequired,
  updateScores: PropTypes.func.isRequired,
  scoreLabel: PropTypes.func.isRequired,

  players: PropTypes.array,
  alertToggle: PropTypes.func,
}

export default ScoresModal;
