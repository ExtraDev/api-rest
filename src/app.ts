import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';
import express from "express";
import { createServer } from "http";
import mysql from 'mysql2/promise';
import { Server } from "socket.io";
import routes from './routes';

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
app.use("/", routes());

const server = createServer(app);
const io = new Server(server, {
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
})

export default server;