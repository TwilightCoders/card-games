import React, { Fragment } from 'react';
import { ListGroup, ListGroupItem } from 'mdbreact';
import PropTypes from 'prop-types';

Number.isInteger = Number.isInteger || function (value) {
  return typeof value === 'number' &&
    isFinite(value) &&
    Math.floor(value) === value;
};

const ListArray = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) return '';

  let str;

  for (let i = 0; i < arr.length; ++i) {
    if (!i) str = arr[i];
    else str += ' & ' + arr[i];
  }
  
  if (arr.length === 1) str += ' only';

  return str;
}

const printElem = (elem) => {
  if (typeof elem === 'boolean' || elem === null) return (elem ? 'Yes' : 'No');
  if (Array.isArray(elem)) return ListArray(elem);
  return elem;
}

const RenderSettings = (props) => {
  const { settings } = props;
  const renderKeys1 = [];
  const renderKeys2 = [];
  let count = 0;

  Object.keys(settings.gameplay).forEach((elem, key) => {
    let displayVal = printElem(settings.gameplay[elem]);;
    let displayName;
    let render = true;

    switch (elem) {
      case 'scoreTypes':
        displayName = 'Score Types:';
        break;
      case 'fixedRounds':
        displayName = 'Fixed Rounds?';
        break;
      case 'passesAllowed':
        displayName = 'Passes Allowed?';
        break;
      case 'whammies':
        displayName = 'Are there whammies in this game?';
        break;
      case 'whammieName':
        displayName = 'What are whammies called?';
        if (!settings.gameplay['whammies']) render = false;
        break;
      case 'whammieScore':
        displayName = 'What are the values of whammies?';
        if (!settings.gameplay['whammies']) render = false;
        if (Number.isInteger(settings.gameplay[elem]) && settings.gameplay[elem] > 0) displayVal = '+' + displayVal;
        break;
      case 'startScore':
        displayName = 'Starting Score:';
        break;
      case 'winType':
        displayName = 'What triggers the game to be over?';
        if (settings.gameplay['fixedRounds']) render = false;
        break;
      case 'winCondition':
        displayName = 'What wins the game, high or low score?';
        break;
      case 'winScore':
        displayName = 'What score wins the game?';
        if (!settings.gameplay[elem]) render = false;
        break;
      case 'tieBreaker':
        displayName = 'Is there a tiebreaker to see who wins?';
        break;
      default:
        render = false;
    };
    if (render) {
      const result = count % 2;
      const content = <Fragment><strong>{displayName}</strong> {displayVal}</Fragment>;
      if (!result)
        renderKeys1.push(content);
      else
        renderKeys2.push(content);
      ++count;
    }
  });

  return (
    <div className='container'>
      <div className='row'>
        <ListGroup className='col-12 col-lg-6'>
          {
            renderKeys1.map((item, index) => {
              return <ListGroupItem key={`gameplayKey1${index}`}>{item}</ListGroupItem>;
            })
          }
        </ListGroup>
        <ListGroup className='col-12 col-lg-6'>
          {
            renderKeys2.map((item, index) => {
              return <ListGroupItem key={`gameplayKey2${index}`}>{item}</ListGroupItem>;
            })
          }
        </ListGroup>
      </div>
    </div>
  );
}

RenderSettings.propTypes = {
  settings: PropTypes.object.isRequired,
}

export default RenderSettings;
