// backend/guild.js

class Guild {
    constructor(id, name, icon) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.members = [];
        this.totalWins = 0;
        this.totalLosses = 0;
        this.averageElo = 0;
        this.guildScore = 0;
    }

    addMember(agentId) {
        if (!this.members.includes(agentId)) {
            this.members.push(agentId);
        }
    }

    updateStats(agents) {
        const guildAgents = agents.filter(agent => 
            this.members.includes(agent.id)
        );

        this.totalWins = guildAgents.reduce((sum, agent) => sum + agent.wins, 0);
        this.totalLosses = guildAgents.reduce((sum, agent) => sum + agent.losses, 0);
        
        const totalElo = guildAgents.reduce((sum, agent) => sum + agent.elo, 0);
        this.averageElo = guildAgents.length > 0 
            ? Math.round(totalElo / guildAgents.length) 
            : 0;
        
        this.guildScore = this.totalWins * this.averageElo;
    }

    getSummary() {
        return {
            id: this.id,
            name: this.name,
            icon: this.icon,
            members: this.members,
            memberCount: this.members.length,
            wins: this.totalWins,
            losses: this.totalLosses,
            avgElo: this.averageElo,
            score: this.guildScore
        };
    }
}

module.exports = Guild;