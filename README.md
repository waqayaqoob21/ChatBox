# Real-Time ChatBox App

A real-time chat application using React, Node.js, WebSockets, and PostgreSQL for persistent two-way communication.

## 🛠 Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js + Express
- **Real-Time Communication:** WebSockets (Socket.io)
- **Database:** PostgreSQL

## ✨ Features

- Real-time two-way messaging
- WebSocket connection management
- Message persistence with PostgreSQL
- Simple and responsive chat UI

## 📁 Project Structure

```
/client           # React frontend
/server           # Node.js backend
/database         # SQL scripts or migrations
```

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/chatbox-app.git
cd chatbox-app
```

### 2. Set up backend
```bash
cd server
npm install
npm start
```

### 3. Set up frontend
```bash
cd ../client
npm install
npm start
```

### 4. PostgreSQL setup
- Create a database (e.g., `chatbox`)
- Run SQL migrations or use provided scripts to create tables.

## ⚙️ Environment Variables

Create a `.env` file in `/server` with:

```
PORT=5000
DB_HOST=localhost
DB_USER=youruser
DB_PASSWORD=yourpassword
DB_NAME=chatbox
```

## 🖼 Screenshots

_Add screenshots of your app UI in a `/screenshots` folder and reference here._

## 📄 License

MIT License
