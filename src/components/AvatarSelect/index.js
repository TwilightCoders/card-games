import React from 'react';
import { PlayersContext } from '../../contexts/Players';
import AvatarSelect from './AvatarSelect';

export default props => (
  <PlayersContext.Consumer>
    {({ images, colorOptions, players, updatePlayers, defaultAvatar }) =>
      <AvatarSelect
        {...props}
        players={players}
        updatePlayers={updatePlayers}
        images={images}
        colorOptions={colorOptions}
        defaultAvatar={defaultAvatar}
      />
    }
  </PlayersContext.Consumer>
);
