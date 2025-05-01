# Real-Time ChatBox App

A real-time chat application using React, Node.js, WebSockets, and PostgreSQL for persistent two-way communication.

## 🛠 Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js + Express
- **Real-Time Communication:** WebSockets (Socket.io)
- **Database:** mySQL

## ✨ Features

- Real-time two-way messaging
- WebSocket connection management
- Message persistence with mySQL
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
git clone https://github.com/waqaryaqoob21/chatbox-app.git
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
- Create a database (e.g., `chatboxdb`)
- Run SQL migrations or use provided scripts to create tables.

## ⚙️ Environment Variables

Create a `.env` file in `/server` with:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=***
DB_NAME=chatboxdb
```

## 👨‍💻 **Author**

**Waqar Yaqoob**

- GitHub: [@waqayaqoob21](https://github.com/waqayaqoob21)  
- Email: waqaryaqoob21@gmail.com  
- LinkedIn: [linkedin.com/in/waqaryaqoob21](https://linkedin.com/in/waqaryaqoob21)

---

## 📄 **License**

This project is licensed under the **MIT License**.  
See the [`LICENSE`](LICENSE) file for details.

---

## 🌟 **Show Your Support**

If you like this project:

- ⭐ Star this repository on GitHub  
- 🧑‍💻 Share it with your network  
