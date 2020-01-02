import React from 'react';
import Amplify from 'aws-amplify';
import {
  withAuthenticator,
  Greetings,
  SignIn,
  ConfirmSignIn,
  VerifyContact,
  ForgotPassword,
  Connect,
} from 'aws-amplify-react';

// Get the aws resources configuration parameters
import awsconfig from './aws-exports';

// GraphQL Queries
import { listGames } from "./graphql/queries"

// Components
import ListGames from './components/list-games'

Amplify.configure(awsconfig);

function App() {
  return (
    <Connect
      query={{
        query: listGames,
      }}
    >
      {({ data: { listGames }, loading, errors }) => {
        if (Array.isArray(errors) && errors.length) return (<h3>Error: {errors}</h3>);
        if (loading || !listGames) return (<h3>Loading...</h3>);
        return (<ListGames games={listGames.items} /> );
      }}
    </Connect>
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
