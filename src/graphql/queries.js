/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGame = `query GetGame($id: ID!) {
  getGame(id: $id) {
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
      levelLabels {
        level
        label
      }
    }
    enabled
  }
}
`;
export const listGames = `query ListGames(
  $filter: ModelGameFilterInput
  $limit: Int
  $nextToken: String
) {
  listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    }
    nextToken
  }
}
`;
