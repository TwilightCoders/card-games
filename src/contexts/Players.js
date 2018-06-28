import React, { Component } from 'react';

// https://github.com/leighhalliday/easy-mobx-redux-comparison/tree/context/src

const colorOptions = [
	'grey',
	'indigo',
	'red',
	'orange',
	'yellow',
	'green',
	'blue',
	'brown',
];

const images = [];

for (let i = 1; i <= 16; ++i) {
	images.push(require(`../avatars/avatar${i}.svg`));
}

export const PlayersContext = React.createContext();

export class PlayersProvider extends Component {
  state = {
    images: images,
    colorOptions: colorOptions,
    players: [],
    defaultAvatar: require('../avatars/default.svg')
  }

  updatePlayers(newPlayers) {
    newPlayers = newPlayers.map(player => {
      let newPlayer = {};
      newPlayer.name = player.name ? player.name : '';
      newPlayer.avatar = player.avatar ? player.avatar : '';
      newPlayer.color = player.color ? player.color : null;
      return newPlayer;
    });

    this.setState({players: newPlayers});
  }

  render() {
    return (
      <PlayersContext.Provider
        value={{
          // Add current state variables
          ...this.state,
          // Functions as well
          updatePlayers: this.updatePlayers.bind(this),
        }}
      >
        {this.props.children}
      </PlayersContext.Provider>
    );
  }
}
