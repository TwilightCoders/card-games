import React, { useMemo } from 'react'

// Hooks
import { useLocation } from 'react-router-dom'
import { useQuery } from '../../hooks/use-query'

// Queries
import { getGame } from '../../graphql/queries'

// Utils
import { deleteGame } from '../../utils/api-utils'

const GameInfo = () => {
  const gameId = useLocation().pathname.substr(1)

  const variables = useMemo(() => ({id: gameId}), [gameId])

  const { data: { getGame: game }, loading, errors } = useQuery(getGame, variables)

  if (typeof errors === "object" && Object.keys(errors) > 0) {
    throw new Error(errors)
  }

  const handleDelete = e => {
    e.preventDefault();

    if (window.confirm("Do you really want to delete this game?")) {
      alert("You confirmed deleting this game!")
      deleteGame("gibberish")
        .then(response => console.log(response))
        .catch(err => console.error(err))
    }
  }

  return loading ?
    <div>Loading...</div> :
    (typeof errors === "object" && Object.keys(errors) > 0) ?
      <div>There were errors loading the data. See console</div> :
      !game ?
        <div>There are no found games with that ID</div> :
        <>
          <h2>{game.name}</h2>
          <a href="">Edit Game</a>
          <a href="" onClick={handleDelete}>Delete Game</a>

        </>
}

/*
description: "The game three thirteen"
enabled: true
gameplay:
dealerRotates: true
fixedRounds: null
passesAllowed: false
preRenderScoreboard: false
scoreTypes: ["POSITIVE"]
startScore: 0
tieBreaker: null
whammieName: null
whammieScore: null
whammieStyle: null
whammies: false
winCondition: "LOW"
winScore: null
winType: "ROUNDS"
__proto__: Object
id: "69f17d76-870e-4994-aa5e-29ed442cd797"
maximumPlayers: 6
minimumPlayers: 3
name: "Three Thirteen"
url: "/threeThirteen"
*/

export default GameInfo