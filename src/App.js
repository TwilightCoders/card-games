import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
//import ThreeThirteen from './components/ThreeThirteen/ThreeeThirteen';
import Game from './components/Game/Game';
import NavBar from './components/NavBar/NavBar';
import { Route } from 'react-router-dom'; // https://www.sitepoint.com/react-router-v4-complete-guide/

const Home = (props) => {
  return (
    <div>
      <NavBar />
      <div className='container'>
        Pick a game from the menu above to start playing!
      </div>
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact={true} path="/" component={Home} />
        <Route path="/threeThirteen" component={Game} />
      </div>
    );
  }
}

export default App;
