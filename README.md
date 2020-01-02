# Card Game Score Keeper

This app will maintain a GraphQL endpoint to perform the CRUD operations of the card game scorekeeper application.

Using this application in isolation away from the scorekeeper application will allow that application to be relatively simple, since it will not
need to manage the API endpoint, just consume it. This application will provide the necessary tools to manage the API endpoint and in totality will
be consumed by both applications.

* Three-Thirteen
* Donut
* TODO: Richet Lieux
* TODO: Basic Card Game, no preset rules

Each of these games has its own page to be used to interact with the app. Each game has a pop-up which will display the rules of the game,
and you can configure the number of players for each game, the names, and add scores for each round.

The app will take care of keeping a running score, keep track of which level each person is on, as well as determine a winner (or winners, if
there is a tie).


This app was designed for personal use, by Jimmy Van Veen, and is not intended for widespread or commercial use.


## Future me!

As of Jan 2, 2020, You need Java to mock the amplify services. In an ubuntu, or WSL environment using Ubuntu, follow these commands to install Java in that env:

(May have to update apt's first)
```bash
sudo apt update
sudo apt upgrade
```

Install these packages:

```bash
sudo apt install default-jre
sudo apt install openjdk-11-jre-headless
sudo apt install openjdk-8-jre-headless
```