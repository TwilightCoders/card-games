import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import {
  withAuthenticator,
  SignIn,
  ConfirmSignIn,
  VerifyContact,
  ForgotPassword,
} from 'aws-amplify-react';

import Amplify from 'aws-amplify';

// Get the aws resources configuration parameters
import awsconfig from './aws-exports';

import {
  Grommet,
  CheckBox,
  Box,
} from 'grommet';

//// Custom imports
// Pages
import Home from './components/pages/home'
import GameInfo from './components/pages/game-info'
// Interface
import NavBar from './components/interface/nav-bar'

// Theme
import theme from './themes/default'

// Utils
import { capitalize } from './utils/string-utils'

Amplify.configure(awsconfig);

function App() {
  const getThemeLabel = bool => bool ? "dark" : "light";

  const [themeMode, setThemeMode] = React.useState(getThemeLabel())

  return (
    <Grommet theme={theme} themeMode={themeMode} full>
      <Router>
        <NavBar />
        <Box justify="end" size="small" margin="small" direction="row-responsive">
          <CheckBox
            toggle
            onChange={() => setThemeMode(getThemeLabel(themeMode === getThemeLabel()))}
            label={`${capitalize(getThemeLabel(true))} mode ${getThemeLabel(true) === themeMode ? 'enabled' : 'disabled'}`}
            checked={themeMode !== getThemeLabel()}
          />
        </Box>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route>
            <GameInfo />
          </Route>
        </Switch>
      </Router>
    </Grommet>
  );
}

export default withAuthenticator(App, true, [
  <SignIn />,
  <ConfirmSignIn />,
  <VerifyContact />,
  <ForgotPassword />
]);

/*

example mutation to create a game:

mutation {
  createGame(
  	input: {
      name: "Three Thirteen"
      description: "The game three thirteen"
      minimumPlayers: 3
      maximumPlayers: 6
      url: "/threeThirteen"
      enabled: true
      gameplay: {
        scoreTypes: [POSITIVE]
        startScore: 0
        whammies: false
        passesAllowed: false
        winType: ROUNDS
        winCondition: LOW
        dealerRotates: true
        preRenderScoreboard: false
        levelLabels: [{
          level: 10
          label: "J"
        },{
          level: 11
          label: "Q"
        }, {
          level: 12
          label: "K"
        }]
      }
    }
  ) {
    name
    url
    gameplay {
      scoreTypes
      startScore
      levelLabels {
        level
        label
      }
    }
  }
}

*/
