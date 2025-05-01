const express = require('express');
const app = express();
const db = require("./models");
const { ChatBox } = require("./models"); // Import ChatBox model
const PostRouter = require("./routes/Posts");
const CommentsRouter = require("./routes/Comments");
const UsersRouter = require("./routes/Users");
const LoginRouter = require("./routes/Login");
const SignUpRouter = require("./routes/SignUp");
const { Users } = require("./models")
const MessageRouter = require("./routes/Messages")
const cors = require("cors");
const { WebSocketServer } = require('ws');
const http = require('http');

// Middleware setup
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Routes
app.use("/posts", PostRouter);
app.use("/comments", CommentsRouter);
app.use("/users", UsersRouter);
app.use("/login", LoginRouter);
app.use("/signup", SignUpRouter);
app.use("/messages", MessageRouter);

// Create an HTTP server and attach WebSocket
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

let users = new Map(); // Map to store connected users
let currentUser = '';
let currentReciver = '';
// WebSocket connection handling
wss.on('connection', (ws) => {
    console.log('New WebSocket connection established.');

    ws.on('message', async (message) => {
        console.log('Message received from client:', message); // Log raw message
        try {
            const data = JSON.parse(message);
            console.log('Parsed message:', data); // Log parsed data

            // Handle user connection
            if (data.action === 'connect') {
                const { userId } = data;
                if (userId) {
                    users.set(userId, ws); // Store WebSocket connection for the user
                    currentUser = await Users.findAll({
                        where: {
                          id: userId, // Simple where condition
                        },
                      })
                      debugger;
                    console.log(`User ${currentUser[0].fname} connected.`);
                }
            }

            // Handle private message
            if (data.action === 'sendPrivateMessage') {
                const { recipientId, message } = data;
                const currentReciver = await Users.findAll({
                    where: {
                      id: recipientId, // Simple where condition
                    },
                  })
                console.log(`Attempting to send private message to ${currentReciver[0].fname}`);

                const recipientWs = users.get(recipientId);
                if (!recipientWs) {
                    console.log(`Recipient ${currentReciver[0].fname} not found.`);
                    return;
                }

                if (recipientWs.readyState === ws.OPEN) {
                    recipientWs.send(JSON.stringify({ sender: data.userId,  senderName:  currentUser[0].fname, receiverName:  currentReciver[0].fname, receiverId: data.recipientId,message}));
                    console.log(`Message sent to ${currentReciver[0].fname}: ${message}`);
                    try {
                        await ChatBox.create({ messageBody: message, receiverId: data.recipientId, UserId: data.userId });
                        console.log('Message saved to database:', { message, receiverId: data.recipientId, UserId: data.userId });
                    } catch (dbError) {
                        console.error('Error saving message to database:', dbError);
                    }
                } else {
                    console.log(`Recipient ${currentReciver[0].fname} WebSocket not open.`);
                }
            }

            // Handle broadcast message
            if (data.action === 'broadcast') {
                const { message } = data;

                users.forEach(async (userWs, userId) => {
                    if (userWs.readyState === ws.OPEN) {
                        userWs.send(JSON.stringify({ sender: data.userId, message }));
                    }
                });

                // Save broadcast message to the database
                try {
                    await ChatBox.create({ messageBody: message, SenderId: data.userId });
                    console.log(`Broadcast message sent and saved to database: ${message}`);
                } catch (dbError) {
                    console.error('Error saving broadcast message to database:', dbError);
                }
            }
        } catch (error) {
            console.error('Error handling message:', error);
        }
    });

    // Handle WebSocket disconnection
    ws.on('close', () => {
        users.forEach((value, key) => {
            if (value === ws) {
                users.delete(key);
                console.log(`User ${key} disconnected.`);
            }
        });
    });
});

// Sync database and start server
// (async () => {
//     try {
//         await db.sequelize.sync({ alter: true });
//         console.log('Database synced.');
//     } catch (error) {
//         console.error('Error syncing database:', error);
//     }
// })();

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
