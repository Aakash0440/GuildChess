import React from 'react';

function GuildStats({ guilds }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          <span className="card-icon">⚔️</span>
          Guild Rankings
        </h2>
        <div className="card-badge">Team Standings</div>
      </div>
      
      <div className="guild-grid">
        {guilds.map((guild, index) => (
          <div key={guild.id} className="guild-card">
            <div className="guild-header">
              <div>
                <div className="guild-name">
                  <span className="guild-icon">{guild.icon}</span>
                  {guild.name}
                </div>
                <div className="guild-rank">
                  Rank #{index + 1}
                </div>
              </div>
              <div className="guild-score">{guild.score.toLocaleString()}</div>
            </div>
            
            <div className="guild-stats">
              <div className="stat-box">
                <div className="stat-label">Avg ELO</div>
                <div className="stat-value">{guild.avgElo}</div>
              </div>
              <div className="stat-box">
                <div className="stat-label">Wins</div>
                <div className="stat-value">{guild.wins}</div>
              </div>
              <div className="stat-box">
                <div className="stat-label">Members</div>
                <div className="stat-value">{guild.memberCount}</div>
              </div>
            </div>
            
            <div className="guild-members">
              {guild.memberCount} active agents
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GuildStats;