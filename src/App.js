import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
//import ThreeThirteen from './components/ThreeThirteen/ThreeeThirteen';
import games from './games';
import Game from './components/Game/Game';
import NavBar from './components/NavBar/NavBar';
import { Route } from 'react-router-dom'; // https://www.sitepoint.com/react-router-v4-complete-guide/


const Home = (props) => {
  const gameLinks = games.map((game) => {
    return { to: game.url, label: game.settings.name };
  });

  return (
    <div>
      <NavBar />
      <div className='container'>
        <ul>
          {gameLinks.map((link, index) => {
            return <li><Link to={link.to}>{link.label}</Link></li>
          })}
        </ul>
        Pick a game from above to start playing!
      </div>
    </div>
  );
}

class App extends Component {
  render() {
    const routes = games.map((game, index) => {
      return <Route key={`gameRoute${index}`} path={game.url} render={()=><Game game={game} />} />
    });

    return (
      <div className="App">
        <Route exact={true} path="/" component={Home} />
        {routes}
        {/*<Route path="/threeThirteen" component={Game} />*/}
      </div>
    );
  }
}

export default App;
