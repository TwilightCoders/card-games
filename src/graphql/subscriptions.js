/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateGame = /* GraphQL */ `
  subscription OnCreateGame {
    onCreateGame {
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
export const onUpdateGame = /* GraphQL */ `
  subscription OnUpdateGame {
    onUpdateGame {
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
export const onDeleteGame = /* GraphQL */ `
  subscription OnDeleteGame {
    onDeleteGame {
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
