import React from 'react'

import {
  Box,
  Button,
  Form,
  FormField,
  Heading,
  Markdown,
  Paragraph,
  RangeSelector,
  ResponsiveContext,
  Stack,
  Text,
  TextArea,
  TextInput,
} from 'grommet';

const defaultState = {
  name: "",
  description: "",
  minPlayers: 2,
  maxPlayers: 10,
  url: "",
}

function CreateGame() {

  const [value, setValue] = React.useState(defaultState)

  const paragraphProps = {
    fill: true,
    margin: {
      vertical: "none",
      bottom: "medium",
    }
  }


  const blocks = [(
    <Box direction="column" width="large">
      <FormField name="name" htmlfor="game-name-input" label="Game Name">
        <TextInput id="game-name-input" name="name" />
      </FormField>

      <FormField name="description" htmlfor="game-description-input" label="Game Description">
        <TextArea
          placeholder="Type game description here"
          value={value.description}
          onChange={event => setValue({ ...value, description: event.target.value })}
          name="description"
        />
      </FormField>

      <FormField label="Number of Players">
        <Box direction="row" margin={{ left: "medium", right: "medium", bottom: "medium" }}>
          <Stack>
            <Box direction="row" justify="between">
              {Array.from(Array(defaultState.maxPlayers - defaultState.minPlayers + 1).keys()).map(playerCount => (
                <Box key={playerCount} pad="small" border={false}>
                  <Text style={{ fontFamily: 'monospace' }}>
                    {playerCount + defaultState.minPlayers}
                  </Text>
                </Box>
              ))}
            </Box>
            <RangeSelector
              direction="horizontal"
              invert={false}
              min={defaultState.minPlayers}
              max={defaultState.maxPlayers}
              size="full"
              round="small"
              values={[value.minPlayers, value.maxPlayers]}
              onChange={([minPlayers, maxPlayers]) => setValue({
                ...value,
                minPlayers,
                maxPlayers,
              })}
            />
          </Stack>
        </Box>
      </FormField>

      <FormField name="url" htmlfor="game-url-input" label="URL Slug">
        <TextInput id="game-url-input" name="url" />
      </FormField>
    </Box>
  )]

  const stuff = Array.from(Array(5)).map(() => blocks[0])

  return (
    <Box
      margin={{
        top: "none",
        left: "large",
        right: "large",
        bottom: "large",
      }}
    >
      <Heading level="2">
        Create a new game type
      </Heading>
      <Paragraph {...paragraphProps}>
        Use the form below to create a new game type
      </Paragraph>

      <Box elevation="large" gap="medium" pad="medium">
        <Form
          value={value}
          onChange={nextValue => setValue(nextValue)}
          onReset={() => setValue(defaultState)}
          onSubmit={({ value }) => { }}
        >
          <Box>
            <ResponsiveContext.Consumer>
              {size => {
                console.log("size", size)
                return stuff.map(block => block)
              }}
            </ResponsiveContext.Consumer>

          </Box>


          <Box direction="row" gap="medium">
            <Button type="submit" primary label="Submit" />
            <Button type="reset" label="Reset" />
          </Box>
        </Form>
      </Box>

      {/* Display raw game object here */}

      <Box direction="column" gap="medium" margin={{top:"large"}}>
        <pre>
          {JSON.stringify(value, undefined, 2)}
        </pre>
      </Box>
    </Box>
  )
}

export default CreateGame


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