import React from 'react';
import Game from './index';
import games from '../../contexts/games';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const theGame = renderer
    .create(<Game game={games[0]} />)
    .toJSON();
  expext(theGame).toMatchSnapshot();
});