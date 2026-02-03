// backend/monad.js

class MonadLogger {
    constructor() {
        this.logs = [];
        this.isConnected = false;
    }

    connect() {
        // Simulate Monad connection
        console.log('[MONAD] Connecting to Monad network...');
        this.isConnected = true;
        console.log('[MONAD] ✅ Connected to Monad');
    }

    logMatch(matchData) {
        const log = {
            timestamp: new Date().toISOString(),
            type: 'MATCH',
            blockHeight: this.logs.length + 1000,
            data: matchData,
            hash: this.generateHash()
        };
        this.logs.push(log);
        console.log(`[MONAD] Block #${log.blockHeight}: Match logged`);
        return log;
    }

    logGuildCreation(guildData) {
        const log = {
            timestamp: new Date().toISOString(),
            type: 'GUILD_CREATED',
            blockHeight: this.logs.length + 1000,
            data: guildData,
            hash: this.generateHash()
        };
        this.logs.push(log);
        console.log(`[MONAD] Block #${log.blockHeight}: Guild created`);
        return log;
    }

    logTournamentResults(results) {
        const log = {
            timestamp: new Date().toISOString(),
            type: 'TOURNAMENT_COMPLETE',
            blockHeight: this.logs.length + 1000,
            data: results,
            hash: this.generateHash()
        };
        this.logs.push(log);
        console.log(`[MONAD] Block #${log.blockHeight}: Tournament complete`);
        return log;
    }

    generateHash() {
        return 'hash_' + Math.random().toString(36).substr(2, 16);
    }

    getLogs() {
        return this.logs;
    }

    getStats() {
        return {
            isConnected: this.isConnected,
            totalBlocks: this.logs.length,
            lastBlock: this.logs[this.logs.length - 1]
        };
    }
}

module.exports = MonadLogger;