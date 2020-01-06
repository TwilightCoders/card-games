import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const ListGames = ({games}) => (
  Array.isArray(games) ? games.map(game => (
    <Fragment key={game.id}>
      <h3><Link to={game.id}>{game.name}</Link></h3>
      <ul style={{borderBottom: "1px solid #999"}}>
        <li><strong>Description:</strong> {game.description}</li>
        <li><strong>Min Players:</strong> {game.minimumPlayers}</li>
        <li><strong>Max Players:</strong> {game.maximumPlayers}</li>
        <li><strong>URL:</strong> {game.id}</li>
      </ul>
    </Fragment>
  )) :
  <span>Games is not an array. It's this: {games}</span>
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