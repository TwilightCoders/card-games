import React from 'react';
import { PlayersContext } from '../../contexts/Players';
import { AlertContext } from '../../contexts/Alerts';
import ScoresModal from './ScoresModal';

export default props => (
  <AlertContext.Consumer>
    {({ alertToggle }) =>
      <PlayersContext.Consumer>
        {({ players }) =>
          <ScoresModal
            {...props}
            players={players}
            alertToggle={alertToggle}
          />
        }
      </PlayersContext.Consumer>
    }
  </AlertContext.Consumer>
);
