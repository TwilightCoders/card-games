var game =
{
  // Main game data - will be initialized with the initialValues object (kept separate for easy resets)
  data: '',
  
  // Object containing all the values to be saved to the main variables of the same name
  initialValues:
  {
    initialized:  false,
    round:        null,
    numRounds:    11,
    started:      false,
    players:      2,
    playerNames:  [],
    scores:       []    // Scores will be kept track of in this way: scores[round][player]
  },
  
  
  // ===========================================
  //            PRE-GAME FUNCTIONS
  // ===========================================
  
  // init()
  // adds event listeners, and modifies 'config' modal to prepare for the game to start
  init: function()
  {    
    // Set the main variables of the app by assigning it the initialValues object
    this.data = this.initialValues;
    
    // Copy "this" to "self" so that it can be used in the callback function
    var self = this;

    // Don't run this funtion if already initialized
    if (this.data.initialized)
    {
      alert("Game already initialized, something went wrong. Game should only need to be initialized once, when the page is loaded");
      return;
    }
    
    // add Event Listener to "numPlayers" input
    $("input[name='numPlayers']").change(function()
    {
      self.data.players = Number($(this).val());
      self.data.configurePlayerNames(self.data.players);
    });
  },
  
  
  // startGame()
  // This will fire when the user selects to start the game from the 'init' modal.
  // This will trigger the config methods & finalize the game setup
  startGame: function()
  {
    // TODO: For now, assume everything is set up correctly - we will error check later
    
    // Close the init modal
    $("#init-modal").modal('hide');

    // Un-hide the initial table, & hide the button telling us to initialize the game
    $("div.table-responsive.hidden").removeClass('hidden');
    $("#initMessage").addClass('hidden');
    
    // Set the round
    this.data.round = 1;
    
    // Read the players to variables & set the round modal
    this.setPlayers();
    
    // Initialize the scores array with the proper formatting
    for (var i = 0; i < this.data.players; i++)
      this.data.scores[0] = [];
    
    // Set/reset the table
    this.resetTable();

    // Configure the scorecard table
    this.configureRows();
    this.configureColumns();

    // Finish initialization so that we can start the game
    this.data.initialized = true;
    
    // Now that the table has been initialized, format the 'Complete Round' button...
    var button = '<button id="completeRound" class="btn btn-primary btn-lg col-xs-12" onclick="$(\'#round-modal\').modal(\'show\');">Complete Round for 3\'s</button>';
    
    // ... And add it underneath the table that was initialized above
    $("table.table").after(button);
  },


  // ===========================================
  //            CONFIGURE FUNCTIONS
  // ===========================================
  
  // configurePlayerNames()
  // This will show/hide the correct number of players in the initPlayerNames modal and the roundScores modal
  configurePlayerNames: function(num)
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
  
  
  // setPlayers()
  // sets the js player array, and also formats the "scores" modal with the names we've captured so that
  // the labels of that modal are meaningful (not just "Player 1", "Player 2" etc... like the init modal was)
  setPlayers: function()
  {
    // Loop through and get player info based on the number of players in the game...
    // Only loop through the game's # of players, so data from hidden elements are not queried if less than max
    for (i = 0; i < this.data.players; i++)
    {
      var name = $("input[name='player" + (i + 1) + "name']").val();
      
      // Set the player name
      this.data.playerNames[i] = name;

      // Set the roundModal with the names we've gathered
      $("#roundScores div.row:nth-of-type(" + (i + 1) + ") span.input-group-addon").text(this.data.playerNames[i]);
    }
  },
  
  
  // configureRows()
  // This function will configure the rows in the main scores table. This will add each row with the correct label (round + dealer name)
  configureRows: function()
  {
    // Clear the body of the scorecard, so that we can add the rows from scratch
    $("#scorecard tbody").html("");
  
    // Vvariables to be used to calculate who should be the dealer of the given round
    var dealerName, dealerIndex;
    
    // Start loop to configure the rows - keep track of the round we are configuring within 'i'
    for (var i = 0; i < this.data.numRounds; i++)
    {
      // Using the 'getRoundLabel' helper function - see below for usage
      var roundName = this.getRoundLabel(i + 1);  // using i + 1 because rounds start at 1, while arrays start at 0; so O.B.O. correction
      
      // Calculate the index of which player is due to be selected dealer, then get that player name
      dealerIndex = i % this.data.players;
      dealerName = this.data.playerNames[dealerIndex];
      
      // set the contents of the new row to append to the table
      var text = "<tr>\n<th scope=\"row\">" + roundName + " - " + dealerName + "</th>\n</tr>\n";
      $("#scorecard tbody").append(text);
    }
  },
  
  
  // configureColumns()
  // This function assigns player names to the table as columns, and adds the names in the appropriate rows for dealer
  configureColumns: function()
  {
    // Determine what bootstrap column value to assign the player columns - using 10 so that the 1st column will be at least 2 units wide
    var columnWidth = Math.floor(10 / this.data.players);
    
    // Set the first column to be the remainder of what the players columns add up to
    var firstColumn = 12 - (columnWidth * this.data.players);
    
    // If firstColumn is unreasonably large than the columnWidth, then make the first column narrower
    if (firstColumn > 4) firstColumn = 3;
    
    // Set the first column class
    $("#scorecard thead tr th:nth-child(1)").addClass("col-xs-" + firstColumn);

    // Loop through and get player info based on parameters captured above
    for (var i = 0; i < this.data.players; i++)
    {
      var name = this.data.playerNames[i]

      // Add the th element to the first row in the table for the player names
      $("#scorecard thead tr").append("<th class=\"col-xs-" + columnWidth + " text-center\">" + name + "</th>\n");

      // Add an empty cell for this player's column in all tr rows in the tbody - so this will be a complete table
      $("#scorecard tbody tr").append("<td class=\"text-center\"></td>\n");

      // Add the tfoot which will contain all the player scores
      $("#scorecard tfoot tr").append("<th class=\"text-center\" id=\"player" + (i + 1) + "\"></th>\n");
    }
  },
  
  
  // ===========================================
  //           END OF ROUND FUNCTIONS
  // ===========================================
  
  // completeRound()
  // Complete the current round using the provided info from the player
  completeRound: function()
  {
    if (this.validateScores())
    {
      var score;
      
      // Loop through the players to get their scores
      for (var player = 0; player < this.data.players; player++)
      {
        score = parseInt($("input[name=player" + (player + 1) + "score]").val());
        
        // Add score to the scores array
        this.data.scores[this.data.round - 1][player] = score;
        
        // Add the score to the table in the HTML
        $("#scorecard tbody tr:nth-of-type(" + this.data.round + ") td:nth-of-type(" + (player + 1) + ")").html(score);
      }
      
      // Close & reset the values of the scores modal
      $("#round-modal").modal('hide');
      $("#round-modal input").val("");
      
      // Recalculate the scores for the bottom of the table
      this.calculateScores();
      
      // Set the round to the next number, and other misc tasks
      this.advanceRound();  // Run this last! Don't want to run other tasks after the round has been incrimented
    }
    else
    {
      // At the moment, do nothing if the scores are not valid....
      // the validate scores function will highlight what field is messed up
    }
  },
  
  
  // advanceRound()
  // This functiona actually performs the task of advancing the round after the last round has been completed
  advanceRound: function()
  {
    // Get the completeButton, since we will be needing this in both conditions (last round, or not last round)
    $completeBtn = $("button#completeRound");
    
    // Check if it is ok to advance to the next round; ELSE IF the current round is the last round, then trigger game finalization
    if (this.data.round < this.data.numRounds)
    {
      // Incriment the round, while simultaniously setting the score array with a new array block
      this.data.scores[this.data.round++] = [];

      // Create a new label for the complete round button & h1 tag in the 'round' modal
      var roundLabel = "Complete Round for " + this.getRoundLabel(this.data.round) + "'s";
      // Set the label in both places
      $completeBtn.text(roundLabel);
      $("#round-modal h1.h1title").text(roundLabel);
      
      // Return false, in case we need to know if the game is (not) over
      return false;
    }
    else
    {
      // Finalize the game
      
      // Create the game reset button HTML, and add replace the completeButton with it
      var msg = "Game over!! Click here to reset the game";
      var button = '<button id="completeRound" class="btn btn-success btn-lg col-xs-12" onclick="game.reset();">' + msg + '</button>';
      $completeBtn.replaceWith(button);
      
      // Get the list array of winners - typically will only be one item, but might be more if there are ties
      var winners = this.getWinners();
      
      // Variable logic depending on if there was a tie or not
      if (winners.length > 1)
      {
        // Initialize the text that will be alerted
        var text = "Tie game!! Winners are: \n\n";
        
        // Loop through the winners, and add their info to the alert text
        for (var i = 0; i < winners.length; i++)
          text += this.data.playerNames[winners[i]] + "\n";
        
        // Alert the text, using bootbox
        bootbox.alert(text);
      }
      else  // Only 1 winner
      {
        // Using bootbox alert, display who won the game
        bootbox.alert(this.data.playerNames[winners[0]] + " won!!");
      }
      
      // Format the css within the table to highlight who won (or tied for the lead)
      winners.forEach(function(winner)
      {
        // This specific selector was used in order to capture th & td with the same statement
      	$("#scorecard tr > :nth-child(" + (winner + 2) + ")").addClass("success");
      });
      
      // Return true, in case the code calling this function needs to know the game is over
      return true;
    }
  },
  
  
  // ===========================================
  //        NON-TRIVIAL HELPER FUNCTIONS
  // ===========================================
  
  // getRoundModel()
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
  
  
  // getWinners()
  // This function returns an array containing the key (or keys in case there's a tie) of who won the game
  getWinners: function()
  {
    var winners = [];               // Initialize an array to store the index of which player(s) won
    var scores = this.data.totalScores;  // Save the totalScores data in an easier to use variable name
    
    winners.push(0);   // By default, assume player[0] is the winner, so push 0 onto the empty array
    
    // Loop through the players, starting at 1, since player[0] was already entered as the assumed "winner"
    for (var player = 1; player < this.data.players; player++)
    {
      // In this case, low score wins - so check to see if the currently selected player has a lower score
      // than the player's index stored in winners[0] (winners[1] should only exist if it has the same value
      // as winners[0], so no need to check any other indices)
      if (scores[player] < scores[winners[0]])
      {
        // If the current player wins head-to-head vs the previously stored "winner", then reset the winners array...
        winners = [];
        
        // ... and push the current player's index into the array as the first element
        winners.push(player);
      }
      else if (scores[player] === scores[winners[0]]) // This means, the current player is tied with whoever is currently "winning"
      {
        winners.push(player); // add this player's index to the winners array
      }
    }
    
    // Once all of the players have been looped through, return the winners array
    return winners;
  },
  
  
  // validateScores()
  // Validates that the scores modal was entered correctly, and can be used to add scores to the game with.
  // This also provides some basic bootstrap classes to visually demonstrate what is invalid (if anything)
  validateScores: function()
  {
    // Initialization variables
    var isValid = true;
    var $elem;
    
    // Loop through each player, and retrieve the value from its input
    for (var i = 1; i <= this.data.players; i++)
    {
      $elem = $("input[name=player" + i + "score]");
      $elem.parent().removeClass("has-error");       // Re-setting the parent to remove the 'has-error' class because that's how bootstrap works with erroneous input's
      
      // Check if the value for each player is numeric - if not, stylize it to be red, and set 'isValid' to false
      // NOTE: empty values return false to isNumeric, so this still works
      if ( !$.isNumeric( $elem.val() ) )
      {
        isValid = false;
        $elem.parent().addClass("has-error");        // Setting the parent to have the 'has-error' class because that's how bootstrap works with erroneous input's
      }
    }
    
    return isValid;
  },
  
  
  // calculateScores()
  // This function calcualtes the total scores for all the players to this point of the game.
  // These scores are stored in the object function 'totalScores' which can be used in various
  // parts of this app
  calculateScores: function()
  {
    // Setup separate array for the total scores of all rounds
    var _scores = [];
    
    // Loop through each player (even though that's the second element in the 2D array)
    for(var player = 0; player < this.data.players; player++)
    {
      // Initialize each player's score to 0, which will be used in the next loop
      _scores[player] = 0;
      
      // Loop through each round, which will be used as the first element in the 2D array
      for (var round = 0; round < this.data.round; round++)
      {
        // Get the score for the current round, and current player, and add to the _scores array
        _scores[player] += this.data.scores[round][player];
      }
      
      // Add the total scores for each player to the bottom of the table
      $("#scorecard tfoot th#player" + (player + 1)).html(_scores[player]);
    }
    
    this.data.totalScores = _scores;
    
    // Return the _scores array so if necessary we can access this data in the JavaScript console
    return _scores;
  },
  
  
  // ===========================================
  //               RESET FUNCTIONS
  // ===========================================
  
  // resetTable()
  // This function is used to set/reset the main scorecard table
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
          '<tr>'+
            '<th scope="row">Total Scores:</th>'+
          '</tr>'+
        '</tfoot>'+
      '</table>'
    );
  },

  
  // reset()
  // This function can be called to reset the entire game, in order to start from scratch.
  reset: function()
  {
    // Remove the #completeRound button, because this button will be created by JavaScript during the initialization phase
    $("button#completeRound").remove();
    
    // Reset all variables to their initial values
    this.data = this.initialValues;
    
    // Reset the values from the init modal
    $('#initPlayerNames input[type="text"]').val('');
    
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
  },
};


game.init();
