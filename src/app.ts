import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';
import express, { Request, Response, Router } from "express";
import { createServer } from "http";
import mysql from 'mysql2/promise';

import { logAction, validateJsonFormat } from "./common/middlewares/query.middlewares";
import projectsRoutes from "./projects/projects.routes";
import tasksRoutes from "./tasks/tasks.routes";
import usersRoutes from "./users/users.routes";

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
usersRoutes(router);

app.use("/", logAction, validateJsonFormat, router);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json("Hello world :)");
});

const httpServer = createServer(app);

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});