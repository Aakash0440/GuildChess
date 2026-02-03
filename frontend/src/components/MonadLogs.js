import React from 'react';

function MonadLogs({ logs }) {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="card full-width">
      <div className="card-header">
        <h2 className="card-title">
          <span className="card-icon">⛓️</span>
          Monad Blockchain Logs
        </h2>
        <div className="card-badge">On-Chain Events</div>
      </div>
      
      <div className="monad-logs">
        {logs.slice(-15).reverse().map((log, index) => (
          <div key={index} className="log-entry">
            <div className="log-time">{formatTime(log.timestamp)}</div>
            <div className="log-type">{log.type}</div>
            <div className="log-content">
              <div>Block #{log.blockHeight}</div>
              <div className="log-hash">Hash: {log.hash}</div>
            </div>
          </div>
        ))}
        
        {logs.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: 'var(--text-muted)'
          }}>
            No blockchain events yet. Start a tournament to see logs.
          </div>
        )}
      </div>
    </div>
  );
}

export default MonadLogs;