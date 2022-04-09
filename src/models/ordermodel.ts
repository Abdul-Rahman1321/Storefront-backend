import client from '../database'

export type order = {
  id: number;
  user_id: number;
  created_at?: string;
  status: string;
};

export class orderStore {
    async index(): Promise<order[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM orders'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`cannot get orders ${err}`)
        }
    }
    async show(id: string): Promise<order> {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find order with id : ${id}. Error: ${err}`)
        }
    }

    async showUserOrder(user_id: string): Promise<order> {
        try {
            const sql = 'SELECT * FROM orders WHERE user_id=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [user_id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find orders with user_id : ${user_id}. Error: ${err}`)
        }
    }

    async create(o: order): Promise<order> {
        try {
            const sql =
        'INSERT INTO orders (id, user_id, status) VALUES($1, $2, $3) RETURNING *'
            const conn = await client.connect()
            const result = await conn.query(sql, [
                o.id,
                o.user_id,
                o.status,
            ])
            const order = result.rows[0]
            conn.release()
            return order
        } catch (err) {
            throw new Error(`Could not add new order ${o.id}. Error: ${err}`)
        }
    }

    async delete(id: string): Promise<order> {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            const order = result.rows[0]
            conn.release()
            return order
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`)
        }
    }
}
