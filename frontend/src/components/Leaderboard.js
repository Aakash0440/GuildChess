import React from 'react';

function Leaderboard({ agents }) {
  const getMedal = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          <span className="card-icon">🏆</span>
          Agent Leaderboard
        </h2>
        <div className="card-badge">Live Rankings</div>
      </div>
      
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Agent</th>
            <th>ELO</th>
            <th>Record</th>
            <th>Win Rate</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent, index) => (
            <tr key={agent.id}>
              <td>
                <div className="rank-cell">
                  {getMedal(index + 1) && (
                    <span className="rank-medal">{getMedal(index + 1)}</span>
                  )}
                  <span className="rank-number">{index + 1}</span>
                </div>
              </td>
              <td>
                <span className="agent-name">{agent.name}</span>
              </td>
              <td>
                <span className="elo-value">{agent.elo}</span>
              </td>
              <td>
                <span className="record">
                  {agent.wins}W / {agent.losses}L / {agent.draws}D
                </span>
              </td>
              <td>
                <span className="win-rate">{agent.winRate}%</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;