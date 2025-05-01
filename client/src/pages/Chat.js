import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [messagesList, setMessagesList] = useState([]);
    const [input, setInput] = useState('');
    const [socket, setSocket] = useState(null);
    const [listOfUsers, setListOfUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const userData = JSON.parse(localStorage.getItem("user"));
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    useEffect(() => {

        if (token) {
            axios
                .get(`http://localhost:3001/users`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    setListOfUsers(response.data.data);
                })
                .catch((error) => {
                    console.error("Error fetching user list:", error);
                });
        }

        const ws = new WebSocket('ws://localhost:3001');
        setSocket(ws);

        ws.onopen = () => {
            console.log('WebSocket connection opened.');
            if (userData) {
                ws.send(JSON.stringify({ action: 'connect', userId: userData }));
            }
        };

        ws.onmessage = (event) => {
            debugger;
            const data = JSON.parse(event.data);
            console.log(data.sender,"send this message",data.message);
            setMessages((prev) => [...prev, data]);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed.');
        };

        ws.onerror = (err) => console.error('WebSocket error:', err);

        return () => ws.close();
    }, [userData]);

    const getUserConversation = (id) => {
        if(id){
            alert("helloo i am here", id);
            axios
            .get(`http://localhost:3001/messages/byId/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                setMessagesList(response.data);
            })
            .catch((error) => {
                console.error("Error fetching user list:", error);
            });
        }
    }

    const sendPersonalMessage = () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(
                JSON.stringify({
                    action: 'sendPrivateMessage',
                    userId: userData,
                    recipientId: selectedUser,
                    message: input,
                })
            );
            setInput('');
        }
    };

    const sendBroadcastMessage = () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(
                JSON.stringify({
                    action: 'broadcast',
                    userId: userData,
                    message: input,
                })
            );
            setInput('');
        }
    };

    return (
<div className="chat-container">
    {/* User List Panel */}
    <div className="user-list-panel">
        <h2 className="user-list-header">User List</h2>
        <ul className="user-list">
            {listOfUsers.map((user) => (
                <li
                    key={user.id}
                    onClick={() => getUserConversation(user.id)}
                    className={`user-list-item ${selectedUser === user.id && username !== user.username ? 'selected-user' : ''}`}
                >
                    {username !== user.username ? <p>{user.username}</p> : <p disabled={username === user.username}>{user.username}</p>}
                    
                </li>
            ))}
        </ul>
    </div>

    {/* Chat Panel */}
    <div className="chat-panel">
        {/* Header */}
        <h2 className="chat-header">Chat Box</h2>

        {/* Conversation Area */}
        <div className="conversation-area">
            {messages.length > 0 ? messages.map((msg, index) => (
                
        <div
        key={index}
        className={`message-bubble ${msg.sender === userData ? 'message-right' : 'message-left'}`}
        >
        {msg.sender !== userData ? (
            // Right-aligned for receiver's messages
            <>
            <span>Me: {input}</span>
            </>
        ) : (
            // Left-aligned for sender's messages
            <>
            <span>{msg.senderName}</span>: <span>{msg.message}</span>

            </>
        )}
        </div>

            
                
            )) : <p className="no-messages">No messages yet...</p>}
        </div>

        {/* Input Field and Buttons */}
        <div className="input-area">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message here..."
                className="message-input"
            />
            <button onClick={sendPersonalMessage} disabled={!selectedUser} className="send-button personal">
                Send Personal
            </button>
            <button onClick={sendBroadcastMessage} className="send-button broadcast">
                Send Broadcast
            </button>
        </div>
    </div>
</div>





    );
};

export default Chat;
