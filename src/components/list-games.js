import React, { Fragment } from 'react'

const ListGames = ({games}) => (
  <>
    <h2>Here Are The Games:</h2>
    {
      Array.isArray(games) ? games.map(game => (
        <Fragment key={game.id}>
          <h3>{game.name}</h3>
          <ul>
            <li><strong>Description:</strong> {game.description}</li>
            <li><strong>Min Players:</strong> {game.minimumPlayers}</li>
            <li><strong>Max Players:</strong> {game.maximumPlayers}</li>
            <li><strong>URL:</strong> {game.url}</li>
          </ul>
        </Fragment>
      )) :
      <span>Games is not an array. It's this: {games}</span>
    }
  </>
)

/*
id
name
description
minimumPlayers
maximumPlayers
url
gameplay {
  scoreTypes
  startScore
  whammies
  whammieScore
  whammieStyle
  whammieName
  passesAllowed
  fixedRounds
  winType
  winCondition
  winScore
  tieBreaker
  dealerRotates
  preRenderScoreboard
}
enabled
*/

export default ListGames