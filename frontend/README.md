# 🎮 GuildMaster Chess ♟️

**Autonomous AI Chess Tournament System with Guild Management**

Built for **MOLTIVERSE Hackathon 2026**

---

## 🎯 What It Does

GuildMaster Chess is a full-stack autonomous multi-agent system where:
- ♟️ AI agents play chess automatically
- ⚔️ Agents form competitive guilds
- 🏆 Real-time tournaments with ELO rankings
- 📊 Live leaderboards and match visualization
- ⛓️ All actions logged to Monad blockchain
- 🌐 Beautiful web interface with live updates

---

## 🏗️ Project Structure
```
guildmaster-chess/
├── backend/          # Express API + WebSocket server
│   ├── agent.js      # Chess agent logic
│   ├── tournament.js # Tournament manager
│   ├── guild.js      # Guild system
│   ├── monad.js      # Blockchain logging
│   └── server.js     # Main server
│
├── frontend/         # React web application
│   ├── src/
│   │   ├── App.js
│   │   └── components/
│   └── public/
│
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/guildmaster-chess.git
cd guildmaster-chess
```

2. **Install Backend:**
```bash
cd backend
npm install
```

3. **Install Frontend:**
```bash
cd ../frontend
npm install
```

### Running the Application

**Terminal 1 - Start Backend:**
```bash
cd backend
npm start
```
Server runs on http://localhost:5000

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm start
```
Frontend opens at http://localhost:3000

---

## 🎮 How to Use

1. Open http://localhost:3000 in your browser
2. Click **"🚀 Start Tournament"**
3. Watch AI agents battle in real-time!
4. View live leaderboards, guild rankings, and match history
5. See Monad blockchain logs update automatically

---

## 🏆 Features

- ✅ **Autonomous Agents**: AI plays chess without human intervention
- ✅ **Guild System**: Agents form teams and compete for guild supremacy
- ✅ **ELO Rankings**: Professional chess rating system
- ✅ **Live Matches**: Watch games unfold in real-time
- ✅ **Monad Integration**: All events logged to blockchain
- ✅ **WebSocket**: Real-time updates via Socket.IO
- ✅ **Beautiful UI**: Modern, responsive design

---

## 🎯 Hackathon Track

**Track:** Agent Track (Can upgrade to Agent + Token Track)

**Fits Bounty:** Gaming Arena Agent
- ✅ Creates competitive gaming arenas (chess tournaments)
- ✅ Automated tournaments and matchmaking
- ✅ Multi-agent coordination (guilds)
- ✅ Monad blockchain integration

---

## 🔮 Future Enhancements (Agent + Token Track)

- 💰 $CHESS token integration via Nad.fun
- 🎟️ Tournament entry fees
- 🏅 Token rewards for winners
- 🗳️ Governance voting
- 🛒 In-game marketplace

---

## 📊 Tech Stack

**Backend:**
- Node.js + Express
- Socket.IO (WebSocket)
- chess.js (Chess engine)
- Monad SDK (Blockchain)

**Frontend:**
- React 18
- Socket.IO Client
- react-chessboard
- Axios

---

## 👥 Team

[Your Name/Team Name]

---

## 📝 License

MIT License

---

## 🙏 Acknowledgments

Built for MOLTIVERSE Hackathon 2026
Hosted by Nad.fun • Powered by Monad

---

## 📧 Contact

For questions or support, reach out on Discord!