import { API } from 'aws-amplify'

import { deleteGame as deleteGameQuery } from '../graphql/mutations'

/**
 * Returns a Promise that resolves if a game deleted successfully, throws an error if not (which can be caught)
 */
export function deleteGame(id) {
  return API.graphql({query: deleteGameQuery, variables: {input: {id}}})
    .then(response => {
      if (response && response.data && response.deleteGame) {
        Promise.resolve("Successfully deleted game", response.deleteGame)
      } else {
        throw new Error(`Failed to delete game with id "${id}"`, response)
      }
    })
}

export default {
  deleteGame,
}