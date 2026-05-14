import { db } from "./database";

export function initDatabase(): void {
    console.log('--- INIT DATABASE ---');

    db.exec(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            status TEXT NOT NULL
                CHECK(status IN ('TODO', 'IN_PROGRESS', 'DONE')),
            description TEXT
        );
    `);

    console.log('Database initialized');
}