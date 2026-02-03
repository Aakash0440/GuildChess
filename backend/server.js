// backend/server.js
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const ChessAgent = require('./agent');
const Tournament = require('./tournament');
const Guild = require('./guild');
const MonadLogger = require('./monad');
const { generateId } = require('./utils');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

// ========== GLOBAL STATE ==========
let tournament = new Tournament();
let guilds = [];
let monadLogger = new MonadLogger();

// Initialize system
function initializeSystem() {
    console.log('🎮 Initializing GuildMaster Chess System...\n');
    
    monadLogger.connect();

    // Create guilds
    guilds = [
        new Guild('guild_1', '🗡️  Knights', '🗡️'),
        new Guild('guild_2', '🏹 Archers', '🏹'),
        new Guild('guild_3', '🔮 Mages', '🔮')
    ];

    guilds.forEach(guild => {
        monadLogger.logGuildCreation(guild.getSummary());
    });

    // Create agents
    const agentNames = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta'];
    
    agentNames.forEach((name, index) => {
        const agent = new ChessAgent(name, generateId());
        const guildIndex = index % guilds.length;
        agent.guildId = guilds[guildIndex].id;
        guilds[guildIndex].addMember(agent.id);
        tournament.addAgent(agent);
    });

    console.log('✅ System initialized');
    console.log(`   Agents: ${tournament.agents.length}`);
    console.log(`   Guilds: ${guilds.length}`);
}

initializeSystem();

// ========== API ENDPOINTS ==========

app.get('/api/status', (req, res) => {
    res.json({
        isRunning: tournament.isRunning,
        totalAgents: tournament.agents.length,
        totalGuilds: guilds.length,
        totalMatches: tournament.matches.length,
        currentMatch: tournament.currentMatch,
        monad: monadLogger.getStats()
    });
});

app.get('/api/agents', (req, res) => {
    const agentStats = tournament.agents.map(agent => agent.getStatus());
    res.json(agentStats);
});

app.get('/api/guilds', (req, res) => {
    guilds.forEach(guild => guild.updateStats(tournament.agents));
    const guildStats = guilds.map(guild => guild.getSummary());
    res.json(guildStats.sort((a, b) => b.score - a.score));
});

app.get('/api/matches', (req, res) => {
    res.json(tournament.matches);
});

app.get('/api/leaderboard', (req, res) => {
    const results = tournament.getResults();
    guilds.forEach(guild => guild.updateStats(tournament.agents));
    const guildStats = guilds.map(guild => guild.getSummary()).sort((a, b) => b.score - a.score);
    
    res.json({
        agents: results,
        guilds: guildStats
    });
});

app.post('/api/tournament/start', async (req, res) => {
    if (tournament.isRunning) {
        return res.status(400).json({ error: 'Tournament already running' });
    }

    res.json({ message: 'Tournament started' });

    // Run tournament asynchronously
    tournament.runFullTournament(
        (matchResult) => {
            // On match complete
            monadLogger.logMatch(matchResult);
            io.emit('match-complete', matchResult);
            
            guilds.forEach(guild => guild.updateStats(tournament.agents));
            io.emit('leaderboard-update', {
                agents: tournament.getResults(),
                guilds: guilds.map(g => g.getSummary()).sort((a, b) => b.score - a.score)
            });
        },
        (update) => {
            // On match update (live moves)
            io.emit('match-update', update);
        }
    ).then(results => {
        monadLogger.logTournamentResults(results);
        io.emit('tournament-complete', results);
    });
});

app.post('/api/tournament/stop', (req, res) => {
    tournament.stopTournament();
    res.json({ message: 'Tournament stopped' });
});

app.get('/api/monad/logs', (req, res) => {
    res.json(monadLogger.getLogs());
});

// ========== SOCKET.IO ==========
io.on('connection', (socket) => {
    console.log('🔌 Client connected');
    
    socket.on('disconnect', () => {
        console.log('🔌 Client disconnected');
    });
});

// ========== START SERVER ==========
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 WebSocket server ready`);
});