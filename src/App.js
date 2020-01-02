import React from 'react';
import './App.css';
import { withAuthenticator, Greetings, SignIn, ConfirmSignIn, VerifyContact, ForgotPassword } from 'aws-amplify-react';
import Amplify from 'aws-amplify';
// Get the aws resources configuration parameters
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

function App() {
  return (
    <div>
      This is just some simple info
    </div>
  );
}

export default withAuthenticator(App, true, [
  <Greetings />,
  <SignIn />,
  <ConfirmSignIn />,
  <VerifyContact />,
  <ForgotPassword />
]);
