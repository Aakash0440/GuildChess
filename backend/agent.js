// backend/agent.js
const { Chess } = require('chess.js');

class ChessAgent {
    constructor(name, id) {
        this.id = id;
        this.name = name;
        this.game = new Chess();
        this.wins = 0;
        this.losses = 0;
        this.draws = 0;
        this.elo = 1200;
        this.guildId = null;
        this.isActive = true;
    }

    makeMove() {
        const possibleMoves = this.game.moves();
        
        if (possibleMoves.length === 0) {
            return null;
        }

        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        const move = possibleMoves[randomIndex];
        
        this.game.move(move);
        return move;
    }

    isGameOver() {
        return this.game.isGameOver();
    }

    resetGame() {
        this.game.reset();
    }

    getStatus() {
        return {
            id: this.id,
            name: this.name,
            wins: this.wins,
            losses: this.losses,
            draws: this.draws,
            elo: Math.round(this.elo),
            guildId: this.guildId,
            winRate: this.wins + this.losses > 0 
                ? ((this.wins / (this.wins + this.losses)) * 100).toFixed(1)
                : 0
        };
    }
}

module.exports = ChessAgent;