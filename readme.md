# Card Game Score Keeper

This app will keep track of scores for several card games. At the moment, these games are supported by the app:

* Three-Thirteen
* ~~Richet Lieux~~
* ~~Donut~~

Each of these games has its own page to be used to interact with the app. Each game has a pop-up which will display the rules of the game,
and you can configure the number of players for each game, the names, and add scores for each round.

The app will take care of keeping a running score, keep track of which level each person is on, as well as determine a winner (or winners, if
there is a tie).

TODOS:

* Convert to Node.js
  * Make the scorecard RESTful, with a unique ID
* Allow guest users to view the scorecard (but not edit it) - do this with a unique id useable for viewing
* Convert to Semantic UI

This app was designed for personal use, by Jimmy Van Veen, and is not intended for widespread or commercial use.