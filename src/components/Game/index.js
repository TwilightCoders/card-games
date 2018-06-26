import React from 'react';
import { PlayersContext } from '../../contexts/Players';
import Game from './Game';

export default props => (
  <PlayersContext.Consumer>
    {({images, colorOptions, players, updatePlayers}) => <Game {...props} players={players} updatePlayers={updatePlayers} />}
  </PlayersContext.Consumer>
);
