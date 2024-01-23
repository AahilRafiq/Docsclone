import 'dotenv/config';
import express from "express";
import { createServer } from 'node:http';
import cors from "cors";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import docRoutes from './routes/docRoutes.js';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
const app = express();
const server = createServer(app);
const io = new Server(server , {
  cors: {
    origin: process.env.FRONTEND_URL
  }
});

app.use(cors(
  {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE' , 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }
  ));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(
  ClerkExpressWithAuth({
    apiKey: process.env.CLERK_SECRET_KEY,
    requireSession: true,
    requireElevatedSession: false,
  })
);
mongoose.connect(process.env.MONGO_URL , {dbName: 'DocsCloneDB'}).then(console.log('MongoDB Connnected!'));

// Routes
app.use('/api/docs', docRoutes);

io.on("connection", (socket) => {
  console.log('User connected Socket');
  socket.on('join-room' , roomId => {
    socket.join(roomId);
    console.log('User joined room: ' + roomId);
  })
  socket.on('send-changes' , (delta,roomId) => {
    socket.broadcast.to(roomId).emit('receive-changes', delta);
  })
})

io.on("disconnect", (socket) => {
  console.log('User disconnected Socket');
})

server.listen(process.env.PORT || 5000, () => {
  console.log(`server running at port ${process.env.PORT || 5000}`);
});
