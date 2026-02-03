// backend/tournament.js
const ChessAgent = require('./agent');
const { updateElo } = require('./utils');

class Tournament {
    constructor() {
        this.agents = [];
        this.matches = [];
        this.currentMatch = null;
        this.roundNumber = 0;
        this.isRunning = false;
    }

    addAgent(agent) {
        this.agents.push(agent);
    }

    runMatch(agent1, agent2, onUpdate) {
        agent1.resetGame();
        agent2.resetGame();

        let moveCount = 0;
        const maxMoves = 200;
        const matchLog = [];

        while (!agent1.isGameOver() && moveCount < maxMoves) {
            const move1 = agent1.makeMove();
            agent2.game.load(agent1.game.fen());
            
            matchLog.push({
                player: agent1.name,
                move: move1,
                fen: agent1.game.fen()
            });

            if (onUpdate) {
                onUpdate({
                    agent1: agent1.name,
                    agent2: agent2.name,
                    currentFen: agent1.game.fen(),
                    moveCount: moveCount * 2 + 1
                });
            }
            
            if (agent1.isGameOver()) break;
            
            const move2 = agent2.makeMove();
            agent1.game.load(agent2.game.fen());
            
            matchLog.push({
                player: agent2.name,
                move: move2,
                fen: agent2.game.fen()
            });

            if (onUpdate) {
                onUpdate({
                    agent1: agent1.name,
                    agent2: agent2.name,
                    currentFen: agent2.game.fen(),
                    moveCount: moveCount * 2 + 2
                });
            }
            
            moveCount++;
        }

        let winner = null;
        let result = 'draw';

        if (agent1.game.isCheckmate()) {
            winner = agent2;
            result = 'checkmate';
            agent2.wins++;
            agent1.losses++;
        } else if (agent2.game.isCheckmate()) {
            winner = agent1;
            result = 'checkmate';
            agent1.wins++;
            agent2.losses++;
        } else {
            agent1.draws++;
            agent2.draws++;
        }

        if (winner) {
            const newElos = updateElo(winner.elo, winner === agent1 ? agent2.elo : agent1.elo);
            if (winner === agent1) {
                agent1.elo = newElos.winner;
                agent2.elo = newElos.loser;
            } else {
                agent2.elo = newElos.winner;
                agent1.elo = newElos.loser;
            }
        }

        const matchResult = {
            round: this.roundNumber,
            agent1: agent1.name,
            agent2: agent2.name,
            winner: winner ? winner.name : 'Draw',
            result: result,
            moves: moveCount,
            log: matchLog
        };

        this.matches.push(matchResult);
        return matchResult;
    }

    async runFullTournament(onMatchComplete, onUpdate) {
        this.isRunning = true;
        this.roundNumber = 0;

        for (let i = 0; i < this.agents.length; i++) {
            for (let j = i + 1; j < this.agents.length; j++) {
                if (!this.isRunning) break;
                
                this.roundNumber++;
                this.currentMatch = {
                    agent1: this.agents[i].name,
                    agent2: this.agents[j].name
                };

                const result = this.runMatch(
                    this.agents[i], 
                    this.agents[j],
                    onUpdate
                );

                if (onMatchComplete) {
                    onMatchComplete(result);
                }

                // Small delay between matches
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            if (!this.isRunning) break;
        }

        this.isRunning = false;
        this.currentMatch = null;
        return this.getResults();
    }

    stopTournament() {
        this.isRunning = false;
    }

    getResults() {
        const results = this.agents.map(agent => agent.getStatus());
        results.sort((a, b) => b.elo - a.elo);
        return results;
    }
}

module.exports = Tournament;