var game =
{
  initialized: false,
  round: null,
  numRounds: 11,
  started : false,
  players: 2,
  playerNames: [],
  scores: [],
  
  init: function()
  {
    // Assign "this" to "self" (a normal variable) so that "this" retains the wanted scope inside callback functions
    var self = this;
    
    // Don't run this funtion if already initialized
    if (this.initialized)
    {
      alert("Game already initialized, something went wrong. Game should only need to be initialized once, when the page is loaded");
      return;
    }
    
    // add Event Listener to "numPlayers" input
    $("input[name='numPlayers']").change(function()
    {
      self.players = Number($(this).val());
      self.initPlayerNames(self.players);
    });
    
    // Add Event Listener to the "startGame" button
    //$("#startBtn").on("click", this.startGame());
  },
  
  
  startGame: function()
  {
    // TODO: For now, assume everything is set up correctly - we will error check later
    
    // Un-hide the initial table, & hide the button telling us to initialize the game
    $("div.table-responsive.hidden").removeClass("hidden");
    $("#initH1").addClass("hidden");
    
    // Configure the players & scores per whatever was entered
    this.configurePlayers();
    
    // TODO: Refactor the rest of this function from this point on

    // Finish initialization so that we can start the game
    this.initialized = true;
    this.round = 1;

    var button = '<button id="start3_13" class="btn btn-primary btn-lg col-xs-12" onclick="game.completeRound();">Complete Round 1</button>';
    $("table.table").after(button);
  },
  
  
  completeRound: function()
  {
    alert("Function not implimented yet");
  },
  
  
  // This function assigns player names to the table as columns, and adds the names in the appropriate rows for dealer
  configurePlayers: function()
  {
    // Determine what bootstrap column value to assign the player columns
    var n = Math.floor(10 / this.players);

    // Loop through and get player info based on parameters captured above
    for (i = 0; i < this.players; i++)
    {
      var name = $("input[name='player" + (i + 1) + "name']").val();
      
      // Set the player name
      this.playerNames[i] = name;

      // Add the th element to the first row in the table for the player names
      $("#scorecard thead tr").append("<th class=\"col-xs-" + n + " text-center\">" + name + "</th>\n");

      // Dynamically get the correct th element for the purposes of listing who the dealer will be
      var search = "#scorecard tbody tr:nth-of-type(" + this.players + "n + " + (i + 1) + ") th";

      // Apply the name of the current player to the th element searched for above
      $(search).append(" - " + this.playerNames[i]);

      // Add an empty cell for this player's column in all tr rows in the tbody - so this will be a complete table
      $("#scorecard tbody tr").append("<td class=\"text-center\"></td>\n");

      // Add the tfoot which will contain all the player scores
      $("#scorecard tfoot tr").append("<th class=\"text-center\" id=\"player" + (i + 1) + "\"></th>\n");

      // Set each player score to a basic array so we can add scores to it later
      this.scores[i] = [];
    }
  },
  
  
  initPlayerNames: function(num)
  {
    // To start, make all inputs hidden, then enable them using switch case logic by cascading down from num
    $("#initPlayerNames div.row").addClass("hidden");
    
    switch(num)
    {
      case 6:
        $("#initPlayerNames div.row:nth-of-type(6)").removeClass("hidden");
      case 5:
        $("#initPlayerNames div.row:nth-of-type(5)").removeClass("hidden");
      case 4:
        $("#initPlayerNames div.row:nth-of-type(4)").removeClass("hidden");
      case 3:
        $("#initPlayerNames div.row:nth-of-type(3)").removeClass("hidden");
      case 2:
      default:
        $("#initPlayerNames div.row:nth-of-type(2)").removeClass("hidden");
        $("#initPlayerNames div.row:nth-of-type(1)").removeClass("hidden");
        break;
    }
  },
  
  
  calculateScores: function()
  {
    // Calculate the scores for the table
    {
      var _scores = [];

      for(i = 0; i < this.players; i++)
      {
        _scores[i] = 0;
        for (j = 0; j < this.round; j++)
        {
          _scores[i] += this.scores[i][j];
        }

        $("tfoot th#player" + (i + 1)).html(_scores[i]);
      }
    }
  }
};


game.init();





/**

OLD CODE

*/


var initialized = false;
var round = null;
var numRounds = 11;
var started = false;
var players = null;
var playerNames = [];
var scores = [];


// Initialize game Three Thirteen
function init3_13()
{
  // Don't run this funtion if already initialized
  if (initialized)
  {
    alert("Game already initialized");
    return;
  }

  // Initial prompt for game setup
  var input = prompt("How many players?");
  
  players = Number(input);

  if (input === null) { players = null; return false; }

  // Loop and ask again if provided invalid input
  while (input !== null && (players < 2 || players > 6))
  {
    // Allow the user to click cancel, otherwise this loop will go forever
    if (input === null) { players = null; return false; }

    input = prompt("How many players?");
    players = Number(input);
  }

  // Un-hide the initial table, & hide the h1 tag telling us to initialize the game
  $("div.table-responsive.hidden").removeClass("hidden");
  $("#initH1").addClass("hidden");

  // Determine what bootstrap column value to assign the player columns
  var n = Math.floor(10 / players);

  // Loop through and get player info based on parameters captured above
  for (i = 0; i < players; i++)
  {
    // Set the player name
    playerNames[i] = prompt("Player " + (i + 1) + " name: ");

    // Add the th element to the first row in the table for the player names
    $("#scorecard thead tr").append("<th class=\"col-xs-" + n + " text-center\">" + playerNames[i] + "</th>\n");
    
    // Dynamically get the correct th element for the purposes of listing who the dealer will be
    var search = "#scorecard tbody tr:nth-of-type(" + players + "n + " + (i + 1) + ") th";

    // Apply the name of the current player to the th element searched for above
    $(search).append(" - " + playerNames[i]);
    
    // Add an empty cell for this player's column in all tr rows in the tbody - so this will be a complete table
    $("#scorecard tbody tr").append("<td class=\"text-center\"></td>\n");

    // Add the tfoot which will contain all the player scores
    $("#scorecard tfoot tr").append("<th class=\"text-center\" id=\"player" + (i + 1) + "\"></th>\n");

    // Set each player score to a basic array so we can add scores to it later
    scores[i] = [];
  }

  // Finish initialization so that we can start the game
  initialized = true;
  round = 1;

  var button = '<button id="start3_13" class="btn btn-primary btn-lg col-xs-12" onclick="start3_13();">Start Game</button>';
  $("table.table").after(button);
}


// Start Three Thirteen
function start3_13()
{
  if (!initialized) { return; }

  $("button#start3_13").replaceWith('<button id="completeRound3_13" class="btn btn-primary btn-lg col-xs-12" onclick="completeRound3_13();">Complete Round ' + (round + 2) + '</button>');

  started = true;

  //calculateScores();
}


// Complete current round
function completeRound3_13()
{
  if (!initialized || !started) { return; }

  var num;

  for (i = 0; i < players; i++)
  {
    num = Number(prompt(playerNames[i] + "'s score for round " + round + ":"));

    scores[i][round - 1] = num;

    $("#scorecard tbody tr:nth-of-type(" + round + ") td:nth-of-type(" + (i + 1) + ")").html(num);
  }

  calculateScores();

  round++;

  if (round > numRounds)
  {
    started = false;
    $("button#completeRound3_13").replaceWith('<div class="alert alert-success text-center" role="alert">Game Complete!</div>');
  }
  else
  {
    $("button#completeRound3_13").html("Complete Round " + (round + 2));
  }
}


// Calculate the scores for the table
function calculateScores()
{
  var _scores = [];

  for(i = 0; i < players; i++)
  {
    _scores[i] = 0;
    for (j = 0; j < round; j++)
    {
      _scores[i] += scores[i][j];
    }

    $("tfoot th#player" + (i + 1)).html(_scores[i]);
  }
}