/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createGame = `mutation CreateGame(
  $input: CreateGameInput!
  $condition: ModelGameConditionInput
) {
  createGame(input: $input, condition: $condition) {
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
export const updateGame = `mutation UpdateGame(
  $input: UpdateGameInput!
  $condition: ModelGameConditionInput
) {
  updateGame(input: $input, condition: $condition) {
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
export const deleteGame = `mutation DeleteGame(
  $input: DeleteGameInput!
  $condition: ModelGameConditionInput
) {
  deleteGame(input: $input, condition: $condition) {
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
