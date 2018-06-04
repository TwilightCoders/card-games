import React from 'react';

const Scoreboard = (props) => {
  const { players, currentRound, scores, gameplay, totalScores, scoreLabel } = props;

  const gameGrid = (
    <table className='table table-bordered table-hover'>
      <thead>
        <tr>
          <th scope='row' className='col-sm-3 col-md-2 text-center'>Round - (Dealer)</th>
          {players.map((name, index) => {
            return <th scope='row' key={`nameHeading${index}`} className='text-center'>{name}</th>
          })}
        </tr>
      </thead>
      <tbody>
        {scores.map((round, roundNumber) => {
          let activeRow = (roundNumber === currentRound) ? 'table-primary' : '';
          return (
            <tr key={`round${roundNumber}`} className={activeRow}>
              <th scope='row' className='text-center'>{`${gameplay.levelLabels(roundNumber)} - ${players[roundNumber % players.length]}`}</th>
              {round.map((playerScore, scoreCol) => {
                return <td key={`round${roundNumber}col${scoreCol}`} className='text-center'>{scoreLabel(playerScore)}</td>;
              })}
            </tr>
          );
        })}
        <tr>
          <th scope='row' className='text-center'>Total Scores:</th>
          {totalScores.map((score, index) => {
            return <td key={`totalScores${index}`} className='text-center'>{score}</td>
          })}
        </tr>
      </tbody>
    </table>
  );

  return gameGrid;
};

export default Scoreboard;
