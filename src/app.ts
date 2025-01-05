import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';
import express, { Router } from "express";
import { createServer } from "http";
import mysql from 'mysql2/promise';
import { Server } from "socket.io";

import projectsRoutes from "./projects/projects.routes";
import tasksRoutes from "./tasks/tasks.routes";

dotenv.config();

export const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'admin',
    database: process.env.DB_NAME || 'mydb',
    port: Number(process.env.DB_PORT) || 3306,
});

const app = express();

const corsOptions: cors.CorsOptions = {
    origin: [
        'http://localhost:4200'
    ]
};

app.use(cors(corsOptions))
app.use(bodyParser.json());

const router = Router();
tasksRoutes(router);
projectsRoutes(router);
app.use("/", router);

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    })

    socket.on('message', (msg: string) => {
        socket.emit('message', msg);
        socket.broadcast.emit('message', msg);
    })
})

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});