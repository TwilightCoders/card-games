// Note - this paradigm should be able to be created per type of game, and when supplied to this
// game component, should render that game correctly
// eslint-disable-next-line
export const threeThirteen = {
  id: null,
  settings: { // These settings define how to initialize the game
    name: 'Three Thirteen',             // Name of the game
    possiblePlayers: { min: 2, max: 6 },  // Min & Max
  },
  gameplay: {  // These settings govern how the game should be played, after it has been initiated
    scoreTypes: ['positive'], // This should define what type of scores will be calculated ([positive], [negative])
    startScore: 0,            // The score every player will start with
    whammies: false,          // Defines whether or not a game contains "whammies" (aka, donuts, or something else)
    whammieScore: null,       // What is the value of a whammie? (Number)
    whammieStyle: null,       // What type of css style will be applied to the whammie when rendered on the scoreboard? ([circled], [blockout])
    whammieName: null,        // What is the name of the whammie?
    passesAllowed: false,     // Defines if a player can pass a turn, or if they have to play every turn
    fixedRounds: 11,          // Defines if there should be a fixed number of rounds to the game
    winType: 'score',         // ['rounds', 'score']
    winCondition: 'low',      // if 'rounds', then number of rounds completed. If score, then will high or low score win ('rounds', 'low', 'high')
    winScore: null,           // 
    tieBreaker: null,         // if the game can be a tie when the finished condition is met, then what will break the tie? Same options as win condition
    dealerRotates: true,      // If the dealer of the game rotates, then the game will be set up that way - if false, then none of the players will be identified as a dealer
    preRenderScoreboard: true,// If the scoreboard should be pre-rendered, then indicate so
    levelLabels: (num) => {   // A function that will define what the label should be for a given level
      if (num < 0 || num > 10) return;
      num += 3;

      // Catch the levels that should be named according to their card's face value, instead of numeric value
      num = (num === 11) ? 'J' : num;
      num = (num === 12) ? 'Q' : num;
      num = (num === 13) ? 'K' : num;

      return num + '\'s';
    },
  },
  description: '',            // A description of the game, which can be called ondemand by the app user - formatted with markdown
  initialized: false,
  started: false,
  currentRound: 0,
  scores: [],
  players: [],
  initModalOpen: false,
  scoresModalOpen: false,
  confirmDialog: {
    open: false,
    question: '',
    action: () => { return false },
  }
}

export const donut = {
  id: null,
  settings: { // These settings define how to initialize the game
    name: 'Donut',             // Name of the game
    possiblePlayers: { min: 3, max: 6 },  // Min & Max
  },
  gameplay: {  // These settings govern how the game should be played, after it has been initiated
    scoreTypes: ['negative'],   // This should define what type of scores will be calculated ([positive], [negative])
    startScore: 21,             // The score every player will start with
    whammies: true,             // Defines whether or not a game contains "whammies" (aka, donuts, or something else)
    whammieScore: +5,           // What is the value of a whammie? (Number)
    whammieStyle: 'circled',    // What type of css style will be applied to the whammie when rendered on the scoreboard? ([circled], [blockout])
    whammieName: 'Donut',       // What is the name of the whammie?
    passesAllowed: true,        // Defines if a player can pass a turn, or if they have to play every turn
    fixedRounds: false,         // Defines if there should be a fixed number of rounds to the game [false, Number]
    winType: 'score',           // ['rounds', 'score']
    winCondition: 'low',        // if 'rounds', then number of rounds completed. If score, then will high or low score win ('rounds', 'low', 'high')
    winScore: 0,                // What score creates a winner?
    tieBreaker: null,           // if the game can be a tie when the finished condition is met, then what will break the tie?
    dealerRotates: true,        // If the dealer of the game rotates, then the game will be set up that way - if false, then none of the players will be identified as a dealer
    preRenderScoreboard: false, // If the scoreboard should be pre-rendered, then indicate so (showing all fixed rounds)
    levelLabels: (num) => {     // A function that will define what the label should be for a given level
      return num + 1;
    },
  },
  description: '',            // A description of the game, which can be called ondemand by the app user - formatted with markdown
  initialized: false,
  started: false,
  currentRound: 0,
  scores: [],
  players: [],
  initModalOpen: false,
  scoresModalOpen: false,
  confirmDialog: {
    open: false,
    question: '',
    action: () => { return false },
  }
};