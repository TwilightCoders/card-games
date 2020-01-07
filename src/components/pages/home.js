// import React from 'react'
import React from 'react'
import ListGames from '../list-games'

import { Box, Paragraph } from 'grommet';

// Custom Hooks
import { useQuery } from '../../hooks/use-query'

// GraphQL Queries
import { listGames } from "../../graphql/queries"

const Home = () => {

  const {data: {listGames: gamesList}, loading, errors} = useQuery(listGames)

  const paragraphProps = {
    fill: true,
    margin: {
      vertical: "none",
      bottom: "medium",
    }
  }

  return (
    <Box margin="small">
      <Paragraph {...paragraphProps}>Welcome to the Card Games API Admin Site</Paragraph>
      <Paragraph {...paragraphProps}>Use the navigation bar above to create a new game. Below is a list of games active in the API for this environment.</Paragraph>

      {
        (Array.isArray(errors) && errors.length) ? (<h3>Error: {errors}</h3>) :
        (loading) ? (<h3>Loading...</h3>) :
        (<ListGames games={gamesList && gamesList.items ? gamesList.items : []} />)
      }

    </Box>
  )
}

export default Home