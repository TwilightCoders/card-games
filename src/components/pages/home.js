// import React from 'react'
import React from 'react'
import ListGames from '../list-games'

// Custom Hooks
import { useQuery } from '../../hooks/use-query'

// GraphQL Queries
import { listGames } from "../../graphql/queries"

const Home = () => {

  const {data: {listGames: gamesList}, loading, errors} = useQuery(listGames)

  return (
    <>
      <div>Hello. Here is the list of items in the Games library:</div>

      {
        (Array.isArray(errors) && errors.length) ? (<h3>Error: {errors}</h3>) :
        (loading) ? (<h3>Loading...</h3>) :
        (<ListGames games={gamesList && gamesList.items ? gamesList.items : []} />)
      }

    </>
  )
}

export default Home