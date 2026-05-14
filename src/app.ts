import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';
import express, { Request, Response, Router } from "express";
import { createServer } from "http";

import { logAction, validateJsonFormat } from "./common/middlewares/query.middlewares";
import { initDatabase } from "./database/init-database";
import tasksRoutes from "./domains/tasks/task.routes";

dotenv.config();

const app = express();

initDatabase();

const corsOptions: cors.CorsOptions = {
    origin: [
        'http://localhost:4200'
    ]
};

app.use(cors(corsOptions))
app.use(bodyParser.json());

const router = Router();
tasksRoutes(router);

app.use("/", logAction, validateJsonFormat, router);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json("Hello world!");
});

const httpServer = createServer(app);

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});