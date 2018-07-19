import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import { PlayersProvider } from './contexts/Players';
import { AlertProvider } from './contexts/Alerts';
import ConfirmModal from './components/ConfirmModal/ConfirmModal';

// Thank you https://gist.github.com/cjies/94aead6b0d59e906fa08836182958763 for this solution
const getUserConfirmation = (message, callback) => {
  const modal = document.createElement('div');
  document.body.appendChild(modal);

  const allowTransition = (answer) => () => {
    // Unmount and remove modal DOM
    ReactDOM.unmountComponentAtNode(modal);
    //document.body.removeChild(modal);

    callback(answer);
  }

  const confirmModal = (
    <ConfirmModal
      question={message}
      action={allowTransition(true)}
      open={true}
      toggle={allowTransition(false)}
    />
  );

  ReactDOM.render(confirmModal, modal);
};

ReactDOM.render(
  <BrowserRouter getUserConfirmation={getUserConfirmation}>
    <PlayersProvider>
      <AlertProvider>
        <App />
      </AlertProvider>
    </PlayersProvider>
  </BrowserRouter>  
  , 
  document.getElementById('root')
);

registerServiceWorker();
