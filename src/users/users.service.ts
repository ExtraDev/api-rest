import mysql from 'mysql2/promise';
import { pool } from '../app';
import { wrapQueryResult, wrapQueryResults } from '../common/helpers/query.helper';
import { User, UserAuth } from './user.model';

export async function getUsers(): Promise<Array<User>> {
    return wrapQueryResults<User>(await pool.query(`
        SELECT id, firsname, lastname, username, email, phone, address
        FROM users
    `));
}

export async function getUser(userId: number): Promise<User | undefined> {
    return wrapQueryResult<User>(
        await pool.query(`
            SELECT id, firsname, lastname, username, email, phone, address 
            FROM users
            WHERE id = ?
        `, [userId])
    );
}

export async function createUser(user: User): Promise<User | undefined> {
    const { firsname, lastname, username, email, address, phone, password } = user;

    const [result] = await pool.query(`
            INSERT INTO users(firsname, lastname, username, email, phone, address, password) 
            VALUES (?,?,?,?,?,?,?)
            `, [firsname, lastname, username, email, address, phone, password]);

    const userId = (result as mysql.ResultSetHeader).insertId;

    return getUser(userId);
}

export async function login(user: UserAuth): Promise<User | undefined> {
    const { login, password } = user;

    return wrapQueryResult<User>(await pool.query(`
            SELECT * 
            FROM users 
            WHERE (email = ? OR username = ?) 
        `, [login, login])
    );
}