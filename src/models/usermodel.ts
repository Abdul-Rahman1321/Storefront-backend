import client from '../database'
import bcrypt from 'bcrypt'
import { hidePassword } from '../util/stars'

const pepper = process.env.BCRYPT_PASSWORD_PEPPER
const saltRounds = process.env.SALT_ROUNDS

export interface AuthObject {
  user: user;
  token: string;
}

export type user = {
  id?: number;
  username: string;
  first_name: string;
  last_name: string;
  password?: string;
  role: string;
};

export class userStore {
    async index(): Promise<user[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql)
            conn.release()
            const users: Array<user> = result.rows
            const resultArray: Array<user> = []
            for (let i = 0; i < users.length; i = i + 1) {
                const newUser = hidePassword(users[i])
                resultArray.push(newUser)
            }
            return resultArray
        } catch (err) {
            throw new Error(`cannot get users${err}`)
        }
    }
    async show(id: string): Promise<user> {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            const user = hidePassword(result.rows[0])
            conn.release()
            return user
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`)
        }
    }

    async logUser(username: string): Promise<user> {
        try {
            const sql = 'SELECT * FROM users WHERE username=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [username])
            conn.release()
            console.log(result.rows[0].username, result.rows[0].role)
            return result.rows[0]
        } catch (err) {
            throw new Error(`user ${username} doesnot exist. Error: ${err}`)
        }
    }

    async create(u: user): Promise<user> {
        try {
            const sql =
        'INSERT INTO users (id, username, first_name, last_name, role, password) VALUES($1, $2, $3, $4, $5, $6) RETURNING *'
            const conn = await client.connect()
            const hash = bcrypt.hashSync(
                (u.password as string) + pepper,
                parseInt(saltRounds as string)
            )
            const result = await conn.query(sql, [
                u.id,
                u.username,
                u.first_name,
                u.last_name,
                u.role,
                hash,
            ])
            const user = result.rows[0]
            conn.release()
            return user
        } catch (err) {
            throw new Error(`Could not add new user ${u.username}. Error: ${err}`)
        }
    }

    async delete(username: string): Promise<user> {
        try {
            const sql = 'DELETE FROM users WHERE username=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [username])
            const user = result.rows[0]
            conn.release()
            return user
        } catch (err) {
            throw new Error(`Could not delete user ${username}. Error: ${err}`)
        }
    }
}
