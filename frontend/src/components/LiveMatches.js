import React from 'react';
import { Chessboard } from 'react-chessboard';

function LiveMatches({ currentMatch, currentPosition, recentMatches }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          <span className="card-icon">♟️</span>
          Live Match
        </h2>
        {currentMatch && <div className="card-badge">In Progress</div>}
      </div>
      
      {currentMatch ? (
        <>
          <div className="match-header-section">
            <div className="vs-section">
              <div className="player-info">
                <div className="player-name">{currentMatch.agent1}</div>
                <div className="player-elo">White</div>
              </div>
              
              <div className="vs-divider">VS</div>
              
              <div className="player-info">
                <div className="player-name">{currentMatch.agent2}</div>
                <div className="player-elo">Black</div>
              </div>
            </div>
            
            {currentPosition && (
              <div className="move-counter">
                ⚡ Move {currentPosition.moveCount}
              </div>
            )}
          </div>
          
          <div className="chessboard-wrapper">
            <Chessboard 
              position={currentPosition?.currentFen || 'start'}
              boardWidth={550}
              customBoardStyle={{
                borderRadius: '8px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)'
              }}
            />
          </div>
        </>
      ) : (
        <div className="no-match-state">
          <div className="no-match-icon">♟️</div>
          <div className="no-match-text">No Active Match</div>
          <div className="no-match-subtext">Start tournament to watch live games</div>
        </div>
      )}
      
      {recentMatches.length > 0 && (
        <>
          <div className="card-header" style={{marginTop: '32px'}}>
            <h3 className="card-title" style={{fontSize: '1.1em'}}>
              <span className="card-icon">📜</span>
              Recent Matches
            </h3>
          </div>
          
          <div className="matches-container">
            {recentMatches.slice(-5).reverse().map((match, index) => (
              <div key={index} className="match-item">
                <div className="match-header-row">
                  <span className="match-players">
                    {match.agent1} vs {match.agent2}
                  </span>
                  <span className="match-winner">
                    🏆 {match.winner}
                  </span>
                </div>
                <div className="match-meta">
                  <span>⚔️ Round {match.round}</span>
                  <span>♟️ {match.moves} moves</span>
                  <span>✓ {match.result}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default LiveMatches;