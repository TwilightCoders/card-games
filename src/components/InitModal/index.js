import React from 'react';
import { PlayersContext } from '../../contexts/Players';
import InitModal from './InitModal';

export default props => (
  <PlayersContext.Consumer>
    {({ images, colorOptions, players, updatePlayers, defaultAvatar }) => <InitModal {...props} players={players} updatePlayers={updatePlayers} images={images} defaultAvatar={defaultAvatar} />}
  </PlayersContext.Consumer>
);
