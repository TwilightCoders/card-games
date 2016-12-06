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