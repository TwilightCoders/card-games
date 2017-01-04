var game =
{
  initialized: false,
  round: null,
  numRounds: 11,
  active : false,
  players: 2,
  playerNames: [],
  scores: [],
  totalScores: [],
  
  // Scores will be kept track of in this way: scores[round][player]

  init: function()
  {
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
    
    // Set the game to be active, so that things may be stylized
    this.active = true;
  },
  
  
  startGame: function()
  {
    // If the names are not valid, abort the function
    if (!this.validateNames()) return;

    // Un-hide the initial table, & hide the button telling us to initialize the game
    $("div.table-responsive.hidden").removeClass("hidden");
    $("#initMessage").addClass("hidden");
    
    // Set the round
    this.round = 1;
    
    // Read the players to variables & set the round modal with them
    this.getPlayers();
    
    // Initialize the scores array with the proper formatting
    this.initScores();
    
    // Set/reset the table
    this.resetTable();

    // Configure the scorecard table
    this.configureRows();
    this.configureColumns();

    // Highlight the first row to indicate the game has started
    this.highlightRow();

    // Finish initialization so that we can start the game
    this.initialized = true;

    // Close the init modal & clear the values now that we've started the game
    $("#init-modal").modal('hide');
    $("#init-modal input").val("");
    
    // Now that the table has been initialized, format the 'Complete Round' button...
    var button = '<button id="completeRound" class="btn btn-primary btn-lg col-xs-12" onclick="$(\'#round-modal\').modal(\'show\');">Complete Round for 3\'s</button>';
    
    // ... And add it underneath the table that was initialized above
    $("table.table").after(button);
  },


  getPlayers: function()
  {
    // Loop through and get player info based on the number of players in the game...
    // There may be hidden elements not being used if less than max # of players, so set the
    // limit of the loop to be the number of players
    for (i = 0; i < this.players; i++)
    {
      var name = $("input[name='player" + (i + 1) + "name']").val();
      
      // Set the player name
      this.playerNames[i] = name;

      // Set the roundModal with the names we've gathered
      $("#roundScores div.row:nth-of-type(" + (i + 1) + ") span.input-group-addon").text(this.playerNames[i]);
    }
  },
  
  
  initScores: function()
  {
    for (var i = 0; i < this.players; i++)
    {
      this.scores[0] = [];
    }
  },
  
  
  resetTable: function()
  {
    $("#scorecardDiv").html(
      '<table class="table table-bordered" id="scorecard">' +
        '<thead>'+
          '<tr>'+
            '<th>Round &amp; Dealer</th>'+
          '</tr>'+
        '</thead>'+
        '<tbody>'+
          '<!-- Empty ... will be filled by JavaScript -->'+
        '</tbody>'+
        '<tfoot>'+
          '<tr class="info">'+
            '<th scope="row">Total Scores:</th>'+
          '</tr>'+
        '</tfoot>'+
      '</table>'
    );
  },
  
  
  // TODO: Comment this function better
  configureRows: function()
  {
    // Clear the rows of the scorecard body, so that we can add the rows natively
    $("#scorecard tbody tr").html("");

    for (var i = 0; i < this.numRounds; i++)
    {
      var roundName = this.getRoundLabel(i + 1);
      
      var text = "<tr>\n<th scope=\"row\">" + roundName + " - " + (this.playerNames[i % this.players]) + "</th>\n</tr>\n";
      $("#scorecard tbody").append(text);
    }
  },

  
  // This function assigns player names to the table as columns, and adds the names in the appropriate rows for dealer
  configureColumns: function()
  {
    // Determine what bootstrap column value to assign the player columns - using 10 so that the 1st column will be at least 2 units wide
    var n = Math.floor(10 / this.players);

    // Loop through and get player info based on parameters captured above
    for (i = 0; i < this.players; i++)
    {
      var name = this.playerNames[i]

      // Add the th element to the first row in the table for the player names
      $("#scorecard thead tr").append("<th class=\"col-xs-" + n + " text-center\">" + name + "</th>\n");

      // Dynamically get the correct th element for the purposes of listing who the dealer will be
      //var search = "#scorecard tbody tr:nth-of-type(" + this.players + "n + " + (i + 1) + ") th";

      // Apply the name of the current player to the th element searched for above
      //$(search).append(" - " + this.playerNames[i]);

      // Add an empty cell for this player's column in all tr rows in the tbody - so this will be a complete table
      $("#scorecard tbody tr").append("<td class=\"text-center\"></td>\n");

      // Add the tfoot which will contain all the player scores
      $("#scorecard tfoot tr").append("<th class=\"text-center\" id=\"player" + (i + 1) + "\"></th>\n");
    }
  },
  
  
  // This will set the names of the init modal and the roundScore modal
  initPlayerNames: function(num)
  {
    // To start, make all inputs hidden, then enable them using switch case logic by cascading down from num
    $("#initPlayerNames div.row").addClass("hidden");
    $("#roundScores div.row").addClass("hidden");
    
    // Cascade through each case for the number of elements in the initPlayerNames, and roundScores modals
    switch(num)
    {
      // We won't use a break statement in any of these cases, because we want to cascade through all of them to enable all the valid elements
      case 6:
        $("#initPlayerNames div.row:nth-of-type(6)").removeClass("hidden");
        $("#roundScores div.row:nth-of-type(6)").removeClass("hidden");
      case 5:
        $("#initPlayerNames div.row:nth-of-type(5)").removeClass("hidden");
        $("#roundScores div.row:nth-of-type(5)").removeClass("hidden");
      case 4:
        $("#initPlayerNames div.row:nth-of-type(4)").removeClass("hidden");
        $("#roundScores div.row:nth-of-type(4)").removeClass("hidden");
      case 3:
        $("#initPlayerNames div.row:nth-of-type(3)").removeClass("hidden");
        $("#roundScores div.row:nth-of-type(3)").removeClass("hidden");
      case 2:
      // Case 2 and default are the same thing, just being thorough in case some weird number comes along
      default:
        $("#initPlayerNames div.row:nth-of-type(2)").removeClass("hidden");
        $("#roundScores div.row:nth-of-type(2)").removeClass("hidden");

        $("#initPlayerNames div.row:nth-of-type(1)").removeClass("hidden");
        $("#roundScores div.row:nth-of-type(1)").removeClass("hidden");
        break;
    }
  },
  
  
  calculateScores: function()
  {
    // Setup separate array for the total scores of all rounds
    var _scores = [];
    
    // Loop through each player (even though that's the second element in the 2D array)
    for(var player = 0; player < this.players; player++)
    {
      // Initialize each player's score to 0, which will be used in the next loop
      _scores[player] = 0;
      
      // Loop through each round, which will be used as the first element in the 2D array
      for (var round = 0; round < this.round; round++)
      {
        // Get the score for the current round, and current player, and add to the _scores array
        _scores[player] += this.scores[round][player];
      }
      
      // Add the total scores for each player to the bottom of the table
      $("#scorecard tfoot th#player" + (player + 1)).html(_scores[player]);
    }
    
    this.totalScores = _scores;
    
    // Return the _scores array so if necessary we can access this data in the JavaScript console
    return _scores;
  },
  
  
  completeRound: function()
  {
    // If the scores are not valid, abort the function
    if (!this.validateScores()) return;

    var score;
    
    for (var player = 0; player < this.players; ++player)
    {
      score = parseInt($("input[name=player" + (player + 1) + "score]").val());
      
      // Add score to the scores array
      this.scores[this.round - 1][player] = score;
      
      // Add the score to the table in the HTML
      $("#scorecard tbody tr:nth-of-type(" + this.round + ") td:nth-of-type(" + (player + 1) + ")").html(score);
    }
    
    // Close & reset the values of the scores modal
    $("#round-modal").modal('hide');
    $("#round-modal input").val("");
    
    // Recalculate the scores for the bottom of the table
    this.calculateScores();
    
    // Set the round to the next number, and other misc tasks
    this.advanceRound();  // Run this last! Don't want to run other tasks after the round has been incrimentedlert("Scores not valid, please enter valid data!");
  },
  
  
  // Advance the round - set button labels to be correct, update variables etc...
  advanceRound: function()
  { 
    // Check if it is ok to advance to the next round, otherwise... if the current round is the last round, then trigger game finalization
    if (this.round < this.numRounds)
    {
      // Incriment the round, while simultaniously setting the score array with a new array block
      this.scores[this.round++] = [];

      var roundLabel = "Complete Round for " + this.getRoundLabel(this.round) + "'s";
      
      // Change button descriptions
      $("button#completeRound").text(roundLabel);

      $("#round-modal h1.h1title").text(roundLabel);
    }
    else
    {
      // Moved this logic to a function since it is somewhat lengthy
      this.finalizeGame();
    }

    // Update the row highlighting now that we've updated the round
    this.highlightRow();
  },


  // If the game is over due to the last round being played, then perform the tasks to demonstrate the game is over
  finalizeGame: function()
  {
    // Make a new button to replace the "Complete Round" button we've been using
    var button = '<button id="completeRound" class="btn btn-success btn-lg col-xs-12" onclick="game.reset();">Game over!! Click here to reset the game</button>';
    
    // Replace the button
    $("button#completeRound").replaceWith(button);

    // Set the game to be deactive
    this.active = false;
    
    // Get the array of winners (in case there were ties, it is an array)
    var winners = this.getWinners();

    // Check if there are more than 1 winner
    if (winners.length > 1)
    {
      // Format the text to be alerted
      var text = "<p>Tie game!! Winners are:</p> \n <p><ul>";
      
      // Add the names of the players to the text string
      for (var i = 0; i < winners.length; i++)
      {
        text += "<li><strong>" + this.playerNames[winners[i]] + "</strong></li>\n";
      }

      text += "</ul></p>\n";
      
      // Alert the result using a bootbox modal
      bootbox.alert(text);
    }
    else  // There was only one winner
    {
      // Alert the name of the winner via bootbox modal
      bootbox.alert("<strong>" + this.playerNames[winners[0]] + "</strong> won!!");
    }

    // Stylize the column of the winning player(s) by looping through the winners array
    winners.forEach(function(winner){
      $("#scorecard tr > :nth-child(" + (winner + 2) + ")").addClass("success");
    });
  },
  
  
  // Validates that the scores modal was entered correctly, and can be used to add scores to the game with.
  // This also provides some basic bootstrap classes to visually demonstrate what is invalid (if anything)
  validateScores: function()
  {
    var isValid = true;
    var $elem;
    
    // Loop through each player, and retrieve the value from its input
    for (var i = 1; i <= this.players; i++)
    {
      $elem = $("input[name=player" + i + "score]");
      $elem.parent().removeClass("has-error");       // Re-setting the parent to remove the 'has-error' class because that's how bootstrap works with erroneous input's
      
      // Check if the value for each player is numeric - if not, stylize it to be red, and set 'isValid' to false
      if ( !$.isNumeric( $elem.val() ) )
      {
        isValid = false;
        $elem.parent().addClass("has-error");        // Setting the parent to have the 'has-error' class because that's how bootstrap works with erroneous input's
      }
        
    }
    
    return isValid;
  },


  // Validates that the names entered are valid
  validateNames: function()
  {
    var isValid = true;
    var $elem;

    // Loop through each player, and retrieve the value from its input
    for (var i = 1; i <= this.players; i++)
    {
      $elem = $("input[name=player" + i + "name]");
      $elem.parent().removeClass("has-error");       // Re-setting the parent to remove the 'has-error' class because that's how bootstrap works with erroneous input's
      
      // Check if the value for each player is not an empty string - if it is empty, stylize it to be red, and set 'isValid' to false
      if ( !$elem.val() )
      {
        isValid = false;
        $elem.parent().addClass("has-error");        // Setting the parent to have the 'has-error' class because that's how bootstrap works with erroneous input's
      }
        
    }

    return isValid;
  },
  
  
  // Get the label for the current round
  getRoundLabel: function(num)
  {
    // Incriment by 2, since round 1 represents "level 3", round 2 === "level 4" etc... any code using this func should account for this
    var roundName = (num + 2);
      
    // If the round number is greater than 10, set it to be the card name (J/Q/K) rather than 11-13
    roundName = (roundName === 11) ? "Jack" : roundName;
    roundName = (roundName === 12) ? "Queen" : roundName;
    roundName = (roundName === 13) ? "King" : roundName;
    
    return roundName;
  },
  
  
  // This function returns an array containing the key (or keys in case there's a tie) of who won the game
  // TODO: Comment this function
  getWinners: function()
  {
    var winners = [];
    var scores = this.totalScores;
    
    winners.push(0);
    
    for (var player = 1; player < this.players; player++)
    {
      if (scores[player] < scores[winners[0]])
      {
        winners = [];
        winners[0] = player;
      }
      else if (scores[player] === scores[winners[0]])
      {
        winners.push(player);
      }
    }
    
    return winners;
  },
  

  // Highlight the row for the current round (or none if the game is over)
  highlightRow: function()
  {
    var cssClass = "success";

    $("#scorecard tr").removeClass(cssClass);

    // Only highlight a row if the the number of rounds of scores are less than the number of rounds in the game
    if (this.active)
      $("#scorecard tbody tr:nth-child(" + (this.round) + ")").addClass(cssClass);
  },


  // Reset the whole game, so that we can start from scratch
  reset: function()
  {
    // Remove the #completeRound button, because this button will be created by JavaScript during initialization
    $("button#completeRound").remove();
    
    // Reset all variables to their initial values
    this.initialized = false;
    this.round = null;
    this.numRounds = 11;
    this.active = false;
    this.players = 2;
    this.playerNames = [];
    this.scores = [];
    
    // Get the initial table to save having to find it twice
    $divTable = $("div#scorecardDiv");
    
    // Hide the initial table div, & clear it so the table itself goes away
    $divTable.addClass("hidden");
    $divTable.text("");

    // Reset Round Modal H1
    $("#round-modal h1.h1title").text("Complete Round for 3's");
    
    // Un-hide the button telling us to initialize the game
    $("#initMessage").removeClass("hidden");
    
    // Reinitialize game
    this.init();
  }

};


game.init();
