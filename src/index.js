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
//import { PlayersContext, PlayersProvider } from './contexts/Players';

ReactDOM.render(
  <BrowserRouter>
    <PlayersProvider>
      <AlertProvider>
        <App />
      </AlertProvider>
    </PlayersProvider>
  </BrowserRouter>  
  , 
  document.getElementById('root')
);

/*
  <BrowserRouter>
    <PlayersProvider>
      <PlayersContext.Consumer>
        {({players, images, colorOptions}) => <App players={players} images={images} colorOptions={colorOptions} />}
      </PlayersContext.Consumer>
    </PlayersProvider>
  </BrowserRouter > 
*/

registerServiceWorker();
