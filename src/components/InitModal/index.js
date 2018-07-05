import React from 'react';
import { PlayersContext } from '../../contexts/Players';
import { AlertContext } from '../../contexts/Alerts';
import InitModal from "./InitModal";

export default props => (
  <AlertContext.Consumer>
    {({alertToggle}) =>
      <PlayersContext.Consumer>
        {({ images, colorOptions, players, updatePlayers, defaultAvatar }) =>
          <InitModal
            {...props}
            players={players}
            updatePlayers={updatePlayers}
            images={images}
            defaultAvatar={defaultAvatar}
            alertToggle={alertToggle}
            colorOptions={colorOptions}
          />
        }
      </PlayersContext.Consumer>
    }
  </AlertContext.Consumer>
);
