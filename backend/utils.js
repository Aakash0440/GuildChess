// backend/utils.js

function updateElo(winnerElo, loserElo) {
    const K = 32;
    const expectedScore = 1 / (1 + Math.pow(10, (loserElo - winnerElo) / 400));
    const newWinnerElo = winnerElo + K * (1 - expectedScore);
    
    const expectedScoreLoser = 1 / (1 + Math.pow(10, (winnerElo - loserElo) / 400));
    const newLoserElo = loserElo + K * (0 - expectedScoreLoser);
    
    return {
        winner: Math.round(newWinnerElo),
        loser: Math.round(newLoserElo)
    };
}

function generateId() {
    return 'agent_' + Math.random().toString(36).substr(2, 9);
}

module.exports = { updateElo, generateId };