import mysql from 'mysql2/promise';
import { pool } from '../app';
import { wrapQueryResult, wrapQueryResults } from '../common/helpers/query.helper';
import { UserRequest } from './models/user.request.model';
import { UserReponse } from './models/user.response.model';
import { UserAuth } from './user.model';

export async function getUsers(): Promise<Array<UserReponse>> {
    return wrapQueryResults<UserReponse>(await pool.query(`
        SELECT id, firsname, lastname, username, email, phone, address
        FROM users
    `));
}

export async function getUser(userId: number): Promise<UserReponse | undefined> {
    return wrapQueryResult<UserReponse>(
        await pool.query(`
            SELECT id, firsname, lastname, username, email, phone, address 
            FROM users
            WHERE id = ?
        `, [userId])
    );
}

export async function createUser(user: UserRequest): Promise<UserReponse | undefined> {
    const [result] = await pool.query(`
            INSERT INTO users(firsname, lastname, username, email, phone, address, password) 
            VALUES (?,?,?,?,?,?,?)
            `, [user.firsname, user.lastname, user.username, user.email, user.address, user.phone, user.password]);

    const userId = (result as mysql.ResultSetHeader).insertId;

    return getUser(userId);
}

export async function login(user: UserAuth): Promise<UserReponse | undefined> {
    const { login, password } = user;

    return wrapQueryResult<UserReponse>(await pool.query(`
            SELECT * 
            FROM users 
            WHERE (email = ? OR username = ?) 
        `, [login, login])
    );
}