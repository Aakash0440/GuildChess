import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './App.css';

import Leaderboard from './components/Leaderboard';
import GuildStats from './components/GuildStats';
import LiveMatches from './components/LiveMatches';
import MonadLogs from './components/MonadLogs';

const socket = io('http://localhost:5000');

function App() {
  const [status, setStatus] = useState({});
  const [agents, setAgents] = useState([]);
  const [guilds, setGuilds] = useState([]);
  const [matches, setMatches] = useState([]);
  const [currentMatch, setCurrentMatch] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [monadLogs, setMonadLogs] = useState([]);

  useEffect(() => {
    fetchStatus();
    fetchAgents();
    fetchGuilds();
    fetchMatches();
    fetchMonadLogs();

    const interval = setInterval(() => {
      if (!status.isRunning) {
        fetchStatus();
        fetchAgents();
        fetchGuilds();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [status.isRunning]);

  useEffect(() => {
    socket.on('match-update', (data) => {
      setCurrentPosition(data);
    });

    socket.on('match-complete', (matchResult) => {
      setMatches(prev => [...prev, matchResult]);
      fetchMonadLogs();
    });

    socket.on('leaderboard-update', (data) => {
      setAgents(data.agents);
      setGuilds(data.guilds);
    });

    socket.on('tournament-complete', () => {
      setCurrentMatch(null);
      setCurrentPosition(null);
      fetchStatus();
      fetchMonadLogs();
    });

    return () => {
      socket.off('match-update');
      socket.off('match-complete');
      socket.off('leaderboard-update');
      socket.off('tournament-complete');
    };
  }, []);

  const fetchStatus = async () => {
    try {
      const res = await axios.get('/api/status');
      setStatus(res.data);
      setCurrentMatch(res.data.currentMatch);
    } catch (err) {
      console.error('Error fetching status:', err);
    }
  };

  const fetchAgents = async () => {
    try {
      const res = await axios.get('/api/agents');
      setAgents(res.data);
    } catch (err) {
      console.error('Error fetching agents:', err);
    }
  };

  const fetchGuilds = async () => {
    try {
      const res = await axios.get('/api/guilds');
      setGuilds(res.data);
    } catch (err) {
      console.error('Error fetching guilds:', err);
    }
  };

  const fetchMatches = async () => {
    try {
      const res = await axios.get('/api/matches');
      setMatches(res.data);
    } catch (err) {
      console.error('Error fetching matches:', err);
    }
  };

  const fetchMonadLogs = async () => {
    try {
      const res = await axios.get('/api/monad/logs');
      setMonadLogs(res.data);
    } catch (err) {
      console.error('Error fetching monad logs:', err);
    }
  };

  const startTournament = async () => {
    try {
      await axios.post('/api/tournament/start');
      fetchStatus();
    } catch (err) {
      console.error('Error starting tournament:', err);
    }
  };

  const stopTournament = async () => {
    try {
      await axios.post('/api/tournament/stop');
      fetchStatus();
    } catch (err) {
      console.error('Error stopping tournament:', err);
    }
  };

  return (
    <div className="App">
      {/* HEADER */}
      <header className="header">
        <div className="header-inner">
          <div className="logo-section">
            <div className="logo-icon">♟️</div>
            <div className="logo-text">
              <h1>GuildMaster Chess</h1>
              <div className="logo-subtitle">Autonomous AI Tournament Arena</div>
            </div>
          </div>
          
          <div className="header-stats">
            <div className="stat-pill">
              <div>
                <div className="stat-label">Status</div>
                <div className={`stat-value ${status.isRunning ? 'running' : ''}`}>
                  {status.isRunning ? '⚡ LIVE' : '⚪ IDLE'}
                </div>
              </div>
            </div>
            
            <div className="stat-pill">
              <div>
                <div className="stat-label">Matches</div>
                <div className="stat-value">{status.totalMatches || 0}</div>
              </div>
            </div>
            
            <div className="stat-pill">
              <div>
                <div className="stat-label">Agents</div>
                <div className="stat-value">{status.totalAgents || 0}</div>
              </div>
            </div>
            
            <div className="stat-pill">
              <div>
                <div className="stat-label">Monad Blocks</div>
                <div className="stat-value">{status.monad?.totalBlocks || 0}</div>
              </div>
            </div>
            
            <div className="hackathon-badge">
              🏆 MOLTIVERSE 2026
            </div>
          </div>
        </div>
      </header>

      <div className="content-wrapper">
        {/* CONTROL PANEL */}
        <div className="control-panel">
          <div className="control-panel-inner">
            <div className="tournament-info">
              <h2>Tournament Control</h2>
              <div className="tournament-status">
                <span className={`status-indicator ${status.isRunning ? 'active' : ''}`}></span>
                <span>{status.isRunning ? 'Tournament in progress...' : 'Ready to start'}</span>
              </div>
            </div>
            
            <div className="controls">
              <button 
                className="btn btn-primary" 
                onClick={startTournament}
                disabled={status.isRunning}
              >
                <span>🚀</span>
                Start Tournament
              </button>
              <button 
                className="btn btn-danger" 
                onClick={stopTournament}
                disabled={!status.isRunning}
              >
                <span>🛑</span>
                Stop Tournament
              </button>
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="main-grid">
          <Leaderboard agents={agents} />
          <GuildStats guilds={guilds} />
        </div>

        <div className="main-grid">
          <LiveMatches 
            currentMatch={currentMatch}
            currentPosition={currentPosition}
            recentMatches={matches}
          />
          
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">
                <span className="card-icon">📊</span>
                Tournament Statistics
              </h2>
            </div>
            
            <div style={{display: 'grid', gap: '16px'}}>
              <div className="stat-box">
                <div className="stat-label">Total Agents</div>
                <div className="stat-value">{agents.length}</div>
              </div>
              
              <div className="stat-box">
                <div className="stat-label">Total Guilds</div>
                <div className="stat-value">{guilds.length}</div>
              </div>
              
              <div className="stat-box">
                <div className="stat-label">Matches Played</div>
                <div className="stat-value">{matches.length}</div>
              </div>
              
              {agents.length > 0 && (
                <>
                  <div style={{
                    padding: '16px',
                    background: 'var(--card-bg)',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)'
                  }}>
                    <div style={{fontSize: '0.85em', color: 'var(--text-muted)', marginBottom: '8px'}}>
                      🏆 Highest ELO
                    </div>
                    <div style={{fontSize: '1.2em', fontWeight: '700'}}>
                      {agents[0]?.name} ({agents[0]?.elo})
                    </div>
                  </div>
                  
                  <div style={{
                    padding: '16px',
                    background: 'var(--card-bg)',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)'
                  }}>
                    <div style={{fontSize: '0.85em', color: 'var(--text-muted)', marginBottom: '8px'}}>
                      🔥 Most Wins
                    </div>
                    <div style={{fontSize: '1.2em', fontWeight: '700'}}>
                      {agents.reduce((max, agent) => agent.wins > max.wins ? agent : max, agents[0])?.name}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* MONAD LOGS */}
        <MonadLogs logs={monadLogs} />
      </div>
    </div>
  );
}

export default App;