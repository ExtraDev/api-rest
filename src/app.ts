import bodyParser from "body-parser";
import dotenv from 'dotenv';
import express from "express";
import mysql from 'mysql2/promise';
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

app.use(bodyParser.json());
app.use("/api", routes());

export default app;