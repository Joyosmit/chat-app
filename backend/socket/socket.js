import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}


const userSocketMap = {}; // to store the mapping of userId to socketId
                          // of the form {userId: socketId}

// io.on() is used to listen to events
// here we are listening to the connection event
// this event is fired when a user connects to the server
// socket is an object that represents the connection to the server   
io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    // userId is sent as a query parameter from the frontend
    // we are storing the mapping of userId to socketId
    const userId = socket.handshake.query.userId;
    if(userId != "undefined"){
        userSocketMap[userId] = socket.id;
        console.log(userSocketMap)
    }

    // to get the online users
    // this is emitted to all the connected users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // socket.on() is used to listen to events
    // can be used to listen to custom events as well
    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
})


export {app, io, server}