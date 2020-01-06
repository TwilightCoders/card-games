import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import {
  withAuthenticator,
  Greetings,
  SignIn,
  ConfirmSignIn,
  VerifyContact,
  ForgotPassword,
} from 'aws-amplify-react';

import Amplify from 'aws-amplify';

// Pages
import Home from './components/pages/home'
import GameInfo from './components/pages/game-info'

// Get the aws resources configuration parameters
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

function App() {
  return (
    <Router>
      <Link to="/">Home</Link>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route>
          <GameInfo />
        </Route>
      </Switch>
    </Router>
  );
}

export default withAuthenticator(App, true, [
  <Greetings />,
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
