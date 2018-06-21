import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import games from './games';
import Game from './components/Game/Game';
import NavBar from './components/NavBar/NavBar';
import { Route } from 'react-router-dom'; // https://www.sitepoint.com/react-router-v4-complete-guide/


const Home = (props) => {
  const gameLinks = games.map((game) => {
    return { to: game.url, label: game.settings.name, description: game.description };
  });

  return (
    <div>
      <NavBar />
      <div className='container'>
        <h3 className='mb-3'>Pick a game to start playing!</h3>
        <div className='card-deck'>
          {gameLinks.map((link, index) => {
            return (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{link.label}</h5>
                  <p className="card-text">{link.description}</p>
                  <p className="card-text"><Link to={link.to} className='btn btn-raised btn-primary'>Play {link.label}</Link></p>
                </div>
              </div>
            );
          })}
        </div>
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
