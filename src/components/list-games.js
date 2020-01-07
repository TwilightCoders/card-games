import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Heading,
  Anchor,
  Box,
  Text,
} from 'grommet'

const ListGames = ({games}) => {
  const history = useHistory();

  return Array.isArray(games) ? games.map(game => (
    <Fragment key={game.id}>
      <Box
        border={{
          color: "text",
          size: "1px",
        }}
        margin={{
          bottom: "small",
        }}
        pad="small"
      >
        <Heading
          margin={{
            vertical: "none",
            bottom: "small",
          }}
          level={3}
        >
          <Anchor onClick={() => history.push(`/${game.id}`)} label={game.name} margin="none" />
        </Heading>
        <Text><strong>Description:</strong> {game.description}</Text>
        <Text><strong>Min Players:</strong> {game.minimumPlayers}</Text>
        <Text><strong>Max Players:</strong> {game.maximumPlayers}</Text>
        <Text><strong>URL:</strong> {game.id}</Text>
      </Box>
    </Fragment>
  )) :
  <span>Games is not an array. It's this: {games}</span>
  }

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