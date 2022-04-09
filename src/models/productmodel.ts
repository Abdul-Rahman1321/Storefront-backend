import client from '../database'

export type product = {
  id?: number;
  name: string;
  price: string;
  category: string;
};

export class productStore {
    async index(): Promise<product[]> {
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM products'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`cannot get products ${err}`)
        }
    }
    async show(id: string): Promise<product> {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`)
        }
    }

    async create(p: product): Promise<product> {
        try {
            const sql =
        'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *'
            const conn = await client.connect()
            const result = await conn.query(sql, [p.name, p.price, p.category])
            const product = result.rows[0]
            conn.release()
            return product
        } catch (err) {
            throw new Error(`Could not add new product ${p.name}. Error: ${err}`)
        }
    }

    async delete(name: string): Promise<product> {
        try {
            const sql = 'DELETE FROM products WHERE name=($1)'
            const conn = await client.connect()
            const result = await conn.query(sql, [name])
            const product = result.rows[0]
            conn.release()
            return product
        } catch (err) {
            throw new Error(`Could not delete product ${name}. Error: ${err}`)
        }
    }
}
